import { usePathname } from 'next/navigation';

/**
 * Safe pathname hook with soft coding principles
 * Provides fallback handling for SSR and null pathname scenarios
 * 
 * @param fallback - Default path to use if pathname is null (defaults to '/')
 * @returns A guaranteed string pathname value
 */
export const useSafePathname = (fallback: string = '/'): string => {
  const pathname = usePathname();
  
  // Soft coding: Always provide a safe fallback for null pathname
  // This handles SSR scenarios and initial render states
  return pathname ?? fallback;
};

/**
 * Utility function to safely handle pathname in components
 * Use this for direct pathname handling without hooks
 * 
 * @param pathname - The pathname value (can be null)
 * @param fallback - Default path to use if pathname is null (defaults to '/')
 * @returns A guaranteed string pathname value
 */
export const getSafePathname = (pathname: string | null, fallback: string = '/'): string => {
  return pathname ?? fallback;
};

/**
 * Pathname validation utility with soft coding
 * Checks if a pathname is safe to use for routing operations
 * 
 * @param pathname - The pathname to validate
 * @returns Boolean indicating if pathname is safe to use
 */
export const isValidPathname = (pathname: string | null): pathname is string => {
  return pathname !== null && pathname !== undefined && typeof pathname === 'string';
};

export default useSafePathname;