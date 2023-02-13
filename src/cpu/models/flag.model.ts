enum CPUFlag {
    Z = 0x80,
    N = 0x40,
    H = 0x20,
    C = 0x10
}

enum CPUFlagType {
    Z = 'Z',
    N = 'N',
    H = 'H',
    C = 'C'
}

export { CPUFlag, CPUFlagType }