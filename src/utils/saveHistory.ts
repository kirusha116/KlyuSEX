import { localKey } from "@/constants/localKey";
import type { Records } from "@/models/Records";
import { toNumberFormat } from "./toNumberFormat";
import type { Measures } from "@/models/Measures";

export function saveHistory(history: Records[]) {
  type FilteredHistory = { [x: string]: Measures };
  const filteredHistory: FilteredHistory = history.reduce((acc, item) => {
    return { ...acc, [toNumberFormat(item.date)]: item };
  }, {});
  const sortedHistory: Measures[] = Object.keys(filteredHistory)
    .sort()
    .map((item) => {
      return filteredHistory[item];
    });
  localStorage.setItem(localKey, JSON.stringify(sortedHistory));
}
