import type { Records } from "@/models/Records";
import { toNumberFormat } from "./toNumberFormat";

export function makeChartData(history: Records[], selectedState: string) {
  //
  //
  const getDatesArray = (start: Date, end: Date) => {
    const arr = [];
    while (start <= end) {
      arr.push(new Date(start));
      start.setDate(start.getDate() + 1);
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
  //
  const datesArray = getDatesArray(
    new Date(toNumberFormat(history[0].date)),
    new Date(toNumberFormat(history[history.length - 1].date))
  );
  //
  type HistoryObj = { [x: string]: string };
  //
  const historyObj: HistoryObj = history.reduce((acc, item) => {
    return { ...acc, [item.date]: item[selectedState] };
  }, {});
  //
  return [
    ...datesArray.map((date) => {
      return { date, line: historyObj[date] };
    }),
    { date: "", line: history[history.length - 1][selectedState] },
  ];
}
