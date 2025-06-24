"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { ChartConfig } from "@/components/ui/chart";
import type { Measures } from "@/models/Measures";
import { states } from "@/constants/states";
import { labels } from "@/constants/labels";

export function MyChart({
  selectedState,
  chartData,
  className,
}: {
  selectedState: string;
  chartData: Measures[];
  className: string;
}) {

  const formattedChartData = [
    { ...chartData[0], date: "" },
    ...chartData,
    { ...chartData[chartData.length - 1], date: "" },
  ];

  const chartConfig = {
    date: {
      label: "Visitors",
    },
    line: {
      label: "line",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className={`${className} aspect-auto w-full`}
    >
      <AreaChart data={formattedChartData}>
        <defs>
          <linearGradient id="fillLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-line)" stopOpacity={0.8} />
            <stop
              offset="95%"
              stopColor="var(--color-line)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          mirror={true}
          interval={0}
          tick={({ x, y, payload, index }) => {
            const { value } = payload;
            let dy = 0;
            if (value.slice(0, 2) === "01" || +value.slice(0, 2) % 5 === 0)
              dy = -16;
            if (index === 1) dy = -32;

            return (
              <>
                <g transform={`translate(${x},${y})`}>
                  <text textAnchor="middle" fill="#666" dy={dy}>
                    {value.slice(0, 2)}
                  </text>
                  {(value.slice(0, 2) === "01" ||
                    +value.slice(0, 2) % 5 === 0 ||
                    index === 1) && (
                    <text textAnchor="middle" fill="#666" dy={dy + 16}>
                      {value.slice(2, value.length - 8)}
                    </text>
                  )}
                  {index === 1 && (
                    <text textAnchor="middle" fill="#666" dy={dy + 32}>
                      {value.slice(value.length - 8)}
                    </text>
                  )}
                </g>
              </>
            );
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(_, __, props) => {
                return (
                  <ul>
                    {Object.values(states).map((state) => {
                      return (
                        <li
                          key={state}
                          className="block"
                        >{`${labels[state]}: ${props.payload[state]}`}</li>
                      );
                    })}
                  </ul>
                );
              }}
              indicator="dot"
            />
          }
        />
        <Area
          dataKey={selectedState}
          fill="url(#fillLine)"
          stroke="var(--color-line)"
          connectNulls={true}
        />
      </AreaChart>
    </ChartContainer>
  );
}
