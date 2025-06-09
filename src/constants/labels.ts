import { states } from "./states.ts";
import type { Labels } from "@/models/Labels.ts";

export const labels: Labels = {
  [states.Weight]: "Вес",
  [states.Fat]: "Процент жира",
  [states.Water]: "Процент воды",
  [states.Muscles]: "Вес мышц",
  [states.MetabolicAge]: "Метаболический возраст",
  [states.Bones]: "Вес костей",
  [states.VisceralFat]: "Висцеральный жир",
};
