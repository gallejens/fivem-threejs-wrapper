import { NUIComms } from "@shared/types/nui-comms";
import { FC, useEffect } from "react";
import { nuiComms } from "./lib/NuiComms";

export const App: FC = () => {
  useEffect(() => {
    const handler = (e: MessageEvent<NUIComms.EventBody>) => {
      const event = e.data;
      switch (event.action) {
        case "coords":
          console.log(
            `Player coords: ${event.data.x}, ${event.data.y}, ${event.data.z}`
          );
          break;
        case "heading":
          console.log(`Player heading: ${event.data}`);
          break;
        case "request":
          nuiComms.request("request", event.data).then(isBool => {
            console.log(`isBool: ${isBool}`);
          });
          break;
      }
    };

    window.addEventListener("message", handler);

    nuiComms.request("ready");

    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  return <p>Test</p>;
};
