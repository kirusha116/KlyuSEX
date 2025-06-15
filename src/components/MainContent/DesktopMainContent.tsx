import { states } from "@/constants/states";
import type { Records } from "@/models/Records";
import { getUnit } from "@/utils/getUnit";
import { MyChart } from "./MyChart";
import { makeChartData } from "@/utils/makeChartData";

export function DesktopMainContent({
  lastMeasures,
  selectedState,
  history,
}: {
  lastMeasures: Records;
  selectedState: string;
  history: Records[];
}) {
  return (
    <>
      <h2 className="text-primary text-5xl text-center my-5">
        {`${lastMeasures[selectedState]} ${
          selectedState === states.MetabolicAge
            ? getUnit(selectedState, +lastMeasures[states.MetabolicAge])
            : getUnit(selectedState)
        }`}
      </h2>
      <MyChart chartData={makeChartData(history, selectedState)} />
    </>
  );
}
