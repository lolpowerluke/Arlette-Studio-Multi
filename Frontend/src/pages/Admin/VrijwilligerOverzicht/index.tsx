import VrijwilligerListItem from "@/components/Admin/VrijwilligerListItem";
import s from "./style.module.css";
import type { User } from "@/types";

export default function VrijwilligerOverzicht() {
  const u: User = { firstName: "Yes", lastName: "No", code: "038237" }
  return (
    <>
      <h1>Overzicht Vrijwilligers</h1>
      <h2>Bestaande Accounts</h2>
      <div className={s.list}>
        {/* add button */}
        <VrijwilligerListItem user={u} />
      </div>
    </>
  )
}
