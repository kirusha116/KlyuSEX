import { states } from "./states.ts";

export const accuracy = {
  [states.Weight]: 1,
  [states.Fat]: 0,
  [states.Water]: 0,
  [states.Muscles]: 1,
  [states.MetabolicAge]: 0,
  [states.Bones]: 1,
  [states.VisceralFat]: 1,
};
