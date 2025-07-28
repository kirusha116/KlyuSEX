import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { labels } from "@/constants/labels";
import { states } from "@/constants/states";
import type { Measures } from "@/models/Measures";
import { getUnit } from "@/utils/getUnit";
import { useEffect, useRef, useState } from "react";
import type { ChartData } from "@/utils/makeChartData";
import type { Records } from "@/models/Records";
import { MyChart } from "./MyChart";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function MobileMainContent({
  lastMeasures,
  selectedState,
  setSelectedState,
  chartData,
}: {
  lastMeasures: Measures;
  selectedState: number;
  setSelectedState: (index: number) => void;
  history: Records[];
  chartData: ChartData;
}) {
  const scrollArea = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState<number>();
  useEffect(() => {
    setChartHeight(scrollArea!.current!.clientHeight);
  }, [scrollArea]);

  //
  const [api, setApi] = useState<CarouselApi>();
  const [opts, setOpts] = useState<
    Partial<{ startIndex: number }> | undefined
  >();
  useEffect(() => {
    if (!api) {
      setOpts({ startIndex: selectedState });
      return;
    }

    setSelectedState(api.selectedScrollSnap());

    api.scrollTo(selectedState);

    api.on("select", () => {
      setSelectedState(api.selectedScrollSnap());
    });
  }, [api, selectedState, setSelectedState]);
  //
  return (
    <Carousel className="grow h-full" opts={opts} setApi={setApi}>
      <CarouselContent className="h-full">
        {Object.values(states).map((state, index) => {
          return (
            <CarouselItem
              key={index}
              className="flex flex-col h-full gap-3 overflow-hidden"
            >
              <h1 className="text-primary text-center text-4xl leading-12">
                {labels[state]}
              </h1>
              <h2 className="text-primary text-4xl text-center">
                {`${lastMeasures[state]} ${
                  state === states.MetabolicAge
                    ? getUnit(state, +lastMeasures[states.MetabolicAge])
                    : getUnit(state)
                }`}
              </h2>
              <ScrollArea className="grow" ref={scrollArea} dir="rtl">
                <MyChart
                  selectedState={Object.values(states)[index]}
                  chartData={chartData}
                  style={{
                    height: chartHeight + "px",
                    width: (100 / 8) * (chartData.length - 1) + "%",
                  }}
                />
              </ScrollArea>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
