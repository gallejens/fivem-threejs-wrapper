import { FC, useEffect } from "react";
import { nuiActions } from "./lib/NuiActions";

export const App: FC = () => {
  useEffect(() => {
    const handler = (...args: unknown[]) => {
      console.log("receive message");
      console.log(args);
    };

    window.addEventListener("message", handler);

    nuiActions.request("ready");

    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  return <p>Test</p>;
};
