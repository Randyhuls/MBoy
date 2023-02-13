import { CPUClock, CPUFlag, CPUFlagType, CPURegister, CPURegisterType } from './models'
import { CPUSettings } from '../constants/cpu.constants'
import { GPUSettings } from '../constants/gpu-settings.constants'
import { Opcodes } from './opcodes'
import { Audio } from '../audio/audio'
import { GPU } from '../gpu/gpu'
import { Input } from '../input/input'
import { MMU } from '../mmu/mmu'
import { Debug } from '../debug'

class CPU {
    private IS_INTERRUPTED: number = 0x01
    private V_BLANK_INTERRUPT: number = 0x40

    private static _shared: CPU

    private debug: Debug = Debug.shared
    private mmu: MMU
    private gpu: GPU
    private input: Input
    private audio: Audio

    public opcodes: Opcodes
    //public memory: Uint8Array

    public clock: CPUClock = {
        M: 0 // Machine cycles
    }

    public register: CPURegister = {
        // 8-bit registers
        A: 0x01, B: 0x00, C: 0x13, D: 0x00, E: 0xD8, H: 0x01, L: 0x4D, F: 0xB0,

        // Program Counter and Stack Pointer
        PC: 0x0100, SP: 0xFFFE,
    }

    public IME: number = 0 // Interrupt Master enabled
    public halt: boolean = false
    public haltBug: boolean = false

    constructor() {
        this.opcodes = new Opcodes(this)
        this.mmu = MMU.shared
        this.mmu.cpu = this

         // Set debugger
        this.debug.mmu = MMU.shared
        this.debug.debugging = true
        this.gpu = GPU.shared
        this.input = new Input()
        this.audio = new Audio()
    }

    static get shared(): CPU {
        if (!this._shared) this._shared = new CPU()
        return this._shared
    }


    public reset() {
        
    }

    private handleTimer() {
      
    }

    /**
     * @description Read 8-bit address from register (e.g. A, B)
     * @param r1 
     */
    read8(r1: CPURegisterType): number {
        return this.register[r1] & 0xFF
    }

    /**
     * @description Read 16-bit address from register (e.g. BC, DE)
     * @param r1 
     * @param r2 
     */
    read16(r1h: CPURegisterType, r1l: CPURegisterType): number  {
        const hb: number = (this.register[r1h] << 8) & 0xFF00
        const lb: number = this.register[r1l] & 0x00FF
        return (hb | lb) & 0xFFFF
    }

    /**
     * @description Write 8-bit value to register (e.g. A, B)
     * @param value 
     * @param r1 
     */
    write8(value: number, r1: CPURegisterType): void {
        this.register[r1] = value & 0xFF
    }

    /**
     * @description Write 16-bit value to register (e.g. BC, DE)
     * @param value 
     * @param r1 
     * @param r2 
     */
    write16(value: number, r1h: CPURegisterType, r1l: CPURegisterType): void {
        const hb: number = ((value & 0xFF00) >> 8) & 0xFF
        const lb: number = (value & 0x00FF) & 0xFF

        this.register[r1h] = hb
        this.register[r1l] = lb
    }

    public cycle(): void {
      const { MAX_FPS, CLOCK_SPEED, MAX_FRAME_CYCLES } = CPUSettings

      let frameClock: number = (this.clock.M / 4) + GPUSettings.CYCLES_PER_FRAME
      let cycles: number = 0
      let operationCycles: number = 0
      let nextIs16bit: boolean = false

      do {
        //if (ts < lastFrameTimeMS + (1000 / CLOCK_SPEED)) {
          //return requestAnimationFrame(c)
        //}

        if (this.IME && this.mmu.IE && this.mmu.IF) {
          if (this.mmu.IE & this.mmu.IF & this.IS_INTERRUPTED) {
            this.mmu.IF &= 0xFF - this.IS_INTERRUPTED
            this.opcodes.RST(this.V_BLANK_INTERRUPT)
          }
        }

        this.register.PC &= MAX_FRAME_CYCLES
        const pc: number = this.register.PC
        let opcode: number = this.mmu.read(nextIs16bit ? pc + 1 : pc)
        cycles = this.clock.M
        
        console.log('----------------BLARGG---------------')
        console.log('Instruction:', opcode.toString(16).toUpperCase(), nextIs16bit ? '16 bit' : '8 bit')
        console.log(`A: ${this.register.A.toString(16).toUpperCase()}, F: ${this.register.F.toString(16).toUpperCase()}, B: ${this.register.B.toString(16).toUpperCase()}, C: ${this.register.C.toString(16).toUpperCase()}, D: ${this.register.D.toString(16).toUpperCase()}, E: ${this.register.E.toString(16).toUpperCase()}, H: ${this.register.H.toString(16).toUpperCase()}, L: ${this.register.L.toString(16).toUpperCase()}, SP: ${this.register.SP.toString(16).toUpperCase()}, PC: ${this.register.PC.toString(16).toUpperCase()}, (${this.mmu.read(this.register.PC).toString(16).toUpperCase()} ${this.mmu.read(this.register.PC+1).toString(16).toUpperCase()} ${this.mmu.read(this.register.PC+2).toString(16).toUpperCase()} ${this.mmu.read(this.register.PC+3).toString(16).toUpperCase()})`)
        //console.log('CLOCK:', this.clock.M)
        console.log('CYCLES:', cycles)
        console.log('PC:', this.register.PC)

        this.executeInstruction(opcode, nextIs16bit ? 16 : 8)
        nextIs16bit = opcode == 0xCB
        
        //console.log('-------------------------------------')
        this.debug.readSerialOutput()
        this.gpu.tick()
      } while(this.clock.M / 4 < frameClock)
    }

    private executeInstruction(opcode: number, type: 8|16): void {
        // We interpret all opcodes as 16-bit by masking with FFFF; 
        // then we distinguish between 8-bit and 16-bit with an additional nested switch case

        function execute8bit() {
            //console.log('8-bit instruction: ', opcode)

            switch (opcode & 0xFFFF) {
                // 8-bit operands
                case opcode & 0xFFFF: 
                    switch (opcode & 0xFF) {
                        case 0x00: this.opcodes.NOP() 
                        break
    
                        case 0x01: this.opcodes.LD_RR_d16('B', 'C')
                        break
    
                        case 0x02: this.opcodes.LD_RR_R('B', 'C', 'A')
                        break
    
                        case 0x03: this.opcodes.INC_RR('B', 'C')
                        break
    
                        case 0x04: this.opcodes.INC_R('B')
                        break
    
                        case 0x05: this.opcodes.DEC_R('B')
                        break
    
                        case 0x06: this.opcodes.LD_R_d8('B')
                        break
    
                        case 0x07: this.opcodes.RLC_R('A', 1, 4)
                        break
    
                        case 0x08: this.opcodes.LD_a16_SP()
                        break
    
                        case 0x09: this.opcodes.ADD_RR_RR('H', 'L', 'B', 'C');
                        break
    
                        case 0x0A: this.opcodes.LD_R_RR('A', 'B', 'C')
                        break
    
                        case 0x0B: this.opcodes.DEC_RR('B', 'C')
                        break
    
                        case 0x0C: this.opcodes.INC_R('C')
                        break
    
                        case 0x0D: this.opcodes.DEC_R('C')
                        break
    
                        case 0x0E: this.opcodes.LD_R_d8('C')
                        break
    
                        case 0x0F: this.opcodes.RRC_R('A', 1, 4)
                        break
    
                        case 0x11: this.opcodes.LD_RR_d16('D', 'E')
                        break
    
                        case 0x12: this.opcodes.LD_RR_R('D', 'E', 'A')
                        break
    
                        case 0x13: this.opcodes.INC_RR('D', 'E')
                        break
    
                        case 0x14: this.opcodes.INC_R('D')
                        break
    
                        case 0x15: this.opcodes.DEC_R('D')
                        break
    
                        case 0x16: this.opcodes.LD_R_d8('D')
                        break
    
                        case 0x17: this.opcodes.RL_R('A', 1, 4)
                        break
    
                        case 0x18: this.opcodes.JR()
                        break
    
                        case 0x19: this.opcodes.ADD_RR_RR('H', 'L', 'D', 'E')
                        break
    
                        case 0x1A: this.opcodes.LD_R_RR('A', 'D','E')
                        break
    
                        case 0x1B: this.opcodes.DEC_RR('D', 'E')
                        break
    
                        case 0x1C: this.opcodes.INC_R('E')
                        break
    
                        case 0x1D: this.opcodes.DEC_R('E')
                        break
    
                        case 0x1E: this.opcodes.LD_R_d8('E')
                        break
    
                        case 0x1F: this.opcodes.RR_R('A', 1, 4)
                        break
    
                        case 0x20: this.opcodes.JR_NF(CPUFlagType.Z)
                        break
    
                        case 0x21: this.opcodes.LD_RR_d16('H', 'L')
                        break
    
                        case 0x22: this.opcodes.LD_RR_R('H', 'L', 'A', true)
                        break
    
                        case 0x23: this.opcodes.INC_RR('H', 'L')
                        break
    
                        case 0x24: this.opcodes.INC_R('H')
                        break
    
                        case 0x25: this.opcodes.DEC_R('H')
                        break
    
                        case 0x26: this.opcodes.LD_R_d8('H')
                        break
    
                        case 0x27: this.opcodes.DAA()
                        break
    
                        case 0x28: this.opcodes.JR_F(CPUFlagType.Z)
                        break
    
                        case 0x29: this.opcodes.ADD_RR_RR('H', 'L', 'H', 'L')
                        break
    
                        case 0x2A: this.opcodes.LD_R_RR('A', 'H', 'L', true)
                        break
    
                        case 0x2B: this.opcodes.DEC_RR('H', 'L')
                        break
    
                        case 0x2C: this.opcodes.INC_R('L')
                        break
    
                        case 0x2D: this.opcodes.DEC_R('L')
                        break
    
                        case 0x2E: this.opcodes.LD_R_d8('L')
                        break
    
                        case 0x2F: this.opcodes.CPL()
                        break
    
                        case 0x30: this.opcodes.JR_NF(CPUFlagType.C)
                        break
    
                        case 0x31: this.opcodes.LD_SP_d16()
                        break
    
                        case 0x32: this.opcodes.LD_RR_R('H', 'L', 'A', false, true)
                        break
    
                        case 0x33: this.opcodes.INC_SP()
                        break
    
                        case 0x34: this.opcodes.INC_RR_mem('H', 'L')
                        break
    
                        case 0x35: this.opcodes.DEC_RR_mem('H', 'L')
                        break
    
                        case 0x36: this.opcodes.LD_RR_nn('H', 'L')
                        break
    
                        case 0x37: this.opcodes.SCF()
                        break
    
                        case 0x38: this.opcodes.JR_F(CPUFlagType.C)
                        break
    
                        case 0x39: this.opcodes.ADD_RR_SP('H', 'L')
                        break
    
                        case 0x3A: this.opcodes.LD_R_RR('A', 'H', 'L', false, true)
                        break
    
                        case 0x3B: this.opcodes.DEC_SP()
                        break
    
                        case 0x3C: this.opcodes.INC_R('A')
                        break
    
                        case 0x3D: this.opcodes.DEC_R('A')
                        break
    
                        case 0x3E: this.opcodes.LD_R_d8('A')
                        break
    
                        case 0x3F: this.opcodes.CCF()
                        break
    
                        case 0x40: this.opcodes.LD_R_R('B', 'B')
                        break
    
                        case 0x41: this.opcodes.LD_R_R('B', 'C')
                        break
    
                        case 0x42: this.opcodes.LD_R_R('B', 'D')
                        break
    
                        case 0x43: this.opcodes.LD_R_R('B', 'E')
                        break
    
                        case 0x44: this.opcodes.LD_R_R('B', 'H')
                        break
    
                        case 0x45: this.opcodes.LD_R_R('B', 'L')
                        break
    
                        case 0x46: this.opcodes.LD_R_RR('B', 'H', 'L')
                        break
    
                        case 0x47: this.opcodes.LD_R_R('B', 'A')
                        break
    
                        case 0x48: this.opcodes.LD_R_R('C', 'B')
                        break
    
                        case 0x49: this.opcodes.LD_R_R('C', 'C')
                        break
    
                        case 0x4A: this.opcodes.LD_R_R('C', 'D')
                        break
    
                        case 0x4B: this.opcodes.LD_R_R('C', 'E')
                        break
    
                        case 0x4C: this.opcodes.LD_R_R('C', 'H')
                        break
    
                        case 0x4D: this.opcodes.LD_R_R('C', 'L')
                        break
    
                        case 0x4E: this.opcodes.LD_RR_R('C', 'H', 'L')
                        break
    
                        case 0x4F: this.opcodes.LD_R_R('C', 'A')
                        break
    
                        case 0x50: this.opcodes.LD_R_R('D', 'B')
                        break
    
                        case 0x51: this.opcodes.LD_R_R('D', 'C')
                        break
    
                        case 0x52: this.opcodes.LD_R_R('D', 'D')
                        break
    
                        case 0x53: this.opcodes.LD_R_R('D', 'E')
                        break
    
                        case 0x54: this.opcodes.LD_R_R('D', 'H')
                        break
    
                        case 0x55: this.opcodes.LD_R_R('D', 'L')
                        break
    
                        case 0x56: this.opcodes.LD_R_RR('D', 'H', 'L')
                        break
    
                        case 0x57: this.opcodes.LD_R_R('D', 'A')
                        break
    
                        case 0x58: this.opcodes.LD_R_R('E', 'B')
                        break
    
                        case 0x59: this.opcodes.LD_R_R('E', 'C')
                        break
    
                        case 0x5A: this.opcodes.LD_R_R('E', 'D')
                        break
    
                        case 0x5B: this.opcodes.LD_R_R('E', 'E')
                        break
    
                        case 0x5C: this.opcodes.LD_R_R('E', 'H')
                        break
    
                        case 0x5D: this.opcodes.LD_R_R('E', 'L')
                        break
    
                        case 0x5E: this.opcodes.LD_R_RR('E', 'H', 'L')
                        break
    
                        case 0x5F: this.opcodes.LD_R_R('E', 'A')
                        break
    
                        case 0x60: this.opcodes.LD_R_R('H', 'B')
                        break
    
                        case 0x61: this.opcodes.LD_R_R('H', 'C')
                        break
    
                        case 0x62: this.opcodes.LD_R_R('H', 'D')
                        break
    
                        case 0x63: this.opcodes.LD_R_R('H', 'E')
                        break
    
                        case 0x64: this.opcodes.LD_R_R('H', 'H')
                        break
    
                        case 0x65: this.opcodes.LD_R_R('H', 'L')
                        break
    
                        case 0x66: this.opcodes.LD_R_RR('H', 'H', 'L')
                        break
                    
                        case 0x67: this.opcodes.LD_R_R('H', 'A')
                        break
                    
                        case 0x68: this.opcodes.LD_R_R('L', 'B')
                        break
                    
                        case 0x69: this.opcodes.LD_R_R('L', 'C')
                        break
                    
                        case 0x6A: this.opcodes.LD_R_R('L', 'D')
                        break
                    
                        case 0x6B: this.opcodes.LD_R_R('L', 'E')
                        break
                    
                        case 0x6C: this.opcodes.LD_R_R('L', 'H')
                        break
                    
                        case 0x6D: this.opcodes.LD_R_R('L', 'L')
                        break
                    
                        case 0x6E: this.opcodes.LD_R_RR('L', 'H', 'L')
                        break
    
                        case 0x6F: this.opcodes.LD_R_R('L', 'A')
                        break
    
                        case 0x70: this.opcodes.LD_RR_R('H', 'L', 'B')
                        break
    
                        case 0x71: this.opcodes.LD_RR_R('H', 'L', 'C')
                        break
    
                        case 0x72: this.opcodes.LD_RR_R('H', 'L', 'D')
                        break
    
                        case 0x73: this.opcodes.LD_RR_R('H', 'L', 'E')
                        break
    
                        case 0x74: this.opcodes.LD_RR_R('H', 'L', 'H')
                        break
    
                        case 0x75: this.opcodes.LD_RR_R('H', 'L', 'L')
                        break
    
                        case 0x76: this.opcodes.HALT()
                        break
    
                        case 0x77: this.opcodes.LD_RR_R('H', 'L', 'A')
                        break
    
                        case 0x78: this.opcodes.LD_R_R('A', 'B')
                        break
    
                        case 0x79: this.opcodes.LD_R_R('A', 'C')
                        break
    
                        case 0x7A: this.opcodes.LD_R_R('A', 'D')
                        break
    
                        case 0x7B: this.opcodes.LD_R_R('A', 'E')
                        break
    
                        case 0x7C: this.opcodes.LD_R_R('A', 'H')
                        break
    
                        case 0x7D: this.opcodes.LD_R_R('A', 'L')
                        break
    
                        case 0x7E: this.opcodes.LD_R_RR('A', 'H', 'L')
                        break
    
                        case 0x7F: this.opcodes.LD_R_R('A', 'A')
                        break
    
                        case 0x80: this.opcodes.ADD_R_R('A', 'B')
                        break
    
                        case 0x81: this.opcodes.ADD_R_R('A', 'C')
                        break
    
                        case 0x82: this.opcodes.ADD_R_R('A', 'D')
                        break
    
                        case 0x83: this.opcodes.ADD_R_R('A', 'E')
                        break
    
                        case 0x84: this.opcodes.ADD_R_R('A', 'H')
                        break
    
                        case 0x85: this.opcodes.ADD_R_R('A', 'L')
                        break
    
                        case 0x86: this.opcodes.ADD_R_RR('A', 'H', 'L')
                        break
    
                        case 0x87: this.opcodes.ADD_R_R('A', 'A')
                        break
    
                        case 0x88: this.opcodes.ADC_R_R('A', 'B')
                        break
    
                        case 0x89: this.opcodes.ADC_R_R('A', 'C')
                        break
    
                        case 0x8A: this.opcodes.ADC_R_R('A', 'D')
                        break
    
                        case 0x8B: this.opcodes.ADC_R_R('A', 'E')
                        break
    
                        case 0x8C: this.opcodes.ADC_R_R('A', 'H')
                        break
    
                        case 0x8D: this.opcodes.ADC_R_R('A', 'L')
                        break
    
                        case 0x8E: this.opcodes.ADC_R_RR('A', 'H', 'L')
                        break
    
                        case 0x8F: this.opcodes.ADC_R_R('A', 'A')
                        break
    
                        case 0x90: this.opcodes.SUB_R('B')
                        break
    
                        case 0x91: this.opcodes.SUB_R('C')
                        break
    
                        case 0x92: this.opcodes.SUB_R('D')
                        break
    
                        case 0x93: this.opcodes.SUB_R('E')
                        break
    
                        case 0x94: this.opcodes.SUB_R('H')
                        break
    
                        case 0x95: this.opcodes.SUB_R('L')
                        break
    
                        case 0x96: this.opcodes.SUB_RR('H', 'L')
                        break
    
                        case 0x97: this.opcodes.SUB_R('A')
                        break
    
                        case 0x98: this.opcodes.SBC_R_R('A', 'B')
                        break
    
                        case 0x99: this.opcodes.SBC_R_R('A', 'C')
                        break
    
                        case 0x9A: this.opcodes.SBC_R_R('A', 'D')
                        break
    
                        case 0x9B: this.opcodes.SBC_R_R('A', 'E')
                        break
    
                        case 0x9C: this.opcodes.SBC_R_R('A', 'H')
                        break
    
                        case 0x9D: this.opcodes.SBC_R_R('A', 'L')
                        break
    
                        case 0x9E: this.opcodes.SBC_R_RR('A', 'H', 'L')
                        break
    
                        case 0x9F: this.opcodes.SBC_R_R('A', 'A')
                        break
    
                        case 0xA0: this.opcodes.AND_R('B')
                        break
    
                        case 0xA1: this.opcodes.AND_R('C')
                        break
    
                        case 0xA2: this.opcodes.AND_R('D')
                        break
    
                        case 0xA3: this.opcodes.AND_R('E')
                        break
    
                        case 0xA4: this.opcodes.AND_R('H')
                        break
    
                        case 0xA5: this.opcodes.AND_R('L')
                        break
    
                        case 0xA6: this.opcodes.AND_RR('H', 'L')
                        break
    
                        case 0xA7: this.opcodes.AND_R('A')
                        break
    
                        case 0xA8: this.opcodes.XOR_R('B')
                        break
    
                        case 0xA9: this.opcodes.XOR_R('C')
                        break
    
                        case 0xAA: this.opcodes.XOR_R('D')
                        break
    
                        case 0xAB: this.opcodes.XOR_R('E')
                        break
                        
                        case 0xAC: this.opcodes.XOR_R('H')
                        break
                        
                        case 0xAD: this.opcodes.XOR_R('L')
                        break
                        
                        case 0xAE: this.opcodes.XOR_RR('H', 'L')
                        break
    
                        case 0xAF: this.opcodes.XOR_R('A')
                        break
    
                        case 0xB0: this.opcodes.OR_R('B')
                        break
    
                        case 0xB1: this.opcodes.OR_R('C')
                        break
    
                        case 0xB2: this.opcodes.OR_R('D')
                        break
    
                        case 0xB3: this.opcodes.OR_R('E')
                        break
    
                        case 0xB4: this.opcodes.OR_R('H')
                        break
    
                        case 0xB5: this.opcodes.OR_R('L')
                        break
    
                        case 0xB6: this.opcodes.OR_RR('H', 'L')
                        break
    
                        case 0xB7: this.opcodes.OR_R('A')
                        break
    
                        case 0xB8: this.opcodes.CP_R('B')
                        break
    
                        case 0xB9: this.opcodes.CP_R('C')
                        break
    
                        case 0xBA: this.opcodes.CP_R('D')
                        break
    
                        case 0xBB: this.opcodes.CP_R('E')
                        break
    
                        case 0xBC: this.opcodes.CP_R('H')
                        break
    
                        case 0xBD: this.opcodes.CP_R('L')
                        break
    
                        case 0xBE: this.opcodes.CP_RR('H', 'L')
                        break
    
                        case 0xBF: this.opcodes.CP_R('A')
                        break
    
                        case 0xC0: this.opcodes.RET_NF(CPUFlagType.Z)
                        break
    
                        case 0xC1: this.opcodes.POP_RR('B', 'C')
                        break
    
                        case 0xC2: this.opcodes.JP_NF(CPUFlagType.Z)
                        break
    
                        case 0xC3: this.opcodes.JP()
                        break
    
                        case 0xC4: this.opcodes.CALL_NF(CPUFlagType.Z)
                        break
    
                        case 0xC5: this.opcodes.PUSH_RR('B', 'C')
                        break
    
                        case 0xC6: this.opcodes.ADD_R_d8('A')
                        break
    
                        case 0xC7: this.opcodes.RST(0x00)
                        break
    
                        case 0xC8: this.opcodes.RET_F(CPUFlagType.Z)
                        break
    
                        case 0xC9: this.opcodes.RET()
                        break
    
                        case 0xCA: this.opcodes.JP_F(CPUFlagType.Z)
                        break
    
                        case 0xCB: // Not implemented by CPU
                        break 
    
                        case 0xCC: this.opcodes.CALL_F(CPUFlagType.Z)
                        break
    
                        case 0xCD: this.opcodes.CALL()
                        break
    
                        case 0xCE: this.opcodes.ADC_R_d8('A')
                        break
    
                        case 0xCF: this.opcodes.RST(0x08)
                        break
    
                        case 0xD0: this.opcodes.RET_NF(CPUFlagType.C)
                        break
    
                        case 0xD1: this.opcodes.POP_RR('D', 'E')
                        break
    
                        case 0xD2: this.opcodes.JP_NF(CPUFlagType.C)
                        break
    
                        case 0xD3: // Not implemented by CPU
                        break
    
                        case 0xD4: this.opcodes.CALL_NF(CPUFlagType.C)
                        break
    
                        case 0xD5: this.opcodes.PUSH_RR('D', 'E')
                        break
    
                        case 0xD6: this.opcodes.SUB()
                        break
    
                        case 0xD7: this.opcodes.RST(0x10)
                        break
    
                        case 0xD8: this.opcodes.RET_F(CPUFlagType.C)
                        break
    
                        case 0xD9: this.opcodes.RETI()
                        break
    
                        case 0xDA: this.opcodes.JP_F(CPUFlagType.C)
                        break
    
                        case 0xDB: // Not implemented by CPU
                        break
    
                        case 0xDC: this.opcodes.CALL_F(CPUFlagType.C)
                        break
    
                        case 0xDD: // Not implemented by CPU
                        break
    
                        case 0xDE: this.opcodes.SBC_R_d8('A')
                        break
    
                        case 0xDF: this.opcodes.RST(0x18)
                        break
    
                        case 0xE0: this.opcodes.LD_a8_R('A')
                        break
    
                        case 0xE1: this.opcodes.POP_RR('H', 'L')
                        break
    
                        case 0xE2: this.opcodes.LD_C_R('A')
                        break
    
                        case 0xE3: 
                        case 0xE4: 
                        // Not implemented by CPU
                        break
    
                        case 0xE5: this.opcodes.PUSH_RR('H', 'L')
                        break
    
                        case 0xE6: this.opcodes.AND()
                        break
    
                        case 0xE7: this.opcodes.RST(0x20)
                        break
    
                        case 0xE8: this.opcodes.ADD_SP_d8()
                        break
    
                        case 0xE9: this.opcodes.JP_RR('H', 'L')
                        break
    
                        case 0xEA: this.opcodes.LD_a16_R('A')
                        break
    
                        case 0xEB: 
                        case 0xEC: 
                        case 0xED:
                        // Not implemented by CPU
                        break 
    
                        case 0xEE: this.opcodes.XOR()
                        break
    
                        case 0xEF: this.opcodes.RST(0x28)
                        break
    
                        case 0xF0: this.opcodes.LD_R_a8('A')
                        break
    
                        case 0xF1: this.opcodes.POP_RR('A', 'F')
                        break
    
                        case 0xF2: this.opcodes.LD_R_C('A')
                        break
    
                        case 0xF3: this.opcodes.DI()
                        break
    
                        case 0xF4: // Not implemented by CPU
                        break
    
                        case 0xF5: this.opcodes.PUSH_RR('A', 'F')
                        break
    
                        case 0xF6: this.opcodes.OR()
                        break
    
                        case 0xF7: this.opcodes.RST(0x30)
                        break
    
                        case 0xF8: this.opcodes.LD_RR_SPd8('H', 'L')
                        break
    
                        case 0xF9: this.opcodes.LD_SP_RR('H', 'L')
                        break
    
                        case 0xFA: this.opcodes.LD_R_a16('A')
                        break
    
                        case 0xFB: this.opcodes.EI()
                        break
    
                        case 0xFC:
                        case 0xFD:
                        // Not implemented by CPU
                        break
    
                        case 0xFE: this.opcodes.CP()
                        break
    
                        case 0xFF: this.opcodes.RST(0x38)
                        break
                    }
                  break
    
                // 16-bit operands
                case 0x1000: this.opcodes.STOP()
                break
                
                default: 
                console.log('Unimplemented opcode (8-bit):', opcode)
                //throw new Error(`Unknown opcode: ${opcode}`)
            }
        }

        function execute16bit() {
            //console.log('16-bit instruction: ', opcode)

            switch (opcode & 0xCBFF) {
                case opcode & 0xCBFF: 
                    switch (opcode & 0xFF) {
                        case 0x00: this.opcodes.RLC_R('B', 2, 8)
                        break

                        case 0x01: this.opcodes.RLC_R('C', 2, 8)
                        break

                        case 0x02: this.opcodes.RLC_R('D', 2, 8)
                        break

                        case 0x03: this.opcodes.RLC_R('E', 2, 8)
                        break

                        case 0x04: this.opcodes.RLC_R('H', 2, 8)
                        break

                        case 0x05: this.opcodes.RLC_R('L', 2, 8)
                        break

                        case 0x06: this.opcodes.RLC_RR('H', 'L')
                        break

                        case 0x07: this.opcodes.RLC_R('A', 2, 8)
                        break

                        case 0x08: this.opcodes.RRC_R('B', 2, 8)
                        break

                        case 0x09: this.opcodes.RRC_R('C', 2, 8)
                        break

                        case 0x0A: this.opcodes.RRC_R('D', 2, 8)
                        break

                        case 0x0B: this.opcodes.RRC_R('E', 2, 8)
                        break

                        case 0x0C: this.opcodes.RRC_R('H', 2, 8)
                        break

                        case 0x0D: this.opcodes.RRC_R('L', 2, 8)
                        break

                        case 0x0E: this.opcodes.RRC_RR('H', 'L')
                        break

                        case 0x0F: this.opcodes.RRC_R('A', 2, 8)
                        break

                        case 0x10: this.opcodes.RL_R('B', 2, 8)
                        break

                        case 0x11: this.opcodes.RL_R('C', 2, 8)
                        break

                        case 0x12: this.opcodes.RL_R('D', 2, 8)
                        break

                        case 0x13: this.opcodes.RL_R('E', 2, 8)
                        break

                        case 0x14: this.opcodes.RL_R('H', 2, 8)
                        break

                        case 0x15: this.opcodes.RL_R('L', 2, 8)
                        break

                        case 0x16: this.opcodes.RL_RR('H', 'L')
                        break

                        case 0x18: this.opcodes.RL_R('A', 2, 8)
                        break

                        case 0x19: this.opcodes.RR_R('B', 2, 8)
                        break

                        case 0x1A: this.opcodes.RR_R('D', 2, 8)
                        break

                        case 0x1B: this.opcodes.RR_R('E', 2, 8)
                        break

                        case 0x1C: this.opcodes.RR_R('H', 2, 8)
                        break

                        case 0x1D: this.opcodes.RR_R('L', 2, 8)
                        break

                        case 0x1E: this.opcodes.RR_RR('H', 'L')
                        break

                        case 0x1F: this.opcodes.RR_R('A', 2, 8)
                        break

                        case 0x20: this.opcodes.SLA_R('B')
                        break

                        case 0x21: this.opcodes.SLA_R('C')
                        break

                        case 0x22: this.opcodes.SLA_R('D')
                        break

                        case 0x23: this.opcodes.SLA_R('E')
                        break

                        case 0x24: this.opcodes.SLA_R('H')
                        break

                        case 0x25: this.opcodes.SLA_R('L')
                        break

                        case 0x26: this.opcodes.SLA_RR('H', 'L')
                        break

                        case 0x27: this.opcodes.SLA_R('A')
                        break

                        case 0x28: this.opcodes.SRA_R('B')
                        break

                        case 0x29: this.opcodes.SRA_R('C')
                        break

                        case 0x2A: this.opcodes.SRA_R('D')
                        break

                        case 0x2B: this.opcodes.SRA_R('E')
                        break

                        case 0x2C: this.opcodes.SRA_R('H')
                        break

                        case 0x2D: this.opcodes.SRA_R('L')
                        break

                        case 0x2E: this.opcodes.SRA_RR('H', 'L')
                        break

                        case 0x2F: this.opcodes.SRA_R('A')
                        break

                        case 0x30: this.opcodes.SWAP_R('B')
                        break

                        case 0x31: this.opcodes.SWAP_R('C')
                        break

                        case 0x32: this.opcodes.SWAP_R('D')
                        break

                        case 0x33: this.opcodes.SWAP_R('E')
                        break

                        case 0x34: this.opcodes.SWAP_R('H')
                        break

                        case 0x35: this.opcodes.SWAP_R('L')
                        break

                        case 0x36: this.opcodes.SWAP_RR('H', 'L')
                        break

                        case 0x37: this.opcodes.SWAP_R('A')
                        break

                        case 0x38: this.opcodes.SRL_R('B')
                        break

                        case 0x39: this.opcodes.SRL_R('C')
                        break

                        case 0x3A: this.opcodes.SRL_R('D')
                        break

                        case 0x3B: this.opcodes.SRL_R('E')
                        break

                        case 0x3C: this.opcodes.SRL_R('H')
                        break

                        case 0x3D: this.opcodes.SRL_R('L')
                        break

                        case 0x3E: this.opcodes.SRL_RR('H', 'L')
                        break

                        case 0x3F: this.opcodes.SRL_R('A')
                        break

                        case 0x40: this.opcodes.BIT_b_R(0x01, 'B') // 0x01 = bit 0
                        break

                        case 0x41: this.opcodes.BIT_b_R(0x01, 'C')
                        break

                        case 0x42: this.opcodes.BIT_b_R(0x01, 'D')
                        break

                        case 0x43: this.opcodes.BIT_b_R(0x01, 'E')
                        break

                        case 0x44: this.opcodes.BIT_b_R(0x01, 'H')
                        break

                        case 0x45: this.opcodes.BIT_b_R(0x01, 'L')
                        break

                        case 0x46: this.opcodes.BIT_b_RR(0x01, 'H', 'L')
                        break

                        case 0x47: this.opcodes.BIT_b_R(0x01, 'A') 
                        break

                        case 0x48: this.opcodes.BIT_b_R(0x02, 'B') // 0x02 = bit 1
                        break

                        case 0x49: this.opcodes.BIT_b_R(0x02, 'C')
                        break

                        case 0x4A: this.opcodes.BIT_b_R(0x02, 'D')
                        break

                        case 0x4B: this.opcodes.BIT_b_R(0x02, 'E')
                        break

                        case 0x4C: this.opcodes.BIT_b_R(0x02, 'H')
                        break

                        case 0x4D: this.opcodes.BIT_b_R(0x02, 'L')
                        break

                        case 0x4E: this.opcodes.BIT_b_RR(0x02, 'H', 'L')
                        break

                        case 0x4F: this.opcodes.BIT_b_R(0x02, 'A')
                        break

                        case 0x50: this.opcodes.BIT_b_R(0x04, 'B') // 0x04 = bit 2
                        break

                        case 0x51: this.opcodes.BIT_b_R(0x04, 'C')
                        break

                        case 0x52: this.opcodes.BIT_b_R(0x04, 'D')
                        break

                        case 0x53: this.opcodes.BIT_b_R(0x04, 'E')
                        break

                        case 0x54: this.opcodes.BIT_b_R(0x04, 'H')
                        break

                        case 0x55: this.opcodes.BIT_b_R(0x04, 'L')
                        break

                        case 0x56: this.opcodes.BIT_b_RR(0x04, 'H', 'L')
                        break

                        case 0x57: this.opcodes.BIT_b_R(0x04, 'A') 
                        break

                        case 0x58: this.opcodes.BIT_b_R(0x08, 'B') // 0x08 = bit 3
                        break

                        case 0x59: this.opcodes.BIT_b_R(0x08, 'C')
                        break

                        case 0x5A: this.opcodes.BIT_b_R(0x08, 'D')
                        break

                        case 0x5B: this.opcodes.BIT_b_R(0x08, 'E')
                        break

                        case 0x5C: this.opcodes.BIT_b_R(0x08, 'H')
                        break

                        case 0x5D: this.opcodes.BIT_b_R(0x08, 'L')
                        break

                        case 0x5E: this.opcodes.BIT_b_RR(0x08, 'H', 'L')
                        break

                        case 0x5F: this.opcodes.BIT_b_R(0x08, 'A')
                        break

                        case 0x60: this.opcodes.BIT_b_R(0x10, 'B') // 0x10 = bit 4
                        break

                        case 0x61: this.opcodes.BIT_b_R(0x10, 'C')
                        break

                        case 0x62: this.opcodes.BIT_b_R(0x10, 'D')
                        break

                        case 0x63: this.opcodes.BIT_b_R(0x10, 'E')
                        break

                        case 0x64: this.opcodes.BIT_b_R(0x10, 'H')
                        break

                        case 0x65: this.opcodes.BIT_b_R(0x10, 'L')
                        break

                        case 0x66: this.opcodes.BIT_b_RR(0x10, 'H', 'L')
                        break

                        case 0x67: this.opcodes.BIT_b_R(0x10, 'A') 
                        break

                        case 0x68: this.opcodes.BIT_b_R(0x20, 'B') // 0x20 = bit 5
                        break

                        case 0x69: this.opcodes.BIT_b_R(0x20, 'C')
                        break

                        case 0x6A: this.opcodes.BIT_b_R(0x20, 'D')
                        break

                        case 0x6B: this.opcodes.BIT_b_R(0x20, 'E')
                        break

                        case 0x6C: this.opcodes.BIT_b_R(0x20, 'H')
                        break

                        case 0x6D: this.opcodes.BIT_b_R(0x20, 'L')
                        break

                        case 0x6E: this.opcodes.BIT_b_RR(0x20, 'H', 'L')
                        break

                        case 0x6F: this.opcodes.BIT_b_R(0x20, 'A')
                        break

                        case 0x70: this.opcodes.BIT_b_R(0x40, 'B') // 0x40 = bit 6
                        break

                        case 0x71: this.opcodes.BIT_b_R(0x40, 'C')
                        break

                        case 0x72: this.opcodes.BIT_b_R(0x40, 'D')
                        break

                        case 0x73: this.opcodes.BIT_b_R(0x40, 'E')
                        break

                        case 0x74: this.opcodes.BIT_b_R(0x40, 'H')
                        break

                        case 0x75: this.opcodes.BIT_b_R(0x40, 'L')
                        break

                        case 0x76: this.opcodes.BIT_b_RR(0x40, 'H', 'L')
                        break

                        case 0x77: this.opcodes.BIT_b_R(0x40, 'A') 
                        break

                        case 0x78: this.opcodes.BIT_b_R(0x80, 'B') // 0x80 = bit 7
                        break

                        case 0x79: this.opcodes.BIT_b_R(0x80, 'C')
                        break

                        case 0x7A: this.opcodes.BIT_b_R(0x80, 'D')
                        break

                        case 0x7B: this.opcodes.BIT_b_R(0x80, 'E')
                        break

                        case 0x7C: this.opcodes.BIT_b_R(0x80, 'H')
                        break

                        case 0x7D: this.opcodes.BIT_b_R(0x80, 'L')
                        break

                        case 0x7E: this.opcodes.BIT_b_RR(0x80, 'H', 'L')
                        break

                        case 0x7F: this.opcodes.BIT_b_R(0x80, 'A')
                        break

                        case 0x80: this.opcodes.RES_b_R(0x01, 'B') // 0x00 = bit 0
                        break

                        case 0x81: this.opcodes.RES_b_R(0x01, 'C')
                        break

                        case 0x82: this.opcodes.RES_b_R(0x01, 'D') 
                        break

                        case 0x83: this.opcodes.RES_b_R(0x01, 'E') 
                        break

                        case 0x84: this.opcodes.RES_b_R(0x01, 'H')
                        break

                        case 0x85: this.opcodes.RES_b_R(0x01, 'L')
                        break

                        case 0x86: this.opcodes.RES_b_RR(0x01, 'H', 'L')
                        break

                        case 0x87: this.opcodes.RES_b_R(0x01, 'A')
                        break

                        case 0x88: this.opcodes.RES_b_R(0x02, 'B') // 0x02 = bit 1
                        break

                        case 0x89: this.opcodes.RES_b_R(0x02, 'C')
                        break

                        case 0x8A: this.opcodes.RES_b_R(0x02, 'D') 
                        break

                        case 0x8B: this.opcodes.RES_b_R(0x02, 'E') 
                        break

                        case 0x8C: this.opcodes.RES_b_R(0x02, 'H')
                        break

                        case 0x8D: this.opcodes.RES_b_R(0x02, 'L')
                        break

                        case 0x8E: this.opcodes.RES_b_RR(0x02, 'H', 'L')
                        break

                        case 0x8F: this.opcodes.RES_b_R(0x02, 'A')
                        break

                        case 0x90: this.opcodes.RES_b_R(0x04, 'B') // 0x04 = bit 2
                        break

                        case 0x91: this.opcodes.RES_b_R(0x04, 'C')
                        break

                        case 0x92: this.opcodes.RES_b_R(0x04, 'D') 
                        break

                        case 0x93: this.opcodes.RES_b_R(0x04, 'E') 
                        break

                        case 0x94: this.opcodes.RES_b_R(0x04, 'H')
                        break

                        case 0x95: this.opcodes.RES_b_R(0x04, 'L')
                        break

                        case 0x96: this.opcodes.RES_b_RR(0x04, 'H', 'L')
                        break

                        case 0x97: this.opcodes.RES_b_R(0x04, 'A')
                        break

                        case 0x98: this.opcodes.RES_b_R(0x08, 'B') // 0x08 = bit 3
                        break

                        case 0x99: this.opcodes.RES_b_R(0x08, 'C')
                        break

                        case 0x9A: this.opcodes.RES_b_R(0x08, 'D') 
                        break

                        case 0x9B: this.opcodes.RES_b_R(0x08, 'E') 
                        break

                        case 0x9C: this.opcodes.RES_b_R(0x08, 'H')
                        break

                        case 0x9D: this.opcodes.RES_b_R(0x08, 'L')
                        break

                        case 0x9E: this.opcodes.RES_b_RR(0x08, 'H', 'L')
                        break

                        case 0x9F: this.opcodes.RES_b_R(0x08, 'A')
                        break

                        case 0xA0: this.opcodes.RES_b_R(0x10, 'B') // 0x10 = bit 4
                        break

                        case 0xA1: this.opcodes.RES_b_R(0x10, 'C')
                        break

                        case 0xA2: this.opcodes.RES_b_R(0x10, 'D') 
                        break

                        case 0xA3: this.opcodes.RES_b_R(0x10, 'E') 
                        break

                        case 0xA4: this.opcodes.RES_b_R(0x10, 'H')
                        break

                        case 0xA5: this.opcodes.RES_b_R(0x10, 'L')
                        break

                        case 0xA6: this.opcodes.RES_b_RR(0x10, 'H', 'L')
                        break

                        case 0xA7: this.opcodes.RES_b_R(0x10, 'A')
                        break

                        case 0xA8: this.opcodes.RES_b_R(0x20, 'B') // 0x20 = bit 5
                        break

                        case 0xA9: this.opcodes.RES_b_R(0x20, 'C')
                        break

                        case 0xAA: this.opcodes.RES_b_R(0x20, 'D') 
                        break

                        case 0xAB: this.opcodes.RES_b_R(0x20, 'E') 
                        break

                        case 0xAC: this.opcodes.RES_b_R(0x20, 'H')
                        break

                        case 0xAD: this.opcodes.RES_b_R(0x20, 'L')
                        break

                        case 0xAE: this.opcodes.RES_b_RR(0x20, 'H', 'L')
                        break

                        case 0xAF: this.opcodes.RES_b_R(0x20, 'A')
                        break

                        case 0xB0: this.opcodes.RES_b_R(0x40, 'B') // 0x40 = bit 6
                        break

                        case 0xB1: this.opcodes.RES_b_R(0x40, 'C')
                        break

                        case 0xB2: this.opcodes.RES_b_R(0x40, 'D') 
                        break

                        case 0xB3: this.opcodes.RES_b_R(0x40, 'E') 
                        break

                        case 0xB4: this.opcodes.RES_b_R(0x40, 'H')
                        break

                        case 0xB5: this.opcodes.RES_b_R(0x40, 'L')
                        break

                        case 0xB6: this.opcodes.RES_b_RR(0x40, 'H', 'L')
                        break

                        case 0xB7: this.opcodes.RES_b_R(0x40, 'A')
                        break

                        case 0xB8: this.opcodes.RES_b_R(0x80, 'B') // 0x80 = bit 7
                        break

                        case 0xB9: this.opcodes.RES_b_R(0x80, 'C')
                        break

                        case 0xBA: this.opcodes.RES_b_R(0x80, 'D') 
                        break

                        case 0xBB: this.opcodes.RES_b_R(0x80, 'E') 
                        break

                        case 0xBC: this.opcodes.RES_b_R(0x80, 'H')
                        break

                        case 0xBD: this.opcodes.RES_b_R(0x80, 'L')
                        break

                        case 0xBE: this.opcodes.RES_b_RR(0x80, 'H', 'L')
                        break

                        case 0xBF: this.opcodes.RES_b_R(0x80, 'A')
                        break

                        case 0xC0: this.opcodes.SET_b_R(0x01, 'B') // 0x00 = bit 0
                        break

                        case 0xC1: this.opcodes.SET_b_R(0x01, 'C')
                        break

                        case 0xC2: this.opcodes.SET_b_R(0x01, 'D') 
                        break

                        case 0xC3: this.opcodes.SET_b_R(0x01, 'E') 
                        break

                        case 0xC4: this.opcodes.SET_b_R(0x01, 'H')
                        break

                        case 0xC5: this.opcodes.SET_b_R(0x01, 'L')
                        break

                        case 0xC6: this.opcodes.SET_b_RR(0x01, 'H', 'L')
                        break

                        case 0xC7: this.opcodes.SET_b_R(0x01, 'A')
                        break

                        case 0xC8: this.opcodes.SET_b_R(0x02, 'B') // 0x02 = bit 1
                        break

                        case 0xC9: this.opcodes.SET_b_R(0x02, 'C')
                        break

                        case 0xCA: this.opcodes.SET_b_R(0x02, 'D') 
                        break

                        case 0xCB: this.opcodes.SET_b_R(0x02, 'E') 
                        break

                        case 0xCC: this.opcodes.SET_b_R(0x02, 'H')
                        break

                        case 0xCD: this.opcodes.SET_b_R(0x02, 'L')
                        break

                        case 0xCE: this.opcodes.SET_b_RR(0x02, 'H', 'L')
                        break

                        case 0xCF: this.opcodes.SET_b_R(0x02, 'A')
                        break

                        case 0xD0: this.opcodes.SET_b_R(0x04, 'B') // 0x04 = bit 2
                        break

                        case 0xD1: this.opcodes.SET_b_R(0x04, 'C')
                        break

                        case 0xD2: this.opcodes.SET_b_R(0x04, 'D') 
                        break

                        case 0xD3: this.opcodes.SET_b_R(0x04, 'E') 
                        break

                        case 0xD4: this.opcodes.SET_b_R(0x04, 'H')
                        break

                        case 0xD5: this.opcodes.SET_b_R(0x04, 'L')
                        break

                        case 0xD6: this.opcodes.SET_b_RR(0x04, 'H', 'L')
                        break

                        case 0xD7: this.opcodes.SET_b_R(0x04, 'A')
                        break

                        case 0xD8: this.opcodes.SET_b_R(0x08, 'B') // 0x08 = bit 3
                        break

                        case 0xD9: this.opcodes.SET_b_R(0x08, 'C')
                        break

                        case 0xDA: this.opcodes.SET_b_R(0x08, 'D') 
                        break

                        case 0xDB: this.opcodes.SET_b_R(0x08, 'E') 
                        break

                        case 0xDC: this.opcodes.SET_b_R(0x08, 'H')
                        break

                        case 0xDD: this.opcodes.SET_b_R(0x08, 'L')
                        break

                        case 0xDE: this.opcodes.SET_b_RR(0x08, 'H', 'L')
                        break

                        case 0xDF: this.opcodes.SET_b_R(0x08, 'A')
                        break

                        case 0xE0: this.opcodes.SET_b_R(0x10, 'B') // 0x10 = bit 4
                        break

                        case 0xE1: this.opcodes.SET_b_R(0x10, 'C')
                        break

                        case 0xE2: this.opcodes.SET_b_R(0x10, 'D') 
                        break

                        case 0xE3: this.opcodes.SET_b_R(0x10, 'E') 
                        break

                        case 0xE4: this.opcodes.SET_b_R(0x10, 'H')
                        break

                        case 0xE5: this.opcodes.SET_b_R(0x10, 'L')
                        break

                        case 0xE6: this.opcodes.SET_b_RR(0x10, 'H', 'L')
                        break

                        case 0xE7: this.opcodes.SET_b_R(0x10, 'A')
                        break

                        case 0xE8: this.opcodes.SET_b_R(0x20, 'B') // 0x20 = bit 5
                        break

                        case 0xE9: this.opcodes.SET_b_R(0x20, 'C')
                        break

                        case 0xEA: this.opcodes.SET_b_R(0x20, 'D') 
                        break

                        case 0xEB: this.opcodes.SET_b_R(0x20, 'E') 
                        break

                        case 0xEC: this.opcodes.SET_b_R(0x20, 'H')
                        break

                        case 0xED: this.opcodes.SET_b_R(0x20, 'L')
                        break

                        case 0xEE: this.opcodes.SET_b_RR(0x20, 'H', 'L')
                        break

                        case 0xEF: this.opcodes.SET_b_R(0x20, 'A')
                        break

                        case 0xF0: this.opcodes.SET_b_R(0x40, 'B') // 0x40 = bit 6
                        break

                        case 0xF1: this.opcodes.SET_b_R(0x40, 'C')
                        break

                        case 0xF2: this.opcodes.SET_b_R(0x40, 'D') 
                        break

                        case 0xF3: this.opcodes.SET_b_R(0x40, 'E') 
                        break

                        case 0xF4: this.opcodes.SET_b_R(0x40, 'H')
                        break

                        case 0xF5: this.opcodes.SET_b_R(0x40, 'L')
                        break

                        case 0xF6: this.opcodes.SET_b_RR(0x40, 'H', 'L')
                        break

                        case 0xF7: this.opcodes.SET_b_R(0x40, 'A')
                        break

                        case 0xF8: this.opcodes.SET_b_R(0x80, 'B') // 0x80 = bit 7
                        break

                        case 0xF9: this.opcodes.SET_b_R(0x80, 'C')
                        break

                        case 0xFA: this.opcodes.SET_b_R(0x80, 'D') 
                        break

                        case 0xFB: this.opcodes.SET_b_R(0x80, 'E') 
                        break

                        case 0xFC: this.opcodes.SET_b_R(0x80, 'H')
                        break

                        case 0xFD: this.opcodes.SET_b_R(0x80, 'L')
                        break

                        case 0xFE: this.opcodes.SET_b_RR(0x80, 'H', 'L')
                        break

                        case 0xFF: this.opcodes.SET_b_R(0x80, 'A')
                        break
                    }

                default: 
                console.log('Unimplemented opcode (16-bit):', opcode)
                //throw new Error(`Unknown opcode: ${opcode}`)            
            }
        }

        // Check if it's an 8-bit or 16-bit (0xCBxx) instruction
        if (type === 8) { execute8bit.bind(this)() } else { execute16bit.bind(this)() }
    }
}

export { CPU }