import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function computeCallbackURL(pathname: string, search?: string) {
  let callbackUrl = pathname;
  if (search) {
    callbackUrl += search;
  }

  return encodeURIComponent(callbackUrl);
}
