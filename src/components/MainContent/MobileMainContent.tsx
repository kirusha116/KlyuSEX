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
import { useEffect, useState } from "react";
import { MyChart } from "./Chart/MyChart";
import { makeChartData } from "@/utils/makeChartData";
import type { Records } from "@/models/Records";

export function MobileMainContent({
  lastMeasures,
  selectedState,
  setSelectedState,
  history,
}: {
  lastMeasures: Measures;
  selectedState: number;
  setSelectedState: (index: number) => void;
  history: Records[];
}) {
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
  const chartData = makeChartData(history);
  //
  return (
    <Carousel className="grow h-full" opts={opts} setApi={setApi}>
      <CarouselContent className="h-full">
        {Object.values(states).map((state, index) => {
          return (
            <CarouselItem key={index} className="flex flex-col h-full gap-3">
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
              <MyChart
                selectedState={state}
                chartData={chartData}
                className="grow"
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
