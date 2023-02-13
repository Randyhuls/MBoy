import { GPUSettings } from '../constants/gpu-settings.constants'
import { CPU } from '../cpu/cpu'
import { CPUClock } from '../cpu/models'
import { MMU } from '../mmu/mmu'
import { GPUMode } from './models/gpu-mode.model'

class GPU {
    private MAX_NR_OF_TILES: number = 384 // Max nr of tiles to fit in memory
    private TILE_SIZE: number = 8

    private static _shared: GPU

    // Set by mboy.ts
    public cpu: CPU 
    public mmu: MMU 
    
    private mode: number = 0
    private modeClock: number = 0
    private line: number = 0
    private scX: number = 0
    private scY: number = 0

    private scale: number
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private screen: ImageData
    private tileset = []

    private switchBG: boolean = false
    private switchLCD: boolean = false
    private bgMap: boolean = false
    private bgTile: boolean = false

    private palette = {
        0: [255, 255, 255],
        1: [192, 192, 192],
        2: [96, 96, 96],
        3: [0, 0, 0]
    }

    constructor(scale: number = GPUSettings.SCALE) {
        // CANVAS & CONTEXT
        this.scale = scale
        this.canvas = document.querySelector('main[data-app="mboy"] > canvas[id="__SCREEN__"]')
        this.canvas.width = GPUSettings.WIDTH * this.scale
        this.canvas.height = GPUSettings.HEIGHT * this.scale
        this.context = this.canvas.getContext('2d')

        this.reset() // Clear or create new array of pixels
    }

    static get shared(): GPU {
        if (!this._shared) this._shared = new GPU()
        return this._shared
    }

    read(address: number) {
      console.log('gpu read!')
      switch(address) {
        case 0xFF40: 
          return (
            (this.switchBG  ? 0x01 : 0x00) | 
            (this.bgMap     ? 0x08 : 0x00) | 
            (this.bgTile    ? 0x10 : 0x00) | 
            (this.switchLCD ? 0x80 : 0x00)
          )
        case 0xFF42:
          return this.scY
        case 0xFF43:
          return this.scX
        case 0xFF44:
          return this.line
        default:
          console.log('Unknown address passed to GPU read function;', `0x${address.toString(16)}`) 
      }
    }

    write(address: number, value: number) {
      console.log('gpu write!')
      switch(address) {
        case 0xFF40:
            this.switchBG   = !!(value & 0x01)
            this.bgMap      = !!(value & 0x08)
            this.bgTile     = !!(value & 0x10) 
            this.switchLCD  = !!(value & 0x80)
            break
        case 0xFF42:
          this.scY = value
          break
        case 0xFF43:
          this.scX = value
           break
        case 0xFF47:
          for(let i = 0; i < 4; i++) {
            switch((value >> (i * 2)) & 3) {
              case 0: 
                this.palette[i] = [255, 255, 255, 255]
                break
              case 1:
                this.palette[i] = [192, 192, 192, 255]
                break
              case 2:
                this.palette[i] = [96, 96, 96, 255]
                break
              case 3:
                this.palette[i] = [0, 0, 0, 255]
            }
          }
          break
        default:
          console.log('Unknown address passed to GPU read function;', `0x${address.toString(16)}`) 
      }
    }

    tick() {
        this.modeClock = this.cpu.clock.M

        switch (this.mode) {
            case GPUMode.HORIZONTAL_BLANK.MODE:
                if (this.modeClock >= GPUMode.HORIZONTAL_BLANK.CLOCK) {
                    this.modeClock = 0
                    this.line++
                    // If we're at the last horizontal line, we enter vblank
                    if (this.line == GPUSettings.HEIGHT - 1) {
                        this.mode = GPUMode.VERTICAL_BLANK.MODE
                        console.log('screen (2)', this.screen)
                        this.context.putImageData(this.screen, 0, 0)
                    } else {
                        this.mode = GPUMode.SCANLINE_OAM.MODE
                    }
                }
                break
            
            case GPUMode.VERTICAL_BLANK.MODE:
                if (this.modeClock >= GPUMode.ONE_LINE.CLOCK) {
                    this.modeClock = 0
                    this.line++

                    if (this.line > 153) {
                        this.mode = GPUMode.SCANLINE_OAM.MODE
                        this.line = 0
                    }
                }
                break

            case GPUMode.SCANLINE_OAM.MODE:
                if (this.modeClock >= GPUMode.SCANLINE_OAM.CLOCK) {
                    this.modeClock = 0
                    this.mode = GPUMode.SCANLINE_VRAM.MODE
                }
                break

            case GPUMode.SCANLINE_VRAM.MODE:
                if (this.modeClock >= GPUMode.SCANLINE_VRAM.CLOCK) {
                    // Enter hblank
                    this.modeClock = 0
                    this.mode = GPUMode.HORIZONTAL_BLANK.MODE

                    // Write a scanline to frame buffer
                    this.renderScan()
                }
              
        }
    }

    reset() {
        this.screen = this.context.createImageData(GPUSettings.WIDTH, GPUSettings.HEIGHT)

        // Initialize white canvas
        for (let i = 0; i < this.screen.data.length; i +=4 ){
          this.screen.data[i + 0] = 255 // R
          this.screen.data[i + 1] = 255 // G
          this.screen.data[i + 2] = 255 // B
          this.screen.data[i + 3] = 255 // A
        }

        this.context.putImageData(this.screen, 0, 0)
        

        // Clear video ram and sprite attribute table
        this.tileset = []

        for (let i = 0; i < this.MAX_NR_OF_TILES; i++) {
            // Clear each sprite
            this.tileset[i] = []

            for (let j = 0; j < this.TILE_SIZE; j++) {
                this.tileset[i][j] = [0, 0, 0, 0, 0, 0, 0, 0]
            }
        }
    }

    updateTile(address: number, value: number) {
        const addr: number = address & 0x1FFE
        console.log('updateTile:', address, value)
        // Get updated tile and row
        const tile: number =  (addr >> 4) & 511
        const y: number = (addr >> 1) & 7

        let sx: number

        // Loop through sprite tile
        for (let x = 0; x < 8; x++) {
            // Bit index for current pixels
            sx = 1 << (7 - x)

            // Update tile set
            this.tileset[tile][y][x] = ((this.mmu.VRAM[addr] & sx) ? 1 : 0) + ((this.mmu.VRAM[addr + 1] & sx) ? 2 : 0)
        }
    }

    private renderScan(){
        // VRAM offset for the tile map
        let mapOffset = this.bgMap ? 0x1C00 : 0x1800

        // Which line of tiles to use in the map
        mapOffset += ((this.line + this.scY) & 255) >> 3
        
        // Which tile to start with in the map line
        let lineOffset = (this.scX >> 3)

        // Which line of pixels to use in the tiles
        var y = (this.line + this.scY) & 7

        // Where in the tileline to start
        var x = this.scX & 7

        // Where to render on the canvas
        var canvasOffset = this.line * 160 * 4
    
        // Read tile index from the background map
        let color: number
        let tile = this.mmu.VRAM[mapOffset + lineOffset];

        // If the tile data set in use is #1, the
        // indices are signed; calculate a real tile offset
        if (this.bgTile && tile < 128) tile += 256

        for(var i = 0; i < 160; i++) {
            // Re-map the tile pixel through the palette
            color = this.palette[this.tileset[tile][y][x]]

            // Plot the pixel to canvas
            this.screen.data[canvasOffset + 0] = color[0]
            this.screen.data[canvasOffset + 1] = color[1]
            this.screen.data[canvasOffset + 2] = color[2]
            this.screen.data[canvasOffset + 3] = color[3]
            canvasOffset += 4

            // When this tile ends, read another
            x++
            if(x == 8) {
                x = 0
                lineOffset = (lineOffset + 1) & 31
                tile = this.mmu.VRAM[mapOffset + lineOffset]

                if(this.bgTile && tile < 128) tile += 256
            }
	    }
    }

    /* render() {
        // Clear the display each render cycle
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // Loop through the display (pixels)
        for (let i: number = 0; i < GPUSettings.WIDTH * GPUSettings.HEIGHT; i++) {
            // Grab x position of pixel based off of i
            const x = (i % GPUSettings.WIDTH) * this.scale

            // Grab y position of pixel based off of i
            const y: number = Math.floor (i / GPUSettings.WIDTH) * this.scale

            if (this.screen[i]) {
                // Set the pixel color to black
                this.context.fillStyle = 'red' // TODO: gameboy pixel shade type

                // Place pixel at position x, y with width and height of scale
                this.context.fillRect(x, y, this.scale, this.scale)
            }
        }
    } */
}

export { GPU }