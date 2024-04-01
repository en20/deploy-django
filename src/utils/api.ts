export const LOCAL_URL = process.env.NEXT_PUBLIC_URL || ""
export const API_URL = process.env.NEXT_PUBLIC_API_URL || ""
export const DEFAULT_PAGE_SIZE = 10;

export function getCookie(name: string): string {
  const value = `; ${document.cookie}` 
  const parts = value.split(`; ${name}=`)
  
  return parts[1].split(";")[0]
}
