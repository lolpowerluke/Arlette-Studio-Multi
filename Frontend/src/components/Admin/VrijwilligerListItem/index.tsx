import type { User } from "@/types";
import s from "./style.module.css";

interface Props {
  user: User;
}

export default function VrijwilligerListItem({ user }: Props) {
  return (
    <div className={s.listItem}>
      <div className={s.left}>
        <img src={user.img || "/assets/emptyProfilePicture.svg"} />
        <div className={s.firstName}>
          <span>Naam</span>
          <span>{user.firstName}</span>
        </div>
        <div className={s.lastName}>
          <span>Achternaam</span>
          <span>{user.lastName}</span>
        </div>
        <div className={s.code}>
          <span>Code</span>
          <span>{user.code}</span>
        </div>
      </div>
      <div className={s.right}>
        <div className={s.edit}>
          <img src="/assets/editIcon.svg" />
        </div>
        <div className={s.delete}>
          <img src="/assets/deleteIcon.svg" />
        </div>
      </div>
    </div>
  )
}
