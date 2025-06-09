import { useState } from "react";
import type { Labels } from "@/models/Labels";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/Header/Menu";
import { ButtonIcon } from "@/components/Header/ButtonIcon";
import { Plus } from "lucide-react";
import { useMediaQuery } from "@mui/material";

export function Header({
  mainText,
  setSelectedState,
  labels,
  openModal,
}: {
  mainText: string;
  setSelectedState: (state: string) => void;
  labels: Labels;
  openModal: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isIconCross, setIsIconCross] = useState<boolean>(false);
  const isDesktop = useMediaQuery<boolean>("(min-width: 768px)");

  return (
    <header>
      <div className="relative flex m-auto justify-between  mt-5">
        <Button
          className="h-12 w-12 rounded-[50%]"
          onClick={
            !isMenuOpen
              ? (e) => {
                  setIsMenuOpen(true);
                  setIsIconCross(true);
                  e.stopPropagation();
                }
              : undefined
          }
        >
          <ButtonIcon isIconCross={isIconCross} />
        </Button>

        {isMenuOpen && (
          <Menu
            onClose={() => setIsMenuOpen(false)}
            labels={labels}
            onSelect={(state: string) => setSelectedState(state)}
            changeButtonIcon={() => setIsIconCross(false)}
          />
        )}

        {isDesktop && (
          <h1 className="text-primary text-center text-5xl leading-12">{mainText}</h1>
        )}

        <Button className="h-12 w-12 rounded-[50%]" onClick={openModal}>
          <Plus className="size-8" />
        </Button>
      </div>
      {!isDesktop && (
        <h1 className="text-primary text-5xl leading-12 text-center mb-3">{mainText}</h1>
      )}
    </header>
  );
}
