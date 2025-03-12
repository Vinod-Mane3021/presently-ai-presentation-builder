import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Pauses execution for the specified duration.
 * 
 * @param milliseconds - The time to wait in milliseconds.
 * @returns A promise that resolves after the given time.
 */
export const waitFor = async (milliseconds: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(res, milliseconds);
  });
};
