import { FC } from "react";
import { ICategory } from "../../models/ICategory";
import s from "./Navbar.module.scss";

type NavbarProps = {
  categories: ICategory[];
  activeCategory: number;
  setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar: FC<NavbarProps> = (props) => {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    setCurrentPage,
    search,
    setSearch,
  } = props;

  return (
    <div className={s.top}>
      <ul className={s.tags}>
        {categories.map((category, i) => {
          const className = activeCategory === i ? s.active : "";
          return (
            <li
              key={category.name}
              className={className}
              onClick={() => {
                setActiveCategory(i);
                setCurrentPage(1);
              }}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
      <input
        className={s.searchInput}
        placeholder="Пошук по назві"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export { Navbar };
