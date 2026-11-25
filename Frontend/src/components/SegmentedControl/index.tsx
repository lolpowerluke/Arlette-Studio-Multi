import type { CSSProperties, ReactNode } from "react";
import s from "./style.module.css";

export interface SegmentedOption<T extends string | number> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

interface SegmentedControlProps<T extends string | number> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  "aria-label"?: string;
}

export default function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  className,
  "aria-label": ariaLabel,
}: SegmentedControlProps<T>) {
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  const style = {
    "--count": options.length,
    "--index": activeIndex,
  } as CSSProperties;

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`${s.root} ${className ?? ""}`}
      style={style}
    >
      <span className={s.indicator} aria-hidden="true" />
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={o.disabled}
            className={`${s.option} ${active ? s.active : ""}`}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
