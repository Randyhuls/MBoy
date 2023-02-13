class Utils {
    public static getSignedValue8(value: number = 0) {
      return value >127 ? value =-((~value + 1) & 255) : value
    }

    public static decToHex = (decimal: number): string => {
        return (decimal).toString(16)
    }
    
    public static decToBin = (decimal: number) => {
        return (decimal >>> 0).toString(2);
    }
    
    public static binToDec = (binary: string): number => {
        return parseInt(binary, 2)
    }
    
    public static binToHex = (binary: string): string => {
        return parseInt(binary, 2).toString(16)
    }
    
    public static hexToBin = (hexadecimal: string): string => {
       return parseInt(hexadecimal, 16).toString(2) 
    }
    
    public static hexToDec = (hexadecimal: string): number => {
        return parseInt(hexadecimal, 16)
    }
}

export { Utils }