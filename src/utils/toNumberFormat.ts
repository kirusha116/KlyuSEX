import { monthsRu } from "@/constants/monthsRu";

export function toNumberFormat(date: string): string {
  const dateArray = date.split(" ");
  return `${dateArray[2]}-${monthsRu.indexOf(dateArray[1]) < 9 ? "0" : ""}${
    monthsRu.indexOf(dateArray[1]) + 1
  }-${dateArray[0]}`;
}
