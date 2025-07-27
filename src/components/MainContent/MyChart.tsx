"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { ChartConfig } from "@/components/ui/chart";
import { labels } from "@/constants/labels";
import { getUnit } from "@/utils/getUnit";
import type { ChartData } from "@/utils/makeChartData";

export function MyChart({
  selectedState,
  chartData,
  style,
}: {
  selectedState: string;
  chartData: ChartData;
  style: { height: string; width: string };
}) {
  const chartConfig = {
    line: {
      label: "line",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="aspect-auto" style={style} dir="ltr">
      <AreaChart data={chartData}>
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
        <XAxis dataKey="date" hide={true} interval={0} />
        <YAxis
          hide={true}
          type="number"
          tickCount={0}
          domain={["dataMin - 1.5", "dataMax + 0.5"]}
        />
        <ChartTooltip
          cursor={{ strokeWidth: 2 }}
          content={({
            active,
            payload,
            label,
            labelFormatter,
            labelClassName,
          }) => {
            if (!label) return;
            return (
              <ChartTooltipContent
                active={active}
                payload={payload}
                label={label}
                labelFormatter={labelFormatter}
                labelClassName={labelClassName}
                formatter={(value) => {
                  return `${labels[selectedState]}: ${value} ${getUnit(
                    selectedState,
                    +value
                  )}`;
                }}
              />
            );
          }}
        />
        <Area
          dataKey="line"
          fill="url(#fillLine)"
          stroke="var(--color-line)"
          connectNulls={true}
          activeDot={false}
          dot={({ key, cx, cy, r, payload }) => {
            return (
              <svg key={key}>
                {payload.date && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    stroke="var(--color-line)"
                    fill="var(--color-line)"
                    strokeWidth={2}
                    fillOpacity={1}
                  />
                )}
              </svg>
            );
          }}
        />
      </AreaChart>
    </ChartContainer>
  );
}
