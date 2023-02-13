interface CPURegister {
    A: number
    B: number
    C: number
    D: number
    E: number
    H: number
    L: number
    F: number

    PC: number
    SP: number
}

type CPURegisterType = 'A'|'B'|'C'|'D'|'E'|'H'|'L'|'F'

export type { CPURegister, CPURegisterType }