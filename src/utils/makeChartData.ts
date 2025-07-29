import type { Records } from "@/models/Records";
import { toNumberFormat } from "./toNumberFormat";

export const getDatesArray = (start: string, end: string): string[] | null => {
  if (!start) return null;

  const startDate = new Date(toNumberFormat(start));
  const endDate = new Date(toNumberFormat(end));

  const arr = [];
  while (startDate <= endDate) {
    arr.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  return arr.map((date) => {
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  });
};
//
export type ChartData = { line: string | undefined; date: string }[];
//
export function makeChartData(
  datesArray: string[],
  history: Records[],
  selectedState: string
): ChartData {
  if (!history.length) return [];
  type HistoryObj = { [x: string]: string | undefined };
  //
  const historyObj: HistoryObj = history.reduce((acc, item) => {
    return { ...acc, [item.date]: item[selectedState] };
  }, {});
  //
  return [
    { line: historyObj[datesArray[0]], date: "" },
    ...datesArray.map((date) => {
      return { line: historyObj[date], date };
    }),
    { line: historyObj[datesArray[datesArray.length - 1]], date: "" },
  ];
}
