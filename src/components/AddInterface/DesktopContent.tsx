import { labels } from "@/constants/labels";
import { states } from "@/constants/states";
import { Input } from "../ui/input";
import { getUnit } from "@/utils/getUnit";
import type { Measures } from "@/models/Measures";
import { useCallback, useEffect, useState } from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";
import { Calendar28 } from "./Calendar28";

export function DesktopContent({
  register,
  values,
  isWarning,
}: {
  register: UseFormRegister<FieldValues>;
  values: Measures;
  isWarning: boolean;
}) {
  //
  const makeIsEmpty = useCallback(() => {
    return Object.fromEntries(
      Object.entries(values).map(([state, value]) => {
        return [state, !value];
      })
    );
  }, [values]);

  const [isEmpty, setIsEmpty] = useState(makeIsEmpty());
  useEffect(() => setIsEmpty(makeIsEmpty()), [values, makeIsEmpty]);

  return (
    <>
      <ul>
        {Object.values(states).map((state) => {
          return (
            <li className="mb-2 w-[85%] m-auto" key={state}>
              <label className="flex flex-row items-center">
                <span>{labels[state]}</span>
                <div className="grow-1"></div>
                <Input
                  {...register(state)}
                  className={`w-15 text-center ${
                    isWarning &&
                    isEmpty[state] &&
                    "bg-red-100 border border-solid border-pink-200"
                  }}`}
                  type="number"
                  onChange={() => {
                    setIsEmpty({ ...isEmpty, [state]: false });
                  }}
                />
                <span className="w-12 text-end">
                  {state === states.MetabolicAge
                    ? getUnit(state, +values[state])
                    : getUnit(state)}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <Calendar28 register={register} />
    </>
  );
}
