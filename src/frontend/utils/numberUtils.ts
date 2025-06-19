/**
 * Formats a number with a "." as the thousand separator.
 * @param value - The number to format.
 * @returns The formatted number as a string.
 */
export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Add this line to ensure the file is treated as a module
  export {};