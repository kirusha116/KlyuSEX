import { states } from "@/constants/states";
import { Button } from "../ui/button";
import { labels } from "@/constants/labels";
import { useState } from "react";
import type { Measures } from "@/models/Measures";
import { getUnit } from "@/utils/getUnit";
import { MyDrawer } from "./MyDrawer";
import { Input } from "../ui/input";
import { Minus, Plus } from "lucide-react";
import { accuracy } from "@/constants/accuracy";
import type {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Calendar28 } from "./Calendar28";

export function MobileContent({
  register,
  getValues,
  setValue,
}: {
  register: UseFormRegister<Measures>;
  getValues: UseFormGetValues<Measures>;
  setValue: UseFormSetValue<Measures>;
}) {
  //
  const [selectedState, setSelectedState] = useState(states.Weight);
  const [isOpen, setIsOpen] = useState(false);
  //
  return (
    <>
      <ul className="w-full p-4 m-auto">
        {Object.values(states).map((state) => {
          return (
            <li key={state}>
              <Button
                onClick={() => {
                  setSelectedState(state);
                  setIsOpen(true);
                }}
                className="w-full mb-2"
              >
                <span>{`${labels[state]}, ${getValues(state)} ${
                  state === states.MetabolicAge
                    ? getUnit(state, +getValues(state))
                    : getUnit(state)
                }`}</span>
              </Button>
            </li>
          );
        })}
        <Calendar28
          register={register}
          getValues={getValues}
          setValue={setValue}
        />
      </ul>
      <MyDrawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        //
        title={labels[selectedState]}
        //
        content={
          <div className="w-[92%] m-auto flex items-center justify-around">
            <Button
              onClick={() => {
                setValue(
                  selectedState,
                  (
                    +getValues(selectedState) -
                    10 ** -accuracy[selectedState]
                  ).toFixed(accuracy[selectedState])
                );
              }}
            >
              <Minus color="#ffffff" />
            </Button>
            <Input
              className="w-15 text-center"
              type="number"
              min={0}
              step={10 ** -accuracy[selectedState]}
              lang="en"
              {...register(selectedState)}
              onBlur={() => {
                if (getValues(selectedState)) {
                  setValue(
                    selectedState,
                    (+getValues(selectedState)).toFixed(accuracy[selectedState])
                  );
                }
              }}
            />
            <Button
              onClick={() => {
                setValue(
                  selectedState,
                  (
                    +getValues(selectedState) +
                    10 ** -accuracy[selectedState]
                  ).toFixed(accuracy[selectedState])
                );
              }}
            >
              <Plus color="#ffffff" />
            </Button>
          </div>
        }
        footer={
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            className="mb-2"
          >
            Готово
          </Button>
        }
      />
    </>
  );
}
