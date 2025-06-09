import { localKey } from "@/constants/localKey";
import type { Records } from "@/models/Records";

export function getHistory(): Records[] {
  if (localKey in localStorage) {
    return JSON.parse(localStorage.getItem(localKey) || '""');
  }
  return [];
}
