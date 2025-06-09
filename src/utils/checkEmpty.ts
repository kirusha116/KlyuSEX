import type { Measures } from "@/models/Measures";

export function checkEmpty(measures: Measures) {
  if (Object.values(measures).includes("")) return true;
  return false;
}
