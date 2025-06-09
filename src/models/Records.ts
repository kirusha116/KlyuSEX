import { states } from "@/constants/states";

export type Records = {
  readonly [states.Weight]: string;
  readonly [states.Fat]: string;
  readonly [states.Water]: string;
  readonly [states.Muscles]: string;
  readonly [states.MetabolicAge]: string;
  readonly [states.Bones]: string;
  readonly [states.VisceralFat]: string;
  readonly date: string;
};
