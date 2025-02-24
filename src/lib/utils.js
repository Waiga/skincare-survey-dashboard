import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines and merges Tailwind CSS classes using clsx and tailwind-merge
 * @param {...(string|Object|Array)} inputs - CSS class names to merge
 * @returns {string} - Merged CSS class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
} 