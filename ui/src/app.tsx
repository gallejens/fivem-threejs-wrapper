import { NUIComms } from "@shared/types/nui-comms";
import { useRenderCount, useWindowSize } from "@uidotdev/usehooks";
import { FC, useEffect, useRef } from "react";
import { nuiComms } from "./lib/NuiComms";

import "./app.scss";

export const App: FC = () => {
  const renderCount = useRenderCount();
  const windowSize = useWindowSize();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MessageEvent<NUIComms.EventBody>) => {
      const event = e.data;
      switch (event.action) {
        case "pos": {
          const { x, y } = event.data;
          const [xPx, yPx] = [
            x * (windowSize.width ?? 0),
            y * (windowSize.height ?? 0),
          ];
          boxRef.current!.style.transform = `translate(${xPx}px, ${yPx}px)`;
          break;
        }
      }
    };

    window.addEventListener("message", handler);

    nuiComms.request("ready");

    return () => {
      window.removeEventListener("message", handler);
    };
  }, [windowSize]);

  useEffect(() => {
    console.log(`Rendercount: ${renderCount}`);
  }, [renderCount]);

  return (
    <div className='wrapper'>
      <div className='box' ref={boxRef} />
    </div>
  );
};
