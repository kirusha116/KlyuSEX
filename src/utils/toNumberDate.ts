import { months } from "@/constants/months";

export function toNumberDate(date: string) {
  const dateArray = date.split(" ");
  return `${months.indexOf(dateArray[1]) + 1}-${dateArray[0]}-${dateArray[2]}`;
}
