import s from "./style.module.css";

interface Props {
  title: string;
  filters: { name: string, amount: number }[];
  selected: string[];
  onToggle: (option: string) => void;
}

export default function SidebarFilter({ title, filters, selected, onToggle }: Props) {
  let checkboxID = title.replaceAll(" ", "").toLowerCase();
  return (
    <div className={s.filter}>
      <input type="checkbox" hidden id={checkboxID} className={s.controller} />
      <label htmlFor={checkboxID}>
        <span>{title}</span>
        <div className={s.chevron}></div>
      </label>
      <div className={s.optionList}>
        <div className={s.inner}>
          {filters.map((f) => {
            const checked = selected.includes(f.name);
            return (
              <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                key={f.name}
                className={`${s.option} ${checked ? s.checked : ""} ${f.amount === 0 ? s.empty : ""}`}
                onClick={() => onToggle(f.name)}
              >
                <span className={s.optionLeft}>
                  <span className={s.box} />
                  <span className={s.optionName}>{f.name}</span>
                </span>
                <span className={s.optionAmount}>{f.amount}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  )
}
