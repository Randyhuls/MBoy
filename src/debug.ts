import { MMU } from './mmu/mmu'

class Debug {
  private static _shared: Debug
  public debugging: boolean = false
  public mmu: MMU // Set by mboy.ts

  public serialOutput: { entries: string[], str: string } = {
    entries: [],
    str: ''
  }

  static get shared(): Debug {
    if (!this._shared) this._shared = new Debug()
    return this._shared
}

  public readSerialOutput() {
    const { entries } = this.serialOutput
    const output: string = entries[entries.length-1]
    const char = this.mmu.read(0xFF01)
    const endOfLine = this.mmu.read(0xFF02) === 0x81

    if (char) this.serialOutput.str += String.fromCharCode(char)
    if (endOfLine) {
      this.serialOutput.entries.push(this.serialOutput.str)
      this.serialOutput.str = ''
    }

    if (this.debugging && entries && entries.length > 0) this.log('Serial I/O ->', output)
  }

  private log(...msg: any) {
    console.debug(...msg)
  }
}

export { Debug}