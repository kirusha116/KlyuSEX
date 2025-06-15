"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

export function MyChart({
  chartData,
}: {
  chartData: { date: string; line: string }[];
}) {
  const chartConfig = {
    line: {
      color: "var(--primary)",
    },
  } satisfies ChartConfig;
  //
  console.log(chartData);

  //
  return (
    <div className="mx-4">
      <ChartContainer config={chartConfig} className="min-h-[200px]">
        <AreaChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={true} horizontal={true} />
          <XAxis dataKey="date" />
          <YAxis dataKey="line" />
          <Area
            dataKey="line"
            fill="var(--color-line)"
            className="opacity-60"
            connectNulls={true}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
