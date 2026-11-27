import VrijwilligerListItem from "@/components/Admin/VrijwilligerListItem";
import s from "./style.module.css";
import type { User } from "@/types";
import { useEffect, useState } from "react";

export default function VrijwilligerOverzicht() {
  const [uList, setUList] = useState<User[]>([]);
  useEffect(() => {
    setUList([
      { firstName: "Lukas", lastName: "Van Heddegem sldksldklskdskldk", code: "038237" },
      { firstName: "Kiara", lastName: "Geuten", code: "038238" },
      { firstName: "Joachim", lastName: "Gautama", code: "038239" },
      { firstName: "Razvan", lastName: "Tanase", code: "038240" },
    ]);
  }, []);
  return (
    <div className={s.overview}>
      <h1 className={s.title}>Overzicht Vrijwilligers</h1>
      <div className={s.listParent}>
        <h2 className={s.subtitle}>Bestaande Accounts</h2>
        <div className={s.list}>
          <div className={s.addBtn}>

          </div>
          {uList.map((u) => (
            <VrijwilligerListItem user={u} />
          ))}
        </div>
      </div>
    </div>
  )
}
