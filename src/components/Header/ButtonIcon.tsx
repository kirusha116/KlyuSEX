import { AlignJustify, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export function ButtonIcon({ isIconCross }: { isIconCross: boolean }) {
  const cross = useRef(null);
  const align = useRef(null);
  const [isCross, setIsCross] = useState(isIconCross);
  useEffect(() => {
    setIsCross(isIconCross);
  }, [isIconCross]);
  return (
    <>
      <SwitchTransition>
        <CSSTransition
          key={isCross ? "cross" : "align"}
          nodeRef={isCross ? cross : align}
          timeout={250}
          classNames={{
            enter: "scale-y-[0]",
            enterActive: "scale-y-[1] duration-250",
            enterDone: "scale-y-[1]",
            exitActive: "scale-y-[0] duration-250",
            exitDone: "scale-y-[0]",
          }}
          mountOnEnter
          unmountOnExit
        >
          <div ref={isCross ? cross : align}>
            {isCross ? (
              <X color="white" className="size-8" />
            ) : (
              <AlignJustify color="white" className="size-8" />
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}
