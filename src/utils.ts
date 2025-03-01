    export const getSignedValue8 = (value: number = 0) => {
      return value >127 ? -((~value + 1) & 255) : value
    }

    export const decToHex = (decimal: number): string => {
        return (decimal).toString(16)
    }
    
    export const decToBin = (decimal: number) => {
        return (decimal >>> 0).toString(2);
    }
    
    export const binToDec = (binary: string): number => {
        return parseInt(binary, 2)
    }
    
    export const binToHex = (binary: string): string => {
        return parseInt(binary, 2).toString(16)
    }
    
    export const hexToBin = (hexadecimal: string): string => {
       return parseInt(hexadecimal, 16).toString(2) 
    }
    
    export const hexToDec = (hexadecimal: string): number => {
        return parseInt(hexadecimal, 16)
    }

    export const formatHex = (value: number | string) => {
      return value.toString(16).toUpperCase().padStart(2, '0');
  }

