import { FC } from "react";
import s from "./Pagination.module.scss";

const Pagination: FC = () => {
  return (
    <ul className={s.pagination}>
      <li>1</li>
      <li className={s.active}>2</li>
      <li>3</li>
    </ul>
  );
};

export { Pagination };
