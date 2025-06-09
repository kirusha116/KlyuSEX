import type { states } from "@/constants/states";

export type Measures = {
  [states.Weight]: string;
  [states.Fat]: string;
  [states.Water]: string;
  [states.Muscles]: string;
  [states.MetabolicAge]: string;
  [states.Bones]: string;
  [states.VisceralFat]: string;
};
