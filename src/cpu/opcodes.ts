import { CPU } from './cpu'
import { MMU } from '../mmu/mmu'
import { CPUClock, CPURegister, CPUFlag, CPUFlagType, CPURegisterType } from './models'
import { Utils } from '../utils'

class Opcodes {
    private cpu: CPU
    private mmu: MMU
    private r: CPURegister
    private c: CPUClock    

    constructor(cpu: CPU) {
        const { register, clock } = cpu

        this.mmu = MMU.shared
        this.cpu = cpu
        this.r = register
        this.c = clock
    }

    // Utility methods

    /**
     * @description Increment the program counter
     * @param nr number to increase; default incrementing by 1
     */
    private $incPC(nr: number = 1) {
      this.cpu.register.PC += nr
    }

    /**
     * @description Increment the clock
     * @param nr number to increase; default incrementing by 4
     */
    private $incClock(nr: number = 4) {
      this.cpu.clock.M += nr
    }

    // Flag methods
    
    /**
     * @description Return true/false if flag (bit) was set.
     * @param flag flag type
     */
    private $getF(flag: CPUFlagType): boolean { 
        return !!(this.r.F & CPUFlag[flag])
    }

    /**
     * @description We set the flag value (single bit), using the CPUFlag as a mask. If a value was not passed, we clear the bit instead (same as $resetF)
     * @param flag flag type
     * @param v value
     */
    // TODO: We removed the second parameter 'set', so we should remove this from the opcode calls to $setF()
    private $setF(flag: CPUFlagType, v?: number|boolean): void { 
      this.r.F = v ? this.r.F | CPUFlag[flag] : this.r.F & ~CPUFlag[flag]
      //v = v || CPUFlag[flag]
        // console.log('set:', set)
        // console.log('v:', v)
        // console.log('flag (1):', this.r.F.toString(16))
        // this.r.F = set ? (v || this.r.F) | CPUFlag[flag] : ~ CPUFlag[flag]
        // console.log('flag (2):', this.r.F.toString(16))
        // if (flag == 'H') {
        //   console.log('H ->', set, `0x${this.r.F.toString(16)}`, v)
        // }
        // set ? this.r.F |= v : this.r.F = v
    }
   
   /**
    * @description We reset the flag to 0 (single bit)
    * @param flag flag type
    */
    private $resetF(flag: CPUFlagType): void { 
      this.r.F &= ~CPUFlag[flag] 
    }
    
    /**
     * @description We toggle the flag (0 = 1, 1 = 0)
     * @param flag flag type
     */
    private $toggleF(flag: CPUFlagType): void { 
      this.r.F ^= CPUFlag[flag] 
    }
    
    /**
     * @description 8bit: We compare the old and new value, checking if a bit was moved up from bit 3 (16) to bit 4 (32). If the value is 32, it means it was moved
     * @param a 
     * @param b 
     */
    private $isHalfCarry(a: number, b: number): boolean {
        return (((a & 0xF) + (b & 0xF)) & 0x10) == 0x10
    }
    
    /**
     * @description 8-bit: We compare the old and new value, checking if a bit was moved up from bit 7 (112)
     * @param a 
     * @param b 
     */
    private $isCarry(a: number, b: number): boolean { 
        return (((a & 0xFF) + (b & 0xFF)) & 0x70) == 0x70
    }
    
    /**
     * @description 16-bit: We compare the old and new value, checking if a bit was moved up from bit 15 (112)
     * @param a 
     * @param b 
     */
    private $isBit15Carry(a: number, b: number): boolean { 
        return ((a & 0xFFFF) + (b & 0xFFFF)) > 0x7FFF
    }

    /**
     * @description 16-bit: We compare the old and new value, checking if a bit was moved up from bit 11 (48)
     * @param a 
     * @param b 
     */
    private $isBit11Carry(a: number, b: number): boolean { 
        return (((a & 0xFFFF) + (b & 0xFFFF)) & 0x0FFF) === 0x0FFF
    }
    
    private $isBit3Borrow(a: number, b: number): boolean { 
        return this.$isHalfCarry(a, -b) 
    }

    private $isBit4Borrow(a: number, b: number): boolean { 
        return this.$isCarry(a, -b)
    }


    // --- OPCODES ---
    
    /**
     * @description Increment the contents of register pair r1-r2
     * @param r1 Register 1 (target)
     * @param r2 Register 2 (target)
     */
    public INC_RR(r1: CPURegisterType, r2: CPURegisterType): void { 
        const r3: number = this.cpu.read16(r1, r2) // 16-bit register
        this.cpu.write16(r3 + 1, r1, r2)

        this.$incClock(8)
        this.$incPC(1)
    }

    /**
     * @description Increment the contents of memory pointed to by register pair r1-r2
     * @param r1 Register 1 (target)
     * @param r2 Register 2 (target)
     */
    public INC_RR_mem(r1: CPURegisterType, r2: CPURegisterType): void { 
        let v: number = this.cpu.read16(r1, r2) + 1
        let newV: number = v + 1
        
        this.$setF(CPUFlagType.Z, !newV)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, (this.$isHalfCarry(v, 1)))

        this.cpu.write16(v, r1, r2)

        this.$incClock(12)
        this.$incPC(1)
    }

    /**
     * @description Increment register pair SP (stack pointer)
     */
    public INC_SP(): void { 
        this.r.SP++

        this.$incClock(8)
        this.$incPC(1)
    }
    
    /**
     * @description Load the 2 bytes of immediate data into register pair r1h-r1l.
     * The first byte of immediate data is the lower byte (i.e., bits 0-7), 
     * and the second byte of immediate data is the higher byte (i.e., bits 8-15).
     * @param r1h Register 1 (high byte)
     * @param r1l Register 1 (low byte)
     */
    public LD_RR_d16(r1h: CPURegisterType, r1l: CPURegisterType) {
        this.cpu.write16(this.mmu.getImmediate16(this.r.PC + 1), r1h, r1l)

        this.$incClock(9)
        this.$incPC(3)
    }
    
    /**
     * @description Add the 8-bit signed operand s8 (values -128 to +127) to the stack pointer SP, and store the result in register pair HL.
     * @param r1h Register 1 (high byte)
     * @param r1l Register 1 (low byte)
     */
    public LD_RR_SPd8(r1h: CPURegisterType, r1l: CPURegisterType) {
        this.cpu.write16(this.r.SP + Utils.getSignedValue8(this.mmu.getImmediate8(this.r.PC)), r1h, r1l)

        this.$incClock(12)
        this.$incPC(2)
    }

    /**
     * @description Load the two bytes of immediate data into register pair SP (stack pointer)
     */
    public LD_SP_d16() {
        this.r.SP = this.mmu.getImmediate16(this.r.PC)

        this.$incClock(9)
        this.$incPC(1)
    }

    /**
     * @description Load the contents of register pair HL into the stack pointer SP
     * @param r1h Register 1 (high byte)
     * @param r1l Register 1 (low byte)
     */
    public LD_SP_RR(r1h: CPURegisterType, r1l: CPURegisterType): void { 
        this.r.SP = this.cpu.read16(r1h, r1l)

        this.$incClock(8)
        this.cpu.register.SP += 1
    }

    /**
     * @description Store the contents of 8-bit immediate operand d8 in the memory location specified by register pair r1-r2
     * @param r1 Register 1 (target)
     * @param r2 Register 2 (target)
     */
    public LD_RR_nn(r1: CPURegisterType, r2: CPURegisterType): void { 
        this.cpu.write16(this.mmu.getImmediate8(this.r.PC), r1, r2)

        this.$incClock(12)
        this.cpu.register.SP += 1
    }
    
    /**
     * Load the contents of register r2 into memory pointed to by 16-bit register pair r1h-r1l
     * For certain instructions, an addition or decrementation is required 
     * @param r1 Register 1 (high byte, target)
     * @param r2 Register 1 (low byte, target)
     * @param r3 Register 3 (n)
     */
    public LD_RR_R(r1h: CPURegisterType, r1l: CPURegisterType, r2: CPURegisterType, increment?: boolean, decrement?: boolean): void { 
        const pointer: number = this.cpu.read16(r1h, r1l)
        let v: number = this.cpu.read8(r2)
        if (increment) v++
        if (decrement) v--

        this.mmu.write(pointer, v)

        this.$incClock(8)
        this.$incPC(1)
    }

    /**
     * Load the 8-bit contents of memory pointed to by register pair r2h-r2l into register 1
     * For certain instructions, an addition or decrementation is required 
     * @param r1 Register 1 (target)
     * @param r2 Register 2 (target)
     * @param r3 Register 3 (n)
     */
    public LD_R_RR(r1: CPURegisterType, r2h: CPURegisterType, r2l: CPURegisterType, increment?: boolean, decrement?: boolean): void { 
        const pointer: number = this.cpu.read16(r2h, r2l)
        
        let v: number = this.mmu.read(pointer)
        this.cpu.write8(v, r1)
        this.cpu.write16(increment ? pointer + 1 : decrement ? pointer - 1 : pointer, r2h, r2l)
        
        this.$incClock(8)
        this.$incPC(1)
    }

    /**
     * Put the contents of register 2 into register 1
     * @param r1 Register 1 (target)
     * @param r2 Register 2 (n)
     */
    public LD_R_R(r1: CPURegisterType, r2: CPURegisterType): void { 
        this.cpu.write8(this.cpu.read8(r2), r1)
        this.$incClock(4)
        this.$incPC(1)
    }
    
    /**
     * @description Store the contents of register r1 in the internal RAM or register specified by the 16-bit immediate operand a16.
     * @param r1 Register (e.g. A)
     */
    public LD_a16_R(r1: CPURegisterType) {         
        this.mmu.write(0xFF00 + this.mmu.getImmediate16(this.r.PC), this.cpu.read8(r1))

        this.$incClock(16)
        this.$incPC(3)
    }
    
    /**
     * @description Load into register A the contents of the internal RAM or register specified by the 16-bit immediate operand a16.
     * @param r1 Register (e.g. A)
     */
    public LD_R_a16(r1: CPURegisterType) {         
        this.cpu.write8(this.mmu.read(0xFF00 + this.mmu.getImmediate16(this.r.PC)), r1)

        this.$incClock(16)
        this.$incPC(3)
    }
    
    /**
     * @description Store the lower byte of stack pointer SP at the address specified by the 16-bit immediate operand a16, and store the upper byte of SP at address a16 + 1
     */
    public LD_a16_SP() {         
        const spHb: number = (this.cpu.register.SP >> 8) & 0xFF // High byte of stack pointer
        const spLb: number = this.cpu.register.SP & 0xFF // Low byte of stack pointer

        this.mmu.write(this.mmu.getImmediate16(this.r.PC), spLb)
        this.mmu.write(this.mmu.getImmediate16(this.r.PC) + 1, spHb)

        this.$incClock(20)
        this.$incPC(3)
    }

    /**
     * @description Store the contents of register A in the internal RAM, port register, 
     * or mode register at the address in the range 0xFF00-0xFFFF specified by the 8-bit immediate operand a8.
     * Note: Should specify a 16-bit address in the mnemonic portion for a8, although the immediate operand only has the lower-order 8 bits.
     * - 0xFF00-0xFF7F: Port/Mode registers, control register, sound register
     * - 0xFF80-0xFFFE: Working & Stack RAM (127 bytes)
     * - 0xFFFF: Interrupt Enable Register
     * @param r1 Register
     */
    public LD_a8_R(r1: CPURegisterType) {         
        const v: number = this.cpu.read8(r1) // e.g. A
        this.mmu.write(0xFF00 + this.mmu.getImmediate8(this.r.PC), v)

        this.$incClock(12)
        this.$incPC(2)
    }

    /**
     * @description Load into register A the contents of the internal RAM, port register, 
     * or mode register at the address in the range 0xFF00-0xFFFF specified by the 8-bit immediate operand a8
     * - 0xFF00-0xFF7F: Port/Mode registers, control register, sound register
     * - 0xFF80-0xFFFE: Working & Stack RAM (127 bytes)
     * - 0xFFFF: Interrupt Enable Register
     * @param r1 Register (target, e.g. A)
     */
    public LD_R_a8(r1: CPURegisterType) {         
        const v: number = this.mmu.read(0xFF00 + this.mmu.getImmediate8(this.r.PC))
        this.cpu.write8(v, r1)      

        this.$incClock(12)
        this.$incPC(2)
    }

    /**
     * @description Store the contents of register A in the internal RAM, port register, or mode register at the address in the range 0xFF00-0xFFFF specified by register C.
     * - 0xFF00-0xFF7F: Port/Mode registers, control register, sound register
     * - 0xFF80-0xFFFE: Working & Stack RAM (127 bytes)
     * - 0xFFFF: Interrupt Enable Register
     * @param r1 Register
     */
    public LD_C_R(r1: CPURegisterType) {        
        const v: number = this.cpu.read8(r1) // e.g. A
        this.mmu.write(0xFF00 + this.mmu.read(this.cpu.read8('C')), v)

        this.$incClock(8)
        this.$incPC(1)
    }

    /**
     * @description Load into register A the contents of the internal RAM, port register, or mode register at the address in the range 0xFF00-0xFFFF specified by register C.
     * - 0xFF00-0xFF7F: Port/Mode registers, control register, sound register
     * - 0xFF80-0xFFFE: Working & Stack RAM (127 bytes)
     * - 0xFFFF: Interrupt Enable Register
     * @param r1 Register
     */
    public LD_R_C(r1: CPURegisterType) {         
        const v: number = this.mmu.read(0xFF00 + this.mmu.read(this.cpu.read8('C')))
        this.cpu.write8(v, r1)

        this.$incClock(8)
        this.$incPC(1)
    }

    /**
     * @description Rotate the contents of register r1 to the left, through the carry (CY) flag. 
     * That is, the contents of bit 0 are copied to bit 1, and the previous contents of bit 1 (before the copy operation) are copied to bit 2. 
     * The same operation is repeated in sequence for the rest of the register. 
     * The previous contents of the carry flag are copied to bit 0.
     * @param r1 Register
     * @param bytes Register
     * @param cycles Register
     */
    public RL_R (r1: CPURegisterType, bytes: number, cycles: number) { 
        const leftBit7: number = this.cpu.read8(r1) & 0x80
        const v: number = (this.cpu.read8(r1) << 1) | ((this.r.F & CPUFlag.C) >> 4) // Shift register to left, then add C flag bit to the first bit (0)
        this.cpu.write8(v, r1)  

        // Flags
        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, leftBit7 & 1) // We put the old last bit (7) inside the C flag

        this.$incClock(cycles)
        this.$incPC(bytes)
    }

    /**
     * @description Rotate the contents of memory specified by register pair r1h-r1l to the left, through the carry flag. 
     * That is, the contents of bit 0 are copied to bit 1, and the previous contents of bit 1 (before the copy operation) are copied to bit 2. 
     * The same operation is repeated in sequence for the rest of the memory location. 
     * The previous contents of the CY flag are copied into bit 0 of (r1h-r1l).
     * @param r1 Register
     */
    public RL_RR (r1h: CPURegisterType, r1l: CPURegisterType) { 
        const pointer: number = this.cpu.read16(r1h, r1l)
        const leftBit7: number = this.mmu.read(pointer) & 0x80
        const v: number = (this.mmu.read(pointer) << 1) | ((this.r.F & CPUFlag.C) >> 4) // Shift register to left, then add C flag bit to the first bit (0)
        this.mmu.write(pointer, v)

        // Flags
        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, leftBit7 & 1) // We put the old last bit (7) inside the C flag

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Rotate the contents of register r1 to the right. 
     * That is, the contents of bit 7 are copied to bit 6, and the previous contents of bit 6 (before the copy) are copied to bit 5. 
     * The same operation is repeated in sequence for the rest of the register. 
     * The contents of bit 0 are placed in both the CY flag and bit 7 of register r1.
     * @param r1 Register
     * @param bytes Register
     * @param cycles Register
     */
    public RRC_R (r1: CPURegisterType, bytes: number, cycles: number) { 
        const rightBit0: number = this.cpu.read8(r1) & 0x1
        const v: number = (this.cpu.read8(r1) >> 1) | (rightBit0 << 7)
        this.cpu.write8(v, r1)  

        // Flags
        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, rightBit0 & 1) // We put the old first bit (0) inside the C flag

        this.$incClock(cycles)
        this.$incPC(bytes)
    }

    public RRC_RR (r1h: CPURegisterType, r1l: CPURegisterType) { 
        const pointer: number = this.cpu.read16(r1h, r1l)
        const rightBit0: number = this.mmu.read(pointer) & 0x1
        const v: number = (this.mmu.read(pointer) >> 1) | (rightBit0 << 7)
        this.mmu.write(v, pointer)  

        // Flags
        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, rightBit0 & 1) // We put the old first bit (0) inside the C flag

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Rotate the contents of register r1 to the right, through the carry (CY) flag. 
     * That is, the contents of bit 7 are copied to bit 6, and the previous contents of bit 6 (before the copy) are copied to bit 5. 
     * The same operation is repeated in sequence for the rest of the register. 
     * The previous contents of the carry flag are copied to bit 7.
     * @param r1 Register
     * @param bytes Register
     * @param cycles Register
     */
    public RR_R (r1: CPURegisterType, bytes: number, cycles: number) { 
        const rightBit0: number = this.cpu.read8(r1) & 0x1
        const v: number = (this.cpu.read8(r1) >> 1) | (rightBit0 << 7)
        this.cpu.write8(v, r1)  

        // Flags
        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, rightBit0 & 1) // We put the old last bit (0) inside the C flag

        this.$incClock(cycles)
        this.$incPC(bytes)
    }

    public RR_RR(r1h: CPURegisterType, r1l: CPURegisterType) { 
        const pointer: number = this.cpu.read16(r1h, r1l)
        const rightBit0: number = this.mmu.read(pointer) & 0x1
        const v: number = (this.mmu.read(pointer) >> 1) | (rightBit0 << 7)
        this.mmu.write(pointer, v)

        // Flags
        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, rightBit0 & 1) // We put the old last bit (0) inside the C flag

        this.$incClock(16)
        this.$incPC(2)
    }

    /**
     * @description Rotate the contents of register r1 to the left. 
     * That is, the contents of bit 0 are copied to bit 1, and the previous contents of bit 1 (before the copy operation) are copied to bit 2. 
     * The same operation is repeated in sequence for the rest of the register. 
     * The contents of bit 7 are placed in both the CY flag and bit 0 of register r1.
     * @param r1h Register (high byte)
     * @param r1l Register (low byte)
     */
    public RLC_R (r1: CPURegisterType, bytes: number, cycles: number) { 
        const leftBit7: number = this.cpu.read8(r1) & 0x80
        const v: number = (this.cpu.read8(r1) << 1) | (leftBit7 >> 7)
        this.cpu.write8(v, r1)  

        // Flags
        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, leftBit7 & 1) // We put the old last bit (7) inside the C flag

        this.$incClock(cycles) // add clock cycles
        this.$incPC(bytes)
    }

    /**
     * @description Rotate the contents of memory specified by register pair r1h-r1l to the left. 
     * That is, the contents of bit 0 are copied to bit 1, and the previous contents of bit 1 (before the copy operation) are copied to bit 2. 
     * The same operation is repeated in sequence for the rest of the memory location. 
     * The contents of bit 7 are placed in both the CY flag and bit 0 of r1h-r1l.
     * @param r1h Register (high byte)
     * @param r1l Register (low byte)
     */
    public RLC_RR (r1h: CPURegisterType, r1l: CPURegisterType) { 
        const pointer: number = this.cpu.read16(r1h, r1l)
        const address: number = this.mmu.read(pointer) // Address in memory
        const leftBit7: number = address & 0x80
        const v: number = (address << 1) | (leftBit7 >> 7)
        this.mmu.write(pointer, v)  

        // Flags
        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, leftBit7 & 1) // We put the old last bit (7) inside the C flag

        this.$incClock(16) // add clock cycles
        this.$incPC(2)
    }

     /**
     * @description Add the contents of the 8-bit immediate operand d8 and the CY flag to the contents of register r1, and store the results in register r1.
     * @param r1 
     */
    public ADC_R_d8(r1: CPURegisterType): void {
        const pointer: number = this.cpu.read8(r1)
        const v: number = ((this.$getF(CPUFlagType.C) ? 1 : 0) + this.mmu.read(pointer)) & 0xFF
        this.cpu.write8(v, r1)

        // Flags
        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, (this.$isHalfCarry(this.cpu.read8(r1), v)))
        this.$setF(CPUFlagType.C, (this.$isCarry(this.cpu.read8(r1), v))) // We set the C flag is a carry happened from bit 7 to 8 (overflow)

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Add the contents of register r2 and the Carry Flag to the contents of register r1, and store the results in register r1.
     * @param r1 
     * @param r2 
     */
    public ADC_R_R(r1: CPURegisterType, r2: CPURegisterType): void {
        const v: number = ((this.$getF(CPUFlagType.C) ? 1 : 0) + this.cpu.read8(r2)) & 0xFF
        this.cpu.write8(v, r1)

        // Flags
        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, (this.$isHalfCarry(this.cpu.read8(r1), v)))
        this.$setF(CPUFlagType.C, (this.$isCarry(this.cpu.read8(r1), v))) // We set the C flag is a carry happened from bit 7 to 8 (overflow)

        this.$incClock(8)
        this.$incPC(1)
    }

    /**
     * @description Add the contents of memory specified by register pair r2h-r2l and the Carry Flag to the contents of register r1, and store the results in register r1.
     * @param r1 
     * @param r2 
     */
    public ADC_R_RR(r1: CPURegisterType, r2h: CPURegisterType, r2l: CPURegisterType): void {
        const pointer: number = this.cpu.read16(r2h, r2l)        
        const v: number = ((this.$getF(CPUFlagType.C) ? 1 : 0) + this.mmu.read(pointer)) & 0xFF
        
        this.cpu.write8(v, r1)

        // Flags
        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, (this.$isHalfCarry(this.cpu.read8(r1), v)))
        this.$setF(CPUFlagType.C, (this.$isCarry(this.cpu.read8(r1), v))) // We set the C flag is a carry happened from bit 7 to 8 (overflow)

        this.$incClock(8)
        this.$incPC(1)
    }

     /**
     * @description Add the contents of register r2 to the contents of register r1, and store the results in register r1.
     * @param r1 
     * @param r2 
     */
    public ADD_R_d8(r1: CPURegisterType): void {
        const v: number = (this.cpu.read8(r1) + this.mmu.getImmediate8(this.r.PC)) & 0xFF
        this.cpu.write8(v, r1)

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, (this.$isHalfCarry(this.cpu.read8(r1), v)))
        this.$setF(CPUFlagType.C, (this.$isCarry(this.cpu.read8(r1), v))) // We set the C flag is a carry happened from bit 7 to 8 (overflow)

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Add the contents of the 8-bit signed (2's complement) immediate operand s8 and the stack pointer SP and store the results in SP
     */
    public ADD_SP_d8(): void {
        const v: number = (Utils.getSignedValue8(this.mmu.getImmediate8(this.r.PC)) + this.r.SP) & 0xFF
        this.r.SP = v

        this.$resetF(CPUFlagType.Z)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, (this.$isHalfCarry(this.r.SP, v)))
        this.$setF(CPUFlagType.C, (this.$isCarry(this.r.SP, v))) // We set the C flag is a carry happened from bit 7 to 8 (overflow)

        this.$incClock(16)
        this.$incPC(2)
    }

    /**
     * @description Add the contents of register r2 to the contents of register r1, and store the results in register r1.
     * @param r1 
     * @param r2 
     */
    public ADD_R_R(r1: CPURegisterType, r2: CPURegisterType): void {
        const v: number = (this.cpu.read8(r1) + this.cpu.read8(r2)) & 0xFF
        this.cpu.write8(v, r1)

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, (this.$isHalfCarry(this.cpu.read8(r1), v)))
        this.$setF(CPUFlagType.C, (this.$isCarry(this.cpu.read8(r1), v))) // We set the C flag is a carry happened from bit 7 to 8 (overflow)

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Add the contents of memory specified by register r1 to the contents of register r2h-r2l, and store the results in register r1.
     */
    public ADD_R_RR(r1: CPURegisterType, r2h: CPURegisterType, r2l: CPURegisterType): void {
        const pointer: number = this.cpu.read16(r2h, r2l)
        const v: number = this.mmu.read(pointer) + this.cpu.read8(r1)

        this.cpu.write8(v, r1)

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, (this.$isHalfCarry(this.cpu.read8(r1), v)))
        this.$setF(CPUFlagType.C, (this.$isCarry(this.cpu.read8(r1), v))) // We set the C flag is a carry happened from bit 7 to 8 (overflow)

        this.$incClock(8)
        this.$incPC(1)
    }

    /**
     * @description Add register 1 (16-bit, e.g. HL) to register 2 (16-bit, e.g. BC)
     * @param r1h Register 1 (high)
     * @param r1l Register 1 (low)
     * @param r2h Register 2 (high)
     * @param r2l Register 2 (low)
     */
    public ADD_RR_RR(r1h: CPURegisterType, r1l: CPURegisterType, r2h: CPURegisterType, r2l: CPURegisterType): void {
        const r1: number = this.cpu.read16(r1h, r1l) & 0xFFFF
        const r2: number = this.cpu.read16(r2h, r2l) & 0xFFFF

        const v: number = (r1 + r2) & 0xFFFF

        this.cpu.write16(v, r1h, r1l)

        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, (this.$isBit11Carry(r1, v)))
        this.$setF(CPUFlagType.C, (this.$isBit15Carry(r1, v)))

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Add the stack pointer (SP) to register pair r1h-r1l (16-bit, e.g. HL)
     * @param r1h Register 1 (high)
     * @param r1l Register 1 (low)
     */
    public ADD_RR_SP(r1h: CPURegisterType, r1l: CPURegisterType): void {
        const r1: number = this.cpu.read16(r1h, r1l) & 0xFFFF
        const v: number = (this.r.SP + r1) & 0xFFFF

        this.cpu.write16(v, r1h, r1l)

        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, (this.$isBit11Carry(r1, v)))
        this.$setF(CPUFlagType.C, (this.$isBit15Carry(r1, v)))

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Take the logical AND for each bit of the contents of 8-bit immediate operand d8 and the contents of register r1, and store the results in register r1.
     */
    public AND(): void {
        const v: number = this.mmu.getImmediate8(this.r.PC) & this.cpu.read8('A')
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, 1)
        this.$resetF(CPUFlagType.C)

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Take the logical AND for each bit of the contents of register r1 and the contents of register A, and store the results in register A
     * @param r1 Register (n)
     */
    public AND_R(r1: CPURegisterType): void {
        const v: number = this.cpu.read8(r1) & this.cpu.read8('A')
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, 1)
        this.$resetF(CPUFlagType.C)

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Take the logical AND for each bit of the contents of memory specified by register pair r1h-r1l and the contents of register A, and store the results in register A
     * @param r1h Register (n) (high byte)
     * @param r1l Register (n) (low byte)
     */
    public AND_RR(r1h: CPURegisterType, r1l: CPURegisterType): void {        
        const pointer: number = this.cpu.read16(r1h, r1l)
        const v: number = this.mmu.read(pointer) & this.cpu.read8('A')
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, 1)
        this.$resetF(CPUFlagType.C)

        this.$incClock(8)
        this.$incPC(1)
    }

    /**
     * @description Copy the complement of the contents of bit 0 in register r1 to the Z flag of the program status word (PSW).
     * @param bit bit or hex value used as mask to grab the right bit of register r1 (e.g. to grab bit 5 (32) the value of 'bit' should be 0x20 in hex)
     * @param r1 
     */
    public BIT_b_R(bit: number, r1: CPURegisterType): void {
        const rBit: number = this.cpu.read8(r1) & bit // Check if bit (b) of register r1 is set; we don't re-set the r1 value

        this.$setF(CPUFlagType.Z, !rBit)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, 1)

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Copy the complement of the contents of bit 0 in the memory location specified by register pair r1-h-r1l to the Z flag of the program status word (PSW).
     * @param bit bit or hex value used as mask to grab the right bit of register r1 (e.g. to grab bit 5 (32) the value of 'bit' should be 0x20 in hex)
     * @param r1 
     */
    public BIT_b_RR(bit: number, r1h: CPURegisterType, r1l: CPURegisterType): void {
        const pointer: number = this.cpu.read16(r1h, r1l)
        const rBit: number = this.mmu.read(pointer) & bit // Check if bit (b) of register r1 is set; we don't re-set the r1 value

        this.$setF(CPUFlagType.Z, !rBit)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, 1)

        this.$incClock(16)
        this.$incPC(2)
    }

    /**
     * @description If the Z flag is 1, the program counter PC value corresponding to the memory location of the instruction following the CALL instruction,
     * is pushed to the 2 bytes following the memory byte specified by the stack pointer SP. 
     * The 16-bit immediate operand a16 is then loaded into PC.
     * @param flag Flag
     */

     public CALL_F(flag: CPUFlagType): void {
        if (this.$getF(flag)) {
            this.r.SP -= 2

            this.mmu.write(this.r.SP, this.r.PC + 2)

            this.r.PC = this.mmu.getImmediate8(this.r.PC)
        } else {
            this.$incPC(2)
        }

        this.$incClock(12)
    }

    /**
     * @description In memory, push the program counter PC value corresponding to the address following the CALL instruction to the 2 bytes following the byte specified by the current stack pointer SP. 
     * Then load the 16-bit immediate operand a16 into PC.
     * @param flag Flag
     */

     public CALL(): void {      
        this.r.SP -= 2

        this.mmu.write(this.r.SP, this.r.PC + 2)

        this.r.PC = this.mmu.getImmediate16(this.r.PC)    
        this.$incClock(24)
    }

    /**
     * @description If the Z flag is 0, the program counter PC value corresponding to the memory location of the instruction following the CALL instruction,
     * is pushed to the 2 bytes following the memory byte specified by the stack pointer SP. 
     * The 16-bit immediate operand a16 is then loaded into PC.
     * @param flag Flag
     */

    public CALL_NF(flag: CPUFlagType): void {
        if (!this.$getF(flag)) {
            this.r.SP -= 2

            this.mmu.write(this.r.SP, this.r.PC + 2)

            this.r.PC = this.mmu.getImmediate8(this.r.PC)
        } else {
          this.$incPC(2)
        }

        this.$incClock(12)
    }

    /**
     * @description Decrease register r1
     * @param r1 Register
     */
    public DEC_R(r1: CPURegisterType): void { 
        const v: number = this.cpu.read8(r1)
        const newV: number = (v - 1) & 0xFF

        this.$setF(CPUFlagType.Z, !newV)
        this.$setF(CPUFlagType.N, 1)
        this.$setF(CPUFlagType.H, (!this.$isBit4Borrow(v, 1))) 

        this.cpu.write8(newV, r1)

        this.$incClock(4)
        this.$incPC(1)
    }

    public DEC_RR(r1: CPURegisterType, r2: CPURegisterType): void { 
        const v: number = (this.cpu.read16(r1, r2) - 1) & 0xFFFF
        this.cpu.write16(v, r1, r2)

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Decrement the stack pointer (SP)
     */
    public DEC_SP(): void { 
        this.r.SP -= 1

        this.$incClock(4)
        this.$incPC(1)
    }

    public DEC_RR_mem(r1: CPURegisterType, r2: CPURegisterType): void { 
        let v: number = this.cpu.read16(r1, r2) & 0xFFFF
        let newV: number = (v - 1) & 0xFFFF

        this.$setF(CPUFlagType.Z, !newV)
        this.$setF(CPUFlagType.N, 1)
        this.$setF(CPUFlagType.H, (!this.$isBit4Borrow(v, 1)))

        this.cpu.write16(newV, r1, r2)

        this.$incClock(12)
        this.$incPC(1)
    }

    /**
     * @description Reset the interrupt master enable (IME) flag and prohibit maskable interrupts.
     * Even if a DI instruction is executed in an interrupt routine, the IME flag is set if a return is performed with a RETI instruction.
     */
    public DI(): void {
        this.cpu.IME = 0

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Set the interrupt master enable (IME) flag and enable maskable interrupts. 
     * This instruction can be used in an interrupt routine to enable higher-order interrupts.
     * The IME flag is reset immediately after an interrupt occurs. 
     * The IME flag reset remains in effect if coontrol is returned from the interrupt routine by a RET instruction. 
     * However, if an EI instruction is executed in the interrupt routine, control is returned with IME = 1.
     */
    public EI(): void {
        this.cpu.IME = 1

        this.$incClock(4)
        this.$incPC(1)
    }

    public INC_R(r1: CPURegisterType): void { 
        const v: number = this.cpu.read8(r1)
        const newV = (v + 1) & 0xFF // If it overflows, it's 0
        
        this.$setF(CPUFlagType.Z, !newV)
        this.$resetF(CPUFlagType.N)
        this.$setF(CPUFlagType.H, (this.$isHalfCarry(v, 1)))
        
        this.cpu.write8(newV, r1)

        this.$incClock(4)
        this.$incPC(1)
    }

    public LD_R_d8(r1: CPURegisterType): void { 
        this.cpu.write8(this.mmu.getImmediate8(this.r.PC + 1), r1)

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Jump n (8-bit signed value) steps from current address
     */
    public JR(): void {
        this.$incClock(12)

        const s8: number = Utils.getSignedValue8(this.mmu.getImmediate8(this.r.PC)) // Signed 8-bit value
        this.$incPC(s8)
    }

    /**
     * @description Jump n (8-bit signed value) steps from current address if F (flag, e.g. Z, C) is not 0
     */
    public JR_NF(flag: CPUFlagType): void {
        if (this.$getF(flag)) {
          this.$incClock(8)
          this.$incPC(1)
        } else {
          const s8: number = Utils.getSignedValue8(this.mmu.getImmediate8(this.r.PC + 1)) // Signed 8-bit value
          this.$incClock(12)
          this.$incPC(2 + s8) // takes 2 bytes to process; then jump to s8
        }
    }

    /**
     * @description Jump n (8-bit signed value) steps from current address if F (flag, e.g. Z, C) is 1
     */
    public JR_F(flag: CPUFlagType): void {
        if (!this.$getF(flag)) {
          this.$incClock(8)
          this.$incPC(2)
        } else {
          const s8: number = Utils.getSignedValue8(this.mmu.getImmediate8(this.r.PC + 1)) // Signed 8-bit value
          this.$incClock(12)
          this.$incPC(2 + s8)
        }
    }

    public JP(): void {
        this.$incClock(16)
        this.$incPC(1)
        this.r.PC = this.mmu.getImmediate16(this.r.PC)      
    }

    /**
     * @description Load the 16-bit immediate operand a16 into the program counter PC if the Z flag is 1. 
     * If the Z flag is 1, then the subsequent instruction starts at address a16. 
     * If not, the contents of PC are incremented, and the next instruction following the current JP instruction is executed (as usual).
     * The second byte of the object code (immediately following the opcode) corresponds to the lower-order byte of a16 (bits 0-7), 
     * and the third byte of the object code corresponds to the higher-order byte (bits 8-15)
     * @param flag Flag
     */

     // TODO: UNSURE
     public JP_F(flag: CPUFlagType): void {
        if (this.$getF(flag)) {
            this.cpu.register.PC = this.mmu.getImmediate16(this.r.PC + 1)
        }
        this.$incPC(1)
        this.$incClock(12)      
    }

    /**
     * @description Load the 16-bit immediate operand a16 into the program counter PC if the Z flag is 0. 
     * If the Z flag is 0, then the subsequent instruction starts at address a16. 
     * If not, the contents of PC are incremented, and the next instruction following the current JP instruction is executed (as usual).
     * The second byte of the object code (immediately following the opcode) corresponds to the lower-order byte of a16 (bits 0-7), 
     * and the third byte of the object code corresponds to the higher-order byte (bits 8-15)
     * @param flag Flag
     */

     // TODO: UNSURE
    public JP_NF(flag: CPUFlagType): void {
        if (!this.$getF(flag)) {
            this.cpu.register.PC = this.mmu.getImmediate16(this.r.PC)
        } else {
            this.cpu.register.PC++
        }

        this.$incClock(12)
    }

    /**
     * @description Load the contents of register pair HL into the program counter PC. The next instruction is fetched from the location specified by the new value of PC.
     * @param r1h Register 1 (high byte)
     * @param r1h Register 1 (low byte)
     */

    public JP_RR(r1h: CPURegisterType, r1l: CPURegisterType): void {
        this.r.PC = this.cpu.read16(r1h, r1l)

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Run directly after an addition or subtraction, which have encoded operands (Binary Coded Decimal aka BCD). 
     * For more info see: https://ehaskins.com/2018-01-30%20Z80%20DAA/
     */
    public DAA(): void {        
        let correction = 0
        let v: number = this.r.A // Value in register A

        // If addition
        if (this.$getF(CPUFlagType.H) || (!this.$getF(CPUFlagType.N) && (v & 0xf) > 9)) {
            correction |= 0x6
        }

        // If subtraction
        if (this.$getF(CPUFlagType.H) || (!this.$getF(CPUFlagType.N) && (v > 0x99))) {
            correction |= 0x60
            this.$setF(CPUFlagType.C, 1) // Set flag C if subtraction
        }

        v += (this.$getF(CPUFlagType.N) ? -correction : correction) & 0xFF

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.H)

        this.$incClock(4)
        this.$incPC(1)      
    }

    /**
     * @description Compare the contents of register A and the contents of the 8-bit immediate operand d8 by calculating A - d8, 
     * and set the Z flag if they are equal. The execution of this instruction does not affect the contents of register A.
     */
    public CP(): void {
        const v: number = this.cpu.read8('A') - this.mmu.getImmediate8(this.r.PC)

        this.$setF(CPUFlagType.Z, !v)
        this.$setF(CPUFlagType.N, 1)
        this.$setF(CPUFlagType.H, (!this.$isBit4Borrow(this.cpu.read8('A'), v)))
        this.$setF(CPUFlagType.C, (this.cpu.read8('A') < this.mmu.getImmediate8(this.r.PC)))

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Flip all bits of Register A
     */
    public CPL(): void {
        this.r.A = ~this.r.A

        this.$setF(CPUFlagType.N, 1)
        this.$setF(CPUFlagType.H, 1)

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Flip the C (carry) flag
     */
    public CCF(): void {
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        
        // Flip the C flag; if set, unset, if unset, set
        if (this.$getF(CPUFlagType.C)) {
            this.$resetF(CPUFlagType.C)
        } else {
            this.$setF(CPUFlagType.C, 1)
        }

        this.$incClock(4)
        this.$incPC(1)
    }

    public SCF(): void {
        this.$setF(CPUFlagType.C, 1)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Compare the contents of register r1 and the contents of register A by calculating A - r1, and set the Z flag if they are equal
     * @param r1 Register (n)
     */
    public CP_R(r1: CPURegisterType): void {
        const v: number = this.cpu.read8('A') - this.cpu.read8(r1)
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v) // ergo, if r1 and A are equal
        this.$setF(CPUFlagType.N, 1)
        this.$setF(CPUFlagType.H, (!this.$isBit4Borrow(this.cpu.read8('A'), v)))
        this.$setF(CPUFlagType.C, (this.cpu.read8('A') < this.cpu.read8(r1))) // A is smaller than r1

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Compare the contents of memory specified by register pair r1h-r1l and the contents of register A by calculating A - (r1h-r1l), and set the Z flag if they are equal
     * @param r1 Register (n)
     */
    public CP_RR(r1h: CPURegisterType, r1l: CPURegisterType): void {
        const pointer: number = this.cpu.read16(r1h, r1l) // r1
        const v: number = this.cpu.read8('A') - this.mmu.read(pointer)
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v) // ergo, if r1 and A are equal
        this.$setF(CPUFlagType.N, 1)
        this.$setF(CPUFlagType.H, (!this.$isBit4Borrow(this.cpu.read8('A'), v)))
        this.$setF(CPUFlagType.C, (this.cpu.read8('A') < this.mmu.read(pointer))) // A is smaller than memory address pointed to by r1

        this.$incClock(8)
        this.$incPC(1)
    }

    // TODO
    public HALT(): void {
        /* After a HALT instruction is executed, the system clock is stopped and HALT mode is entered. Although the system clock is stopped in this status, the oscillator circuit and LCD controller continue to operate.

        In addition, the status of the internal RAM register ports remains unchanged.

        HALT mode is cancelled by an interrupt or reset signal.

        The program counter is halted at the step after the HALT instruction. If both the interrupt request flag and the corresponding interrupt enable flag are set, HALT mode is exited, even if the interrupt master enable flag is not set.

        Once HALT mode is cancelled, the program starts from the address indicated by the program counter.

        If the interrupt master enable flag is set, the contents of the program coounter are pushed to the stack and control jumps to the starting address of the interrupt.

        If the RESET terminal goes LOW in HALT moode, the mode becomes that of a normal reset. */

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Take the logical OR for each bit of the contents of the 8-bit immediate operand d8 and the contents of register A, and store the results in register A.
     */
    public OR(): void {
        const v: number = this.mmu.getImmediate8(this.r.PC) ^ this.cpu.read8('A')
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$resetF(CPUFlagType.C)

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Take the logical OR for each bit of the contents of register r1 and the contents of register A, and store the results in register A
     * @param r1 Register (n)
     */
    public OR_R(r1: CPURegisterType): void {
        const v: number = this.cpu.read8(r1) ^ this.cpu.read8('A')
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$resetF(CPUFlagType.C)

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Take the logical OR for each bit of the contents of memory specified by register pair r1h-r1l and the contents of register A, and store the results in register A
     * @param r1h Register (n) (high byte)
     * @param r1l Register (n) (low byte)
     */
    public OR_RR(r1h: CPURegisterType, r1l: CPURegisterType): void {        
        const pointer: number = this.cpu.read16(r1h, r1l)
        const v: number = this.mmu.read(pointer) ^ this.cpu.read8('A')
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$resetF(CPUFlagType.C)

        this.$incClock(8)
        this.$incPC(1)
    }
    
    /**
     * @description Only advances the program counter by 1. Performs no other operations that would have an effect
     */
    public NOP(): void {
        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Pop the contents from the memory stack into register pair into register pair r1h-r1l
     * 1. Load the contents of memory specified by stack pointer SP into the lower portion of r1h-r1l.
     * 2. Add 1 to SP and load the contents from the new memory location into the upper portion of r1h-r1l.
     * 3. By the end, SP should be 2 more than its initial value
     * @param r1h Register 1 (high byte)
     * @param r1l Register 1 (low byte)
     */
    public POP_RR(r1h: CPURegisterType, r1l: CPURegisterType): void {
        this.cpu.write8(this.mmu.read(this.r.SP || 0), r1l)
        this.r.SP++

        this.cpu.write8(this.mmu.read(this.r.SP || 0), r1h)
        this.r.SP++

        this.$incClock(12)
        this.$incPC(1)
    }

    /**
     * @description Push the contents of register pair r1h-r1l onto the memory stack by doing the following:
     * 1. Subtract 1 from the stack pointer SP, and put the contents of the higher portion of register pair r1h-r1l on the stack.
     * 2. Subtract 2 from SP, and put the lower portion of register pair r1h-r1l on the stack.
     * 3. Decrement SP by 2
     * @param r1h Register 1 (high byte)
     * @param r1l Register 1 (low byte)
     */
    public PUSH_RR(r1h: CPURegisterType, r1l: CPURegisterType): void {
        this.r.SP--
        this.mmu.write(this.r.SP, this.cpu.read8(r1h))
        
        this.r.SP--
        this.mmu.write(this.r.SP, this.cpu.read8(r1l))

        this.$incClock(16)
        this.$incPC(1)
    }

    /**
     * @description Pop from the memory stack the program counter PC value was pushed when the subroutine was called, returning control to the source program.
     * The contents of the address specified by the stack pointer SP are loaded in the lower-order byte of PC, and the contents of SP are incremented by 1. 
     * The contents of the address specified by the new SP value are then loaded in the higher-order byte of PC, and the contents of SP are incremented by 1 again. 
     * (The value of SP is 2 larger than before instruction execution.) The next instruction is fetched from the address specified by the content of PC (as usual)
     */
    public RET(): void {
        const v: number = this.mmu.getImmediate16(this.r.SP)
        this.cpu.register.PC = v

        this.r.SP += 2
        this.$incClock(16)
    }

    /**
     * @description Used when an interrupt-service routine finishes. The address for the return from the interrupt is loaded in the program counter PC. The master interrupt enable flag is returned to its pre-interrupt status.
     * The contents of the address specified by the stack pointer SP are loaded in the lower-order byte of PC, and the contents of SP are incremented by 1. The contents of the address specified by the new SP value are then loaded in the higher-order byte of PC, and the contents of SP are incremented by 1 again. 
     * (The value of SP is 2 larger than before instruction execution.) The next instruction is fetched from the address specified by the content of PC (as usual)
     */
    public RETI(): void {
        this.cpu.IME = 1

        this.r.PC = this.mmu.read(this.r.SP)
        this.r.SP += 2

        this.$incClock(16)
        this.$incPC(1)
    }

    /**
     * @description If the Z flag is 1, control is returned to the source program by popping from the memory stack the program counter PC value that was pushed to the stack when the subroutine was called.
     * The contents of the address specified by the stack pointer SP are loaded in the lower-order byte of PC, and the contents of SP are incremented by 1. The contents of the address specified by the new SP value are then loaded in the higher-order byte of PC, and the contents of SP are incremented by 1 again. 
     * (The value of SP is 2 larger than before instruction execution.) The next instruction is fetched from the address specified by the content of PC (as usual)
     * @param flag 
     */
    public RET_F(flag: CPUFlagType): void {
        if (this.$getF(flag)) {
            this.r.PC = this.mmu.read(this.r.SP)
            this.r.SP += 2
        }

        this.$incClock(20)
        this.$incPC(2)
    }

    /**
     * @description If the Z flag is 0, control is returned to the source program by popping from the memory stack the program counter PC value that was pushed to the stack when the subroutine was called.
     * See RET_F for more information
     * @param flag 
     */
    public RET_NF(flag: CPUFlagType): void {
        if (!this.$getF(flag)) {
            this.r.PC = this.mmu.read(this.r.SP)
            this.r.SP += 2
        }

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Reset bit 0 in register r1 to 0.
     * @param bit bit or hex value used as mask to grab the right bit of register r1 (e.g. to grab bit 5 (32) the value of 'bit' should be 0x20 in hex)
     * @param r1 
     */
    public RES_b_R(bit: number, r1: CPURegisterType): void {
        const v: number = this.cpu.read8(r1) & ~bit // Reset bit (b) of register r1
        this.cpu.write8(v, r1)

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Reset bit 0 in the memory location specified by register pair r1h-r1l to 0.
     * @param bit bit or hex value used as mask to grab the right bit of register r1 (e.g. to grab bit 5 (32) the value of 'bit' should be 0x20 in hex)
     * @param r1h Register (high byte)
     * @param r1l Register (low byte)
     */
    public RES_b_RR(bit: number, r1h: CPURegisterType, r1l: CPURegisterType): void {
        const pointer: number = this.cpu.read16(r1h, r1l)
        const v: number = this.mmu.read(pointer) & ~bit // Reset bit (b) of register r1
        this.mmu.write(pointer, v)

        this.$incClock(16)
        this.$incPC(2)
    }

    public RST(byteNr: number): void {        
        this.r.SP -= 1
        this.mmu.write(this.r.SP, (this.r.PC >> 4) & 0xF)
        this.r.SP -= 1
        this.mmu.write(this.r.SP, this.r.PC & 0xF)
        
        this.cpu.register.PC = byteNr // e.g. 0x00, 0x10, 0x20, 0x30 etc.
        this.$incClock(16)
    }

    /**
     * @description Set bit 0 in register B to 1.
     * @param bit bit or hex value used as mask to grab the right bit of register r1 (e.g. to grab bit 5 (32) the value of 'bit' should be 0x20 in hex)
     * @param r1 
     */
    public SET_b_R(bit: number, r1: CPURegisterType): void {
        const v: number = this.cpu.read8(r1) | bit // Set bit (b) in register r1 to 1
        this.cpu.write8(v, r1)

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Set bit 0 in the memory location specified by register pair r1h-r1l to 1.
     * @param bit bit or hex value used as mask to grab the right bit of register r1 (e.g. to grab bit 5 (32) the value of 'bit' should be 0x20 in hex)
     * @param r1h Register (high byte)
     * @param r1l Register (low byte)
     */
    public SET_b_RR(bit: number, r1h: CPURegisterType, r1l: CPURegisterType): void {
        const pointer: number = this.cpu.read16(r1h, r1l)
        const v: number = this.mmu.read(pointer) | bit // Set bit (b) in register r1 to 1
        this.mmu.write(pointer, v)

        this.$incClock(16)
        this.$incPC(2)
    }

    /**
     * @description Shift the contents of register B to the left. 
     * That is, the contents of bit 0 are copied to bit 1, and the previous contents of bit 1 (before the copy operation) are copied to bit 2. 
     * The same operation is repeated in sequence for the rest of the register. 
     * The contents of bit 7 are copied to the CY flag, and bit 0 of register B is reset to 0
     * @param r1 Register
     */
    public SLA_R(r1: CPURegisterType): void {
        const r: number = this.cpu.read8(r1)
        const oldBit7: number = r & 0x80

        const v: number = (r << 1) // shift to left, bit0 will automatically by 0
        this.cpu.write8(v, r1)

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, oldBit7 && 1)

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Shift the contents of memory specified by register pair r1h-r1l to the left. That is, the contents of bit 0 are copied to bit 1, and the previous contents of bit 1 (before the copy operation) are copied to bit 2. The same operation is repeated in sequence for the rest of the memory location. The contents of bit 7 are copied to the CY flag, and bit 0 of (r1h-r1l) is reset to 0.
     * @param r1h Register (high byte)
     * @param r1l Register (low byte)
     */
    public SLA_RR(r1h: CPURegisterType, r1l: CPURegisterType): void {
        const pointer: number = this.cpu.read16(r1h, r1l)
        const m: number = this.mmu.read(pointer)
        const oldBit7: number = m & 0x80

        const v: number = (m << 1) // shift to left, bit0 will automatically by 0
        this.mmu.write(pointer, v)

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, oldBit7 & 1)

        this.$incClock(16)
        this.$incPC(2)
    }

    /**
     * @description Shift the contents of register r1 to the right. 
     * That is, the contents of bit 7 are copied to bit 6, and the previous contents of bit 6 (before the copy operation) are copied to bit 5. 
     * The same operation is repeated in sequence for the rest of the register. 
     * The contents of bit 0 are copied to the CY flag, and bit 7 of register r1 is unchanged.
     * @param r1 Register
     */
    public SRA_R(r1: CPURegisterType): void {
        const r: number = this.cpu.read8(r1)
        const oldBit0: number = r & 0x01
        const oldBit7: number = r & 0x80

        const v: number = (r >> 1) & oldBit7 // shift to right, bit7 will remains unchanged
        this.cpu.write8(v, r1)

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, oldBit0 & 1)

        this.$incClock(8)
        this.$incPC(2)
    }

     /**
     * @description Shift the contents of memory specified by register pair r1h-r1l to the right. 
     * That is, the contents of bit 7 are copied to bit 6, and the previous contents of bit 6 (before the copy operation) are copied to bit 5. 
     * The same operation is repeated in sequence for the rest of the memory location. 
     * The contents of bit 0 are copied to the CY flag, and bit 7 of (r1h-r1l) is unchanged.
     * @param r1h Register (high byte)
     * @param r1l Register (low byte)
     */
    public SRA_RR(r1h: CPURegisterType, r1l: CPURegisterType): void {
        const pointer: number = this.cpu.read16(r1h, r1l)
        const m: number = this.mmu.read(pointer)
        const oldBit0: number = m & 0x01
        const oldBit7: number = m & 0x80

        const v: number = (m >> 1) & oldBit7 // shift to right, bit7 will remains unchanged
        this.mmu.write(pointer, v)

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, oldBit0 & 1)

        this.$incClock(16)
        this.$incPC(2)
    }

    /**
     * @description Shift the contents of register r1 to the right. 
     * That is, the contents of bit 7 are copied to bit 6, and the previous contents of bit 6 (before the copy operation) are copied to bit 5. 
     * The same operation is repeated in sequence for the rest of the register. 
     * The contents of bit 0 are copied to the CY flag, and bit 7 of register r1 is reset to 0.
     * Note that this SRL is almost identical to SRA, except bit 7 is set to 0
     * @param r1 Register
     */
    public SRL_R(r1: CPURegisterType): void {
        const r: number = this.cpu.read8(r1)
        const oldBit0: number = r & 0x01

        const v: number = (r >> 1) // shift to right, bit 7 is automatically 0 when shifting right
        this.cpu.write8(v, r1)

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, oldBit0 & 1)

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Shift the contents of memory specified by register pair r1h-r1l to the right. 
     * That is, the contents of bit 7 are copied to bit 6, and the previous contents of bit 6 (before the copy operation) are copied to bit 5. 
     * The same operation is repeated in sequence for the rest of the memory location. 
     * The contents of bit 0 are copied to the CY flag, and bit 7 of (r1h-r1l) is reset to 0.
     * Note that this SRL is almost identical to SRA, except bit 7 is set to 0
     * @param r1h Register (high byte)
     * @param r1l Register (low byte)
     */
    public SRL_RR(r1h: CPURegisterType, r1l: CPURegisterType): void {
        const pointer: number = this.cpu.read16(r1h, r1l)
        const m: number = this.mmu.read(pointer)
        const oldBit0: number = m & 0x01

        const v: number = (m >> 1) // shift to right, bit 7 is automatically 0 when shifting right
        this.mmu.write(pointer, v)

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$setF(CPUFlagType.C, oldBit0 & 1)

        this.$incClock(16)
        this.$incPC(2)
    }

    // TODO
    public STOP(): void { 
        /**
         * Execution of a STOP instruction stops both the system clock and oscillator circuit. 
         * STOP mode is entered and the LCD controller also stops. 
         * However, the status of the internal RAM register ports remains unchanged.
         * STOP mode can be cancelled by a reset signal.
         * 
         * If the RESET terminal goes LOW in STOP mode, it becomes that of a normal reset status.
         * The following conditions should be met before a STOP instruction is executed and stop mode is entered:
         * 
         * All interrupt-enable (IE) flags are reset.
         * Input to P10-P13 is LOW for all.
         */

        this.$incClock(4)
        this.$incPC(2)  
    }

     /**
     * @description Subtract the contents of the 8-bit immediate operand d8 from the contents of register A, and store the results in register A.
     * @param r1 Register (n)
     */
    public SUB(): void {
        const v: number = (this.cpu.read8('A') - this.mmu.getImmediate8(this.r.PC)) & 0xFF
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v)
        this.$setF(CPUFlagType.N, 1)
        this.$setF(CPUFlagType.H, (!this.$isBit4Borrow(this.cpu.read8('A'), v)))
        this.$setF(CPUFlagType.C, (!this.$isBit3Borrow(this.cpu.read8('A'), v)))

        this.$incClock(8)
        this.$incPC(2)
    }

     /**
     * @description Subtract the contents of register r2 from register A, and store the results in register A.
     * @param r1 Register (n)
     */
    public SUB_R(r1: CPURegisterType): void {
        const v: number = (this.cpu.read8('A') - this.cpu.read8(r1)) & 0xFF
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v)
        this.$setF(CPUFlagType.N, 1)
        this.$setF(CPUFlagType.H, (!this.$isBit4Borrow(this.cpu.read8('A'), v)))
        this.$setF(CPUFlagType.C, (!this.$isBit3Borrow(this.cpu.read8('A'), v)))

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Subtract the contents of memory specified by register pair r1h-r1l from register A, and store the results in register A.
     * @param r1 Register (n)
     */
    public SUB_RR(r1h: CPURegisterType, r1l: CPURegisterType): void {
        const pointer: number = this.cpu.read16(r1h, r1l)
        const v: number = (this.cpu.read8('A') - this.mmu.read(pointer)) & 0xFF
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v)
        this.$setF(CPUFlagType.N, 1)
        this.$setF(CPUFlagType.H, (!this.$isBit4Borrow(this.cpu.read8('A'), v)))
        this.$setF(CPUFlagType.C, (!this.$isBit3Borrow(this.cpu.read8('A'), v)))

        this.$incClock(8)
        this.$incPC(1)
    }

    /**
     * @description Subtract the contents of register r2 and the Carry Flag from the contents of register r1, and store the results in register r1.
     * @param r1 Register (n / target)
     * @param r2 Register (n)
     */
    public SBC_R_R(r1: CPURegisterType, r2: CPURegisterType) {
        const v: number = this.cpu.read8(r2) + (this.$getF(CPUFlagType.C) ? 1 : 0)
        this.cpu.write8(this.cpu.read8(r1) - v, r1)

        this.$setF(CPUFlagType.Z, !v)
        this.$setF(CPUFlagType.N, 1)
        this.$setF(CPUFlagType.H, (!this.$isBit4Borrow(this.cpu.read8(r1), v)))
        this.$setF(CPUFlagType.C, (!this.$isBit3Borrow(this.cpu.read8(r1), v)))

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Subtract the contents of the 8-bit immediate operand d8 and the carry flag CY from the contents of register r1, and store the results in register r1.
     * @param r1 Register (n / target)
     * @param r2 Register (n)
     */
    public SBC_R_d8(r1: CPURegisterType) {
        const v: number = this.mmu.getImmediate8(this.r.PC) + (this.$getF(CPUFlagType.C) ? 1 : 0)
        this.cpu.write8(this.cpu.read8(r1) - v, r1)

        this.$setF(CPUFlagType.Z, !v)
        this.$setF(CPUFlagType.N, 1)
        this.$setF(CPUFlagType.H, (!this.$isBit4Borrow(this.cpu.read8(r1), v)))
        this.$setF(CPUFlagType.C, (!this.$isBit3Borrow(this.cpu.read8(r1), v)))

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Subtract the contents of memory specified by register pair r2h-r2l and the Carry Flag from the contents of register r1, and store the results in register r1.
     * @param r1 Register (n / target)
     * @param r2 Register (n)
     */
    public SBC_R_RR(r1: CPURegisterType, r2h: CPURegisterType, r2l: CPURegisterType) {
        const pointer: number = this.cpu.read16(r2h, r2l)
        const v: number = this.mmu.read(pointer) + (this.$getF(CPUFlagType.C) ? 1 : 0)
        this.cpu.write8(this.cpu.read8(r1) - v, r1)

        this.$setF(CPUFlagType.Z, !v)
        this.$setF(CPUFlagType.N, 1)
        this.$setF(CPUFlagType.H, (!this.$isBit4Borrow(this.cpu.read8(r1), v)))
        this.$setF(CPUFlagType.C, (!this.$isBit3Borrow(this.cpu.read8(r1), v)))

        this.$incClock(8)
        this.$incPC(1)
    }

    /**
     * @description Shift the contents of the lower-order four bits (0-3) of register r1 to the higher-order four bits (4-7) of the register, 
     * and shift the higher-order four bits to the lower-order four bits.
     * @param r1 Register
     */
    public SWAP_R(r1: CPURegisterType): void {
        const lowBits: number = this.cpu.read8(r1) & 0x0F // lower order 4 bits (0-3)
        const highBits: number = this.cpu.read8(r1) & 0xF0 // higher order 4 bits (4-7)
        const v: number = ((lowBits << 4) | (highBits >> 4) & 0xFF) // Swap the low and high order bits
        this.cpu.write8(v, r1)

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$resetF(CPUFlagType.C)

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Shift the contents of the lower-order four bits (0-3) of the contents of memory specified by register pair r1h-r1l to the higher-order four bits (4-7) of that memory location, 
     * and shift the contents of the higher-order four bits to the lower-order four bits.
     * @param r1h Register (high byte)
     * @param r1l Register (low byte)
     */
    public SWAP_RR(r1h: CPURegisterType, r1l: CPURegisterType): void {
        const pointer: number = this.cpu.read16(r1h, r1l)
        const m: number = this.mmu.read(pointer)
        const lowBits: number = m & 0x0F // lower order 4 bits (0-3)
        const highBits: number = m & 0xF0 // higher order 4 bits (4-7)
        const v: number = ((lowBits << 4) | (highBits >> 4) & 0xFF) // Swap the low and high order bits

        this.mmu.write(pointer, v)

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$resetF(CPUFlagType.C)

        this.$incClock(16)
        this.$incPC(2)
    }

    /**
     * @description Take the logical exclusive-OR for each bit of the contents of the 8-bit immediate operand d8 and the contents of register A, and store the results in register A.
     */
    public XOR(): void {
        const v: number = this.mmu.getImmediate8(this.r.PC) ^ this.cpu.read8('A')
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$resetF(CPUFlagType.C)

        this.$incClock(8)
        this.$incPC(2)
    }

    /**
     * @description Take the logical XOR for each bit of the contents of register r1 and the contents of register A, and store the results in register A
     * @param r1 Register (n)
     */
    public XOR_R(r1: CPURegisterType): void {
        const v: number = this.cpu.read8(r1) ^ this.cpu.read8('A')
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$resetF(CPUFlagType.C)

        this.$incClock(4)
        this.$incPC(1)
    }

    /**
     * @description Take the logical XOR for each bit of the contents of memory specified by register pair r1h-r1l and the contents of register A, and store the results in register A
     * @param r1h Register (n) (high byte)
     * @param r1l Register (n) (low byte)
     */
    public XOR_RR(r1h: CPURegisterType, r1l: CPURegisterType): void {        
        const pointer: number = this.cpu.read16(r1h, r1l)
        const v: number = this.mmu.read(pointer) ^ this.cpu.read8('A')
        this.cpu.write8(v, 'A')

        this.$setF(CPUFlagType.Z, !v)
        this.$resetF(CPUFlagType.N)
        this.$resetF(CPUFlagType.H)
        this.$resetF(CPUFlagType.C)

        this.$incClock(8)
        this.$incPC(1)
    }
}

export { Opcodes }