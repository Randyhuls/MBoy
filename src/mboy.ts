import { CPU } from './cpu/cpu'
import { GPU } from './gpu/gpu'
import { MMU } from './mmu/mmu'
import { Debug } from './debug'

(new class MBoy {
    private cpu: CPU = CPU.shared
    private gpu: GPU = GPU.shared
    private mmu: MMU = MMU.shared

    // TODO: properly manage dependencies of various hardware (mmu, gpu, etc.)
    public async boot(): Promise<void> {
        // Load ROM
        //await this.mmu.loadROMIntoMemory('tetris.gb')

        //await this.mmu.loadROMIntoMemory('testroms/cpu_instrs/cpu_instrs.gb')
        //await this.mmu.loadROMIntoMemory('nintendo_bootrom.gb')
        await this.mmu.loadROMIntoMemory('testroms/cpu_instrs/individual/01-special.gb')

        // [x] await this.mmu.loadROMIntoMemory('testroms/cpu_instrs/individual/03-op sp,hl.gb')
        // [x] await this.mmu.loadROMIntoMemory('testroms/cpu_instrs/individual/04-op r,imm.gb')
        // [x] await this.mmu.loadROMIntoMemory('testroms/cpu_instrs/individual/05-op rp.gb')
        // [x] await this.mmu.loadROMIntoMemory('testroms/cpu_instrs/individual/06-ld r,r.gb')
        // [x] await this.mmu.loadROMIntoMemory('testroms/cpu_instrs/individual/07-jr,jp,call,ret,rst.gb')

        // Blargg test / logs map ->
        // Blargg1LYStubbed -> 01-special
        // Blargg2LYStubbed -> 02-interrupts
        // Blargg3LYStubbed -> 04-op r,imm
        // Blargg3LYStubbed -> 05-op rp
        // Blargg3LYStubbed -> 06-ld r,r
        // Blargg3LYStubbed -> 07-jr,jp,call,ret,rst
        // Blargg3LYStubbed -> 08-misc instrs
        // Blargg3LYStubbed -> 09-op r,r
        // Blargg3LYStubbed -> 10-bit ops
        // Blargg11LYStubbed -> 11-op a,(hl)
        // ^


        //await this.mmu.loadROMIntoMemory('tetris.gb')
        this.mmu.gpu = this.gpu
        this.gpu.cpu = this.cpu
        this.gpu.mmu = this.mmu

        // Start cycling through instructions
        this.cpu.cycle()
    }

    public restart() {
      // TODO: Reset al registers and clock
      // Call MMU reset
      this.mmu.reset()
      // Call GPU reset
      this.gpu.reset()
      // Call CPU reset
      this.cpu.reset()
    }
})
.boot()
.catch((err: any) => console.error(err))