import { states } from "@/constants/states";
import type { Records } from "@/models/Records";
import { getUnit } from "@/utils/getUnit";
import { MyChart } from "./MyChart";
import type { ChartData } from "@/utils/makeChartData";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useEffect, useRef, useState } from "react";

export function DesktopMainContent({
  lastMeasures,
  selectedState,
  chartData,
}: {
  lastMeasures: Records;
  selectedState: string;
  chartData: ChartData;
}) {
  const scrolledElem = document.querySelector(
    '[data-slot="scroll-area-viewport"]'
  );

  const scrollArea = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState<number>();
  useEffect(() => {
    setChartHeight(scrollArea!.current!.clientHeight);
  }, [scrollArea]);

  return (
    <>
      <h2 className="text-primary text-5xl text-center py-10`">
        {`${lastMeasures[selectedState]} ${
          selectedState === states.MetabolicAge
            ? getUnit(selectedState, +lastMeasures[states.MetabolicAge])
            : getUnit(selectedState)
        }`}
      </h2>
      <ScrollArea
        className="grow"
        ref={scrollArea}
        dir="rtl"
        onWheel={(e) => {
          e.stopPropagation();
          scrolledElem!.scrollLeft += e.deltaY;
        }}
      >
        <MyChart
          selectedState={selectedState}
          chartData={chartData}
          style={{
            height: chartHeight + "px",
            width: (100 / 8) * (chartData.length - 1) + "%",
          }}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
