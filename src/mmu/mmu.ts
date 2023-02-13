import { CPU } from '../cpu/cpu'
import { GPU } from '../gpu/gpu'

enum ICartridgeType {
    ROM_ONLY =                          0x00,
    MBC1 =                              0x01,
    MBC1_RAM =                          0x02,
    MBC1_RAM_BATTERY =                  0x03,
    MBC2 =                              0x05,
    MBC2_BATTERY =                      0x06,
    ROM_RAM =                           0x08,
    ROM_RAM_BATTERY =                   0x09,
    MMM01 =                             0x0B,
    MMM01_RAM =                         0x0C,
    MMM01_RAM_BATTERY =                 0x0D,
    MBC3_TIMER_BATTERY =                0x0F,
    MBC3_TIMER_RAM_BATTERY =            0x10,
    MBC3 =                              0x11,
    MBC3_RAM =                          0x12,
    MBC3_RAM_BATTERY =                  0x13,
    MBC5 =                              0x19,
    MBC5_RAM =                          0x1A,
    MBC5_RAM_BATTERY =                  0x1B,
    MBC5_RUMBLE =                       0x1C,
    MBC5_RUMBLE_RAM =                   0x1D,
    MBC5_RUMBLE_BATTERY =               0x1E,
    MBC6 =                              0x20,
    MBC7_SENSOR_RUMBLE_RAM_BATTERY =    0x22,
    POCKET_CAMERA =                     0xFC,
    BANDAI_TAMA5 =                      0xFD,
    HUC3 =                              0xFE,
    HUC3_RAM_BATTERY =                  0xFF
}

interface IROMMetadata {
    title: string
    nintendoLogo: Uint8Array
    size: number
    version: number
    cartridgeType: ICartridgeType,
}

class MMU {
    // TODO: should ask user to load this or skip otherwise
    private BOOT_ROM: Uint8Array = new Uint8Array([
      0x31, 0xFE, 0xFF, 0xAF, 0x21, 0xFF, 0x9F, 0x32, 0xCB, 0x7C, 0x20, 0xFB, 0x21, 0x26, 0xFF, 0x0E,
      0x11, 0x3E, 0x80, 0x32, 0xE2, 0x0C, 0x3E, 0xF3, 0xE2, 0x32, 0x3E, 0x77, 0x77, 0x3E, 0xFC, 0xE0,
      0x47, 0x11, 0x04, 0x01, 0x21, 0x10, 0x80, 0x1A, 0xCD, 0x95, 0x00, 0xCD, 0x96, 0x00, 0x13, 0x7B,
      0xFE, 0x34, 0x20, 0xF3, 0x11, 0xD8, 0x00, 0x06, 0x08, 0x1A, 0x13, 0x22, 0x23, 0x05, 0x20, 0xF9,
      0x3E, 0x19, 0xEA, 0x10, 0x99, 0x21, 0x2F, 0x99, 0x0E, 0x0C, 0x3D, 0x28, 0x08, 0x32, 0x0D, 0x20,
      0xF9, 0x2E, 0x0F, 0x18, 0xF3, 0x67, 0x3E, 0x64, 0x57, 0xE0, 0x42, 0x3E, 0x91, 0xE0, 0x40, 0x04,
      0x1E, 0x02, 0x0E, 0x0C, 0xF0, 0x44, 0xFE, 0x90, 0x20, 0xFA, 0x0D, 0x20, 0xF7, 0x1D, 0x20, 0xF2,
      0x0E, 0x13, 0x24, 0x7C, 0x1E, 0x83, 0xFE, 0x62, 0x28, 0x06, 0x1E, 0xC1, 0xFE, 0x64, 0x20, 0x06,
      0x7B, 0xE2, 0x0C, 0x3E, 0x87, 0xF2, 0xF0, 0x42, 0x90, 0xE0, 0x42, 0x15, 0x20, 0xD2, 0x05, 0x20,
      0x4F, 0x16, 0x20, 0x18, 0xCB, 0x4F, 0x06, 0x04, 0xC5, 0xCB, 0x11, 0x17, 0xC1, 0xCB, 0x11, 0x17,
      0x05, 0x20, 0xF5, 0x22, 0x23, 0x22, 0x23, 0xC9, 0xCE, 0xED, 0x66, 0x66, 0xCC, 0x0D, 0x00, 0x0B,
      0x03, 0x73, 0x00, 0x83, 0x00, 0x0C, 0x00, 0x0D, 0x00, 0x08, 0x11, 0x1F, 0x88, 0x89, 0x00, 0x0E,
      0xDC, 0xCC, 0x6E, 0xE6, 0xDD, 0xDD, 0xD9, 0x99, 0xBB, 0xBB, 0x67, 0x63, 0x6E, 0x0E, 0xEC, 0xCC,
      0xDD, 0xDC, 0x99, 0x9F, 0xBB, 0xB9, 0x33, 0x3E, 0x3c, 0x42, 0xB9, 0xA5, 0xB9, 0xA5, 0x42, 0x4C,
      0x21, 0x04, 0x01, 0x11, 0xA8, 0x00, 0x1A, 0x13, 0xBE, 0x20, 0xFE, 0x23, 0x7D, 0xFE, 0x34, 0x20,
      0xF5, 0x06, 0x19, 0x78, 0x86, 0x23, 0x05, 0x20, 0xFB, 0x86, 0x20, 0xFE, 0x3E, 0x01, 0xE0, 0x50
    ])

    public cpu: CPU // Set by CPU
    public gpu: GPU // Set by mboy.ts

    
    public bios: Uint8Array // Bios --> 256 bytes
    public IO: Uint8Array // I/O registers
    public OAM: Uint8Array // VRAM (Object Attribute Memory) aka Sprite Attribute Table
    public ROM: Uint16Array // ROM --> 16kb fixed ROM bank
    public SROM: Uint16Array // ROM --> 16kb switchable ROM bank
    public ERAM: Uint16Array // External RAM --> 8kb
    public HRAM: Uint8Array // Work RAM --> 4kb
    public WRAM: Uint16Array // Work RAM --> 4kb
    public VRAM: Uint16Array // Video RAM --> 16kb

    private rawRomData: Uint16Array
    private ROMBank: number = 0x4000 // Offset for ROM bank
    private RAMBank: number = 0x0000 // Offset for RAM bank
    private cartridgeType: number = 0x00 // MBC type
    private skipBios: boolean = true
    
    public IE: number = 0 // Interrupt enabled
    public IF: number = 0 // Interrupt flag

    public metadata: IROMMetadata
    
    private static _shared: MMU

    constructor() {
        this.bios = this.BOOT_ROM || new Uint8Array(255)
        this.IO = new Uint8Array(127)
        this.OAM = new Uint8Array(159)
        this.ROM = new Uint16Array(1024 * 16)
        this.SROM = new Uint16Array(1024 * 16)
        this.ERAM = new Uint16Array(1024 * 8)
        this.HRAM = new Uint8Array(126)
        this.WRAM = new Uint16Array(1024 * 8)
        this.VRAM = new Uint16Array(1024 * 16)
        
        this.metadata = {
            title: '',
            nintendoLogo: null,
            size: 0,
            version: 0,
            cartridgeType: 0x00,
        }
    }

    static get shared(): MMU {
        if (!this._shared) this._shared = new MMU()
        return this._shared
    }

    private loadNintendoLogo() {
        const sprites = [

        ]
    }

    private setROMMetadata(romSize: number) {
        let title: string = ''
        let publisher: string = ''
        let nintendoLogo: Uint8Array = new Uint8Array(48)

        // Nintendo Logo
        for (let i = 0; i < 47; i++) { nintendoLogo[i] = this.ROM[0x104 + i] }
        
        // Title
        for (let i = 0; i < 15; i++) { title += this.ROM[0x134 + i] !== 0x00 ? String.fromCharCode(this.ROM[0x134 + i]) : '' }

        // Manufacturer
        for (let i = 0; i < 1; i++) { publisher += this.ROM[0x144 + i] !== 0x00 ? String.fromCharCode(this.ROM[0x144 + i]) : '' }

        this.metadata = {
            title,
            nintendoLogo,
            size: romSize,
            version: this.ROM[0x14C],
            cartridgeType: this.ROM[0x147]         
        }

        console.log('ROM metadata:', this.metadata)
    }

    public async loadROMIntoMemory(path: string) {
        try {
            // Fetch ROM
            const romData = this.rawRomData = new Uint16Array(await this.fetchROM(path))
            
            for (let address = 0; address < romData.byteLength; address++) {
                if (address <= 0x00FF && !this.skipBios) {
                    // Bios 0x0000 - 0x00FF
                    this.bios[address] = romData[address]
                } else if (address >= 0x0000 && address <= 0x3FFF) {
                    // Cartridge ROM - 0x0000 - 0x3FFF
                    this.ROM[address] = romData[address]
                } else if (address >= 0x4000 && address <= 0x7FFF) {
                  // Cartridge SROM (Switchable bank) - 0x4000 - 0x7FFF
                  this.SROM[address-0x4000] = romData[address]
                  //console.log(`Pushing ROM data ${romData[address].toString(16)} to SROM address ${address.toString(16)}`)
                }
            }

            this.setROMMetadata(romData.byteLength)
        } catch (err) {
            console.warn('An error occurred while loading the ROM;', err)
        }        
    }

    private fetchROM(romName: string): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const http: XMLHttpRequest = new XMLHttpRequest()
            
            http.onload = (e: any) => resolve(new Uint8Array(http.response))
            http.onerror = (err: any) => reject(err)

            http.responseType = 'arraybuffer'
            http.open('GET', `./${romName}`)
            http.send()
        })
    }

    private loadROMByCartridgeType(byte: number) {
        switch (byte) {
            case ICartridgeType.ROM_ONLY:
            break
            
            default: throw `Unsupported cartridge type: (${byte})`
        }
    }

    public switchROMBank(romBankNr: number = 0) {
      this.SROM[0x0000] = this.rawRomData[this.ROMBank*romBankNr]
    }

    /* private loadROM(): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
            const fileInput: HTMLInputElement = document.querySelector('#file-input')
            const reader = new FileReader()

            fileInput.onchange = (e: any) => {
                const file = e.target.files[0]
                
                reader.onload = (e: ProgressEvent<FileReader>) => resolve(new Uint8Array(e.target.result as ArrayBuffer))
                reader.onerror = (err: ProgressEvent<FileReader>) => reject(err)
                reader.readAsArrayBuffer(file)
            }
        })
    } */

    reset() {
        // TODO: Reset ROM and RAM banks
    }

    getImmediate8(pc: number):number {
        return this.read(pc) & 0xFF
    }

    getImmediate16(pc: number): number {
        return (this.read(pc) | (this.read(pc + 1) << 8)) & 0xFFFF
    }

    read(address: number): number {
        if (address < 0x0000 || address > 0xFFFF) throw new Error(`Read attempt: Memory address ${address} is out of memory bounds`)
        
        if (address >= 0x0000 && address <= 0x3FFF) {
            if (!this.skipBios) {
                if (address <= 0x00FF) {
                    //console.log('R: 0x0000 - 0x00FF--> Bios', `0x${address.toString(16)}`)
                    return this.bios[address]
                } else if (this.cpu.register.PC == 0x0100) {
                    //console.log('R: 0x0000 - 0x3FFF --> 16kb ROM bank (cartridge)', `0x${address.toString(16)}`)
                    this.skipBios = true
                }
            }    
            return this.ROM[address]
        } 
        
        else if (address >= 0x4000 && address <= 0x7FFF) {
            //console.log('R: 0x4000 - 0x7FFF --> 16kb ROM bank (cartridge, switchable)', `0x${address.toString(16)}: ${this.SROM[address-0x4000]}`)
            return this.SROM[address - 0x4000]
        }  
        
        else if (address >= 0x8000 && address <= 0x9FFF) {
            //console.log('R: 0x8000 - 0x9FFF --> 8kb VRAM (CGB mode, switchable)', `0x${address.toString(16)}`)
            return this.VRAM[address - 0x8000]
        } 
        
        else if (address >= 0xA000 && address <= 0xBFFF) {
            //console.log('R: 0xA000 - 0xBFFF --> 8kb external RAM (cartridge)', `0x${address.toString(16)}`)
            return this.ERAM[address - 0xA000]
        } 
        
        else if (address >= 0xC000 && address <= 0xCFFF) {
            //console.log('R: 0xC000 - 0xCFFF --> 4kb RAM', `0x${address.toString(16)}`)
            return this.WRAM[address - 0xC000]
        } 
        
        else if (address >= 0xD000 && address <= 0xDFFF) {
            //console.log('R: 0xC000 - 0xCFFF --> 4kb RAM (CGB mode, switchable)', `0x${address.toString(16)}`)
            return this.WRAM[address - 0xD000]
        } 
        
        else if (address >= 0xE000 && address <= 0xFDFF) {
            //console.log('R: 0xE000 - 0xFDFF --> Mirror of 0xC000 - 0xDDFF (prohibited) ', `0x${address.toString(16)}`)
            return 0
        } 
        
        else if (address >= 0xFE00 && address <= 0xFE9F) {
            //console.log('R: 0xFE00 - 0xFE9F --> Sprite attribute table (OAM)', `0x${address.toString(16)}`)
            return this.OAM[address - 0xFE00]
        } 
        
        else if (address >= 0xFEA0 && address <= 0xFEFF) {
            //console.log('R: 0xFEA0 - 0xFEFF --> Not usable (prohibited)', `0x${address.toString(16)}`)
            return 0
        } 
        
        else if (address >= 0xFF00 && address <= 0xFF7F) {
          //console.log('R: 0xFF00 - 0xFF7F --> I/O registers', `0x${address.toString(16)}`)
          if (address === 0xFF0F) return this.IF 

          switch (address & 0x00F0) {
            case 0x40:
            case 0x50:
            case 0x60:
            case 0x70:
              return this.gpu.read(address)
            default:
              return 0
          }

          //return this.IO[address - 0xFF00]
        } 
        
        else if (address >= 0xFF80 && address <= 0xFFFE) {
          console.log('R: 0xFF80 - 0xFFFE --> High RAM (HRAM)', `0x${address.toString(16)}`)   
          return this.HRAM[(address - 0xFF80) & 0x7F]
        } 
        
        else if (address == 0xFFFF) {
            //console.log('R: 0xFFFF - 0xFFFF --> Interrupts Enable register', `0x${address.toString(16)}`)
            return this.IE
        }
        
        else {
            throw `Unhandled address: ${address}`
        }
    }

    public write(address: number, value: number): void {
      if (address === 0x81) console.log('output blargg:', address)
        //console.log('mmu address:', address, value)
        if (address < 0x0000 || address > 0xFFFF) throw new Error(`Write attempt: Memory address ${address} is out of memory bounds`)
        
        if (address >= 0x0000 && address <= 0x3FFF) {
          if (!this.skipBios) {
            if (address <= 0x00FF) {
                //console.log('R: 0x0000 - 0x00FF--> Bios', `0x${address.toString(16)}`, value.toString(16))
                this.bios[address - 0x00FF] = value
            } else {
              //console.log('W: 0x0000 - 0x3FFF --> 16kb ROM bank (cartridge)', `0x${address.toString(16)}`, value.toString(16))
              this.ROM[address] = value
            }
          } else {
            //console.log('W: 0x0000 - 0x3FFF --> 16kb ROM bank (cartridge)', `0x${address.toString(16)}`, value.toString(16))
            this.ROM[address] = value
          }         
        } 
        
        else if (address >= 0x4000 && address <= 0x7FFF) {
            //console.log('W: 0x4000 - 0x7FFF --> 16kb ROM bank (cartridge, switchable)', `0x${address.toString(16)}`, value.toString(16))
            this.SROM[address - 0x4000] = value
        }  
        
        else if (address >= 0x8000 && address <= 0x9FFF) {
            //console.log('W: 0x8000 - 0x9FFF --> 8kb VRAM (CGB mode, switchable)', `0x${address.toString(16)}`, value.toString(16))
            this.VRAM[address - 0x8000] = value
            
            if (address <= 0x9000) {
                this.VRAM[address & 0x1FFF - 0x8000] = value
                this.gpu.updateTile(address, value)
            }
        } 
        
        else if (address >= 0xA000 && address <= 0xBFFF) {
            //console.log('W: 0xA000 - 0xBFFF --> 8kb external RAM (cartridge)', `0x${address.toString(16)}`, value.toString(16))
            this.ERAM[address - 0xA000] = value
        } 
        
        else if (address >= 0xC000 && address <= 0xCFFF) {
            //console.log('W: 0xC000 - 0xCFFF --> 4kb RAM')
            this.WRAM[address - 0xC000] = value
        }
        
        else if (address >= 0xD000 && address <= 0xDFFF) {
            //console.log('W: 0xC000 - 0xCFFF --> 4kb RAM (CGB mode, switchable)', `0x${address.toString(16)}`, value.toString(16))
            this.WRAM[address - 0xD000] = value
        } 
        
        else if (address >= 0xE000 && address <= 0xFDFF) {
            //console.log('W: 0xE000 - 0xFDFF --> Mirror of 0xC000 - 0xDDFF (prohibited)', `0x${address.toString(16)}`, value.toString(16))
        } 
        
        else if (address >= 0xFE00 && address <= 0xFE9F) {
            //console.log('W: 0xFE00 - 0xFE9F --> Sprite attribute table (OAM)', `0x${address.toString(16)}`, value.toString(16))
            this.OAM[address - 0xFE00] = value
        } 
        
        else if (address >= 0xFEA0 && address <= 0xFEFF) {
            //console.log('W: 0xFEA0 - 0xFEFF --> Not usable (prohibited)', `0x${address.toString(16)}`, value.toString(16))
        } 
        
        else if (address >= 0xFF00 && address <= 0xFF7F) {
            console.log('W: 0xFF00 - 0xFF7F --> I/O registers', `0x${address.toString(16)}`, value.toString(16))
            switch (address & 0x00F0) {
              case 0x40:
              case 0x50:
              case 0x60:
              case 0x70:
                this.gpu.write(address, value)
                break                
            }
            this.IO[address - 0xFF00] = value & 0xFF
        } 
        
        else if (address >= 0xFF80 && address <= 0xFFFE) {
            console.log('W: 0xFF80 - 0xFFFE --> High RAM (HRAM)', `0x${address.toString(16)}`, value.toString(16))
            this.HRAM[(address - 0xFF80) & 0x7F] = value & 0xFF
        } 
        
        else if (address == 0xFFFF) {
            //console.log('W: 0xFFFF - 0xFFFF --> Interrupts Enable register', `0x${address.toString(16)}`, value.toString(16))
            // TODO: handle interrupts
        }
        
        else {
            throw `Unhandled address: ${address}`
        }
    }
}

export { MMU }