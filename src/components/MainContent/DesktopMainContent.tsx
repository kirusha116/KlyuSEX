import { states } from "@/constants/states";
import type { Records } from "@/models/Records";
import { getUnit } from "@/utils/getUnit";
import { MyChart } from "./Chart/MyChart";
import { makeChartData } from "@/utils/makeChartData";

export function DesktopMainContent({
  className,
  lastMeasures,
  selectedState,
  history,
}: {
  className: string;
  lastMeasures: Records;
  selectedState: string;
  history: Records[];
}) {
  return (
    <>
      <h2 className={`${className} text-primary text-5xl text-center py-10`}>
        {`${lastMeasures[selectedState]} ${
          selectedState === states.MetabolicAge
            ? getUnit(selectedState, +lastMeasures[states.MetabolicAge])
            : getUnit(selectedState)
        }`}
      </h2>
      <MyChart
        selectedState={selectedState}
        chartData={makeChartData(history)}
        className="grow"
      />
    </>
  );
}
