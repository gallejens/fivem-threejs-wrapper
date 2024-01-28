import { FC } from "react";

import styles from "./ui.module.scss";

export const UI: FC = () => {
  return (
    <div className={styles.ui}>
      <button type='button' className={styles.button}>
        E
      </button>
    </div>
  );
};
