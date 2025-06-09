import type { Records } from "@/models/Records";
import { useMediaQuery } from "@mui/material";
import { MyDialog } from "./MyDialog";
import { MyDrawer } from "./MyDrawer";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { states } from "@/constants/states";
import type { Measures } from "@/models/Measures";
import { checkEmpty } from "@/utils/checkEmpty";
import { useEffect, useMemo, useState } from "react";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";

export function AddInterface({
  isOpen,
  onOpenChange,
  save,
  //
  Weight = "",
  Fat = "",
  Water = "",
  Muscles = "",
  MetabolicAge = "",
  Bones = "",
  VisceralFat = "",
}: {
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  save: (item: Records) => void;
  //
  Weight?: string;
  Fat?: string;
  Water?: string;
  Muscles?: string;
  MetabolicAge?: string;
  Bones?: string;
  VisceralFat?: string;
}) {
  //
  const initValues = useMemo(
    () => ({
      [states.Weight]: Weight,
      [states.Fat]: Fat,
      [states.Water]: Water,
      [states.Muscles]: Muscles,
      [states.MetabolicAge]: MetabolicAge,
      [states.Bones]: Bones,
      [states.VisceralFat]: VisceralFat,
    }),
    [Weight, Fat, Water, Muscles, MetabolicAge, Bones, VisceralFat]
  );
  //
  const [values, setValues] = useState<Measures>(initValues);
  //
  const isDesktop = useMediaQuery<boolean>("(min-width: 768px)");
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: values,
  });
  //
  useEffect(() => {
    if (!isOpen) {
      Object.values(states).forEach((state) => {
        setValue(state, initValues[state]);
      });
      setValues(initValues);
    }
  }, [initValues, isOpen, setValue]);
  //
  const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);
  const [isWarning, setIsWarning] = useState<boolean>(false);
  //
  const forForms = {
    isOpen,
    onOpenChange: (state: boolean) => onOpenChange(state),
    title: "Введи свои параметры",
    footer: (
      <>
        <Button type="submit" form="addForm">
          Сохранить
        </Button>
        <Button
          onClick={() => {
            onOpenChange(false);
          }}
          variant="outline"
          className="mb-2"
        >
          Отмена
        </Button>
      </>
    ),
  };
  const desktopContent = {
    ...forForms,
    content: (
      <DesktopContent
        register={register}
        values={values}
        isWarning={isWarning}
      />
    ),
  };
  const mobileContent = {
    ...forForms,
    content: (
      <MobileContent
        register={register}
        values={values}
        setValue={setValue}
        setValues={setValues}
      />
    ),
  };
  //
  //
  return (
    <>
      <form
        id="addForm"
        onSubmit={handleSubmit((d) => {
          if (checkEmpty(d)) {
            setIsWarningOpen(true);
            setIsWarning(true);
          } else {
            save(d as Records);
            onOpenChange(false);
            setIsWarning(false);
          }
          setValues(d);
        })}
      >
        {isDesktop && <MyDialog {...desktopContent} />}
        {!isDesktop && <MyDrawer {...mobileContent} />}
      </form>
      {/*

      */}
      <MyDialog
        {...{
          isOpen: isWarningOpen,
          onOpenChange: setIsWarningOpen,
          title: "Ошибка",
          description: "Надо заполнить все поля! Хорошо?!",
          footer: (
            <Button onClick={() => setIsWarningOpen(false)}>Хорошо!</Button>
          ),
        }}
      />
    </>
  );
}
