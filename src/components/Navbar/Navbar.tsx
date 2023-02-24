import { FC } from "react";
import s from "./Navbar.module.scss";

const Navbar: FC = () => {
  return (
    <div className={s.top}>
      <ul className={s.tags}>
        <li className={s.active}>Всі</li>
        <li>Гори</li>
        <li>Море</li>
        <li>Архітектура</li>
        <li>Міста</li>
      </ul>
      <input className={s.searchInput} placeholder="Пошук по назві" />
    </div>
  );
};

export { Navbar };
