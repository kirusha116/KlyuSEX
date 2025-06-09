import { localKey } from "@/constants/localKey";
import type { Records } from "@/models/Records";

export function saveHistory(history: Records[]) {
  localStorage.setItem(localKey, JSON.stringify(history));
}
