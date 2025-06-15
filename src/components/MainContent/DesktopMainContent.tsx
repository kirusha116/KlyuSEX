import { states } from "@/constants/states";
import type { Records } from "@/models/Records";
import { getUnit } from "@/utils/getUnit";

export function DesktopMainContent({
  lastMeasures,
  selectedState,
}: {
  lastMeasures: Records;
  selectedState: string;
}) {
  return (
    <h2 className="text-primary text-5xl text-center mt-5">
      {`${lastMeasures[selectedState]} ${
        selectedState === states.MetabolicAge
          ? getUnit(selectedState, +lastMeasures[states.MetabolicAge])
          : getUnit(selectedState)
      }`}
    </h2>
  );
}
