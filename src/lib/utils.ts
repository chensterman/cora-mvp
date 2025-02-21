import clsx from "clsx"
import { twMerge } from "tailwind-merge"

type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean } | ClassValue[]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
