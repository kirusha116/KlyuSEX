import { monthsEn } from "@/constants/monthsEn";
import { monthsRu } from "@/constants/monthsRu";

export function toIsoFormat(date: string) {
  const dateArray = date.split(" ");
  return `${dateArray[0]} ${monthsEn[monthsRu.indexOf(dateArray[1])]} ${
    dateArray[2]
  }`;
}
