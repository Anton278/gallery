import { FC } from "react";
import { ICategory } from "../../models/ICategory";
import s from "./Navbar.module.scss";

type NavbarProps = {
  categories: ICategory[];
  activeCategory: number;
  setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
};

const Navbar: FC<NavbarProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className={s.top}>
      <ul className={s.tags}>
        {categories.map((category, i) => {
          const className = activeCategory === i ? s.active : "";
          return (
            <li
              key={category.name}
              className={className}
              onClick={() => setActiveCategory(i)}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
      <input className={s.searchInput} placeholder="Пошук по назві" />
    </div>
  );
};

export { Navbar };
