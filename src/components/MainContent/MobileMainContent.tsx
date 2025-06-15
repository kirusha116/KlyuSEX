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

export function MobileMainContent({
  lastMeasures,
  selectedState,
  setSelectedState,
}: {
  lastMeasures: Measures;
  selectedState: number;
  setSelectedState: (index: number) => void;
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
  return (
    <Carousel className="w-full" opts={opts} setApi={setApi}>
      <CarouselContent>
        {Object.values(states).map((state, index) => {
          return (
            <CarouselItem key={index}>
              <h1 className="text-primary text-center text-4xl leading-12 mt-6">
                {labels[state]}
              </h1>
              <h2 className="text-primary text-4xl text-center mt-3">
                {`${lastMeasures[state]} ${
                  state === states.MetabolicAge
                    ? getUnit(state, +lastMeasures[states.MetabolicAge])
                    : getUnit(state)
                }`}
              </h2>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
