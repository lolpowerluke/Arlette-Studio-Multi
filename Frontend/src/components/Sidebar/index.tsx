import SidebarFilter from "../SidebarFilter";
import type { FilterGroup, Selected } from "../../store/products";
import s from "./style.module.css";

interface Props {
  groups: FilterGroup[];
  selected: Selected;
  onToggle: (groupId: string, option: string) => void;
  onReset: () => void;
}

export default function Sidebar({ groups, selected, onToggle, onReset }: Props) {
  return (
    <div className={s.sidebar}>
      {groups.map((g) => (
        <SidebarFilter
          key={g.id}
          title={g.title}
          filters={g.options}
          selected={selected[g.id] ?? []}
          onToggle={(option) => onToggle(g.id, option)}
        />
      ))}
      <button className={s.reset} onClick={onReset}>Reset</button>
    </div>
  )
}
