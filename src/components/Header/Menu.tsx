import type { Labels } from "@/models/Labels";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

type Style = {
  height: string;
  width: string;
  left: string;
};

export function Menu({
  labels,
  onClose,
  onSelect,
  changeButtonIcon,
}: {
  labels: Labels;
  onClose: () => void;
  onSelect: (state: string) => void;
  changeButtonIcon: () => void;
}) {
  const menu = useRef<HTMLUListElement | null>(null);
  const [style, setStyle] = useState<Style>();

  const onAnimatedClose = () => {
    setStyle({ height: "0px", width: "154px", left: "12px" });
    changeButtonIcon();
    setTimeout(() => {
      onClose();
    }, 500);
  };

  useEffect(() => {
    setStyle({ height: "292px", width: "178px", left: "0px" });
    const handleClick = (e: MouseEvent) => {
      if (menu.current && !menu.current.contains(e.target as HTMLElement)) {
        onAnimatedClose();
      }
    };
    document.addEventListener("click", (e) => handleClick(e));
    return () => {
      document.removeEventListener("click", (e) => handleClick(e));
    };
  }, []);

  return (
    <ul
      ref={menu}
      className={
        "absolute top-[78px] rounded-[12px] text-white text-xl bg-primary overflow-hidden transition-all duration-500 h-0 w-[154px] left-3"
      }
      style={style}
    >
      {Object.entries(labels).map(
        ([state, label]: [state: string, label: string]) => {
          return (
            <li key={state}>
              <Button
                className="w-full h-auto hover:brightness-105 text-lg font-normal whitespace-normal leading-5"
                onClick={() => {
                  onSelect(state);
                  onAnimatedClose();
                }}
              >
                {label}
              </Button>
            </li>
          );
        }
      )}
    </ul>
  );
}
