import { states } from "@/constants/states";
import { Button } from "../ui/button";
import { labels } from "@/constants/labels";
import type {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { Measures } from "@/models/Measures";
import { getUnit } from "@/utils/getUnit";
import { MyDrawer } from "./MyDrawer";
import { Input } from "../ui/input";
import { Minus, Plus } from "lucide-react";
import { accuracy } from "@/constants/accuracy";

export function MobileContent({
  values,
  register,
  setValue,
  setValues,
}: {
  values: Measures;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setValues: Dispatch<SetStateAction<Measures>>;
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
                <span>{`${labels[state]}, ${values[state]} ${
                  state === states.MetabolicAge
                    ? getUnit(state, +values[state])
                    : getUnit(state)
                }`}</span>
              </Button>
            </li>
          );
        })}
      </ul>
      <MyDrawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title={labels[selectedState]}
        content={
          <div className="w-[92%] m-auto flex items-center justify-around">
            <Button
              onClick={() => {
                const newValue = (
                  +values[selectedState] -
                  10 ** -accuracy[selectedState]
                ).toFixed(accuracy[selectedState]);
                setValues({
                  ...values,
                  [selectedState]: newValue,
                });
                setValue(selectedState, newValue);
              }}
            >
              <Minus color="#ffffff" />
            </Button>
            <Input
              type="number"
              min={0}
              step={accuracy[selectedState]}
              className="w-15 text-center"
              {...register(selectedState)}
              onChange={(e) => {
                setValues({
                  ...values,
                  [selectedState]: (+e.target.value).toFixed(
                    accuracy[selectedState]
                  ),
                });
                setValue(selectedState, e.target.value);
              }}
            />
            <Button
              onClick={() => {
                const newValue = (
                  +values[selectedState] +
                  10 ** -accuracy[selectedState]
                ).toFixed(accuracy[selectedState]);
                setValues({
                  ...values,
                  [selectedState]: newValue,
                });
                setValue(selectedState, newValue);
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
