import { states } from "@/constants/states";
import type { Records } from "@/models/Records";
import { getUnit } from "@/utils/getUnit";
import { MyChart } from "./MyChart";
import type { ChartData } from "@/utils/makeChartData";

export function DesktopMainContent({
  className,
  lastMeasures,
  selectedState,
  chartData,
}: {
  className: string;
  lastMeasures: Records;
  selectedState: string;
  chartData: ChartData;
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
        chartData={chartData}
        className="grow"
      />
    </>
  );
}
