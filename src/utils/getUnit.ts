import { states } from "@/constants/states";

export function getUnit(
  state: string,
  age: number | undefined = undefined
): string {
  function getAgeUnit(age: number | undefined) {
    if (age === undefined) {
      return " лет";
    }
    if (age >= 10 && age <= 20) {
      return " лет";
    }
    if (age % 10 === 1) {
      return " год";
    }
    if ([2, 3, 4].includes(age % 10)) {
      return " года";
    }
    return " лет";
  }

  if (state === states.Fat || state === states.Water) {
    return " %";
  }
  if (state === states.MetabolicAge) {
    return getAgeUnit(age);
  }
  return " кг";
}
