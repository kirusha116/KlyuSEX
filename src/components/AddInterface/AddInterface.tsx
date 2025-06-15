import type { Records } from "@/models/Records";
import { MyDialog } from "./MyDialog";
import { MyDrawer } from "./MyDrawer";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { states } from "@/constants/states";
import { checkEmpty } from "@/utils/checkEmpty";
import { useEffect, useMemo, useState } from "react";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";
import { formatDate } from "@/utils/formatDate";

export function AddInterface({
  isOpen,
  onOpenChange,
  save,
  isDesktop,
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
  isDesktop: boolean;
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
      date: formatDate(new Date()),
    }),
    [Weight, Fat, Water, Muscles, MetabolicAge, Bones, VisceralFat]
  );
  //
  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: initValues,
  });
  //
  useEffect(() => {
    if (!isOpen) {
      Object.values(states).forEach((state) => {
        setValue(state, initValues[state]);
      });
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
        isWarning={isWarning}
        getValues={getValues}
        setValue={setValue}
      />
    ),
  };
  const mobileContent = {
    ...forForms,
    content: (
      <MobileContent
        register={register}
        getValues={getValues}
        setValue={setValue}
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
