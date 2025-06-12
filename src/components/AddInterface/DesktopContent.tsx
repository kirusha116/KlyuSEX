import { labels } from "@/constants/labels";
import { states } from "@/constants/states";
import { Input } from "../ui/input";
import { getUnit } from "@/utils/getUnit";
import type {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Calendar28 } from "./Calendar28";
import type { Measures } from "@/models/Measures";
import { accuracy } from "@/constants/accuracy";
import { useState } from "react";

export function DesktopContent({
  register,
  isWarning,
  getValues,
  setValue,
}: {
  register: UseFormRegister<Measures>;
  isWarning: boolean;
  getValues: UseFormGetValues<Measures>;
  setValue: UseFormSetValue<Measures>;
}) {
  //
  const [isEmpty, setIsEmpty] = useState(
    Object.fromEntries(
      Object.values(states).map((state) => [[state], !getValues(state)])
    )
  );
  //
  return (
    <>
      <ul className="p-4">
        {Object.values(states).map((state) => {
          return (
            <li className="m-auto mb-2" key={state}>
              <label className="flex flex-row items-center">
                <span>{labels[state]}</span>
                <div className="grow-1"></div>
                <Input
                  className={`w-15 text-center ${
                    isWarning &&
                    isEmpty[state] &&
                    "bg-red-100 border border-solid border-pink-200"
                  }}`}
                  type="number"
                  min={0}
                  step={10 ** -accuracy[state]}
                  lang="en"
                  {...register(state)}
                  onChange={(e) => {
                    setIsEmpty({ ...isEmpty, [state]: !e.target.value });
                    setValue(state, e.target.value);
                  }}
                  onBlur={() => {
                    if (getValues(state)) {
                      setValue(
                        state,
                        (+getValues(state)).toFixed(accuracy[state])
                      );
                    }
                  }}
                />
                <span className="w-12 text-end">
                  {state === states.MetabolicAge
                    ? getUnit(state, +getValues(state))
                    : getUnit(state)}
                </span>
              </label>
            </li>
          );
        })}
        <Calendar28
          register={register}
          getValues={getValues}
          setValue={setValue}
        />
      </ul>
    </>
  );
}
