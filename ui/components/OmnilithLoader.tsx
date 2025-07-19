"use client";

import { useEffect, useState } from "react";
import styles from "./OmnilithLoader.module.css";

export default function OmnilithLoader({ phrase = "Aligning vectors" }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.sigil} />
      <p className={styles.text}>
        {phrase}
        {".".repeat(dots)}
      </p>
    </div>
  );
}
