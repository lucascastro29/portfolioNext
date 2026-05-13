import { useEffect, useRef, useState } from "react";
import { AnimatedModel } from "../models/AnimatedModel";
import style from "../styles/styles.module.css";

const variantToColor: Record<string, string> = {
  info: "#3498db",
  danger: "#e74c3c",
  warning: "#f39c12",
  success: "#2ecc71",
  default: "#2ecc71",
};

const Animatedbar = (props: AnimatedModel) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const color = variantToColor[props.variant] || variantToColor.default;
  const width = visible ? `${props.now}%` : "0%";

  return (
    <div
      ref={ref}
      className={style.skillBar}
      role="progressbar"
      aria-valuenow={props.now}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={style.skillBarFill}
        style={{
          width,
          backgroundColor: color,
        }}
      >
        <span className={style.skillBarLabel}>{props.now}%</span>
      </div>
    </div>
  );
};

export default Animatedbar;
