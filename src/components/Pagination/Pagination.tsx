import { FC } from "react";
import s from "./Pagination.module.scss";

type PaginationProps = {
  collectionsLength: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  collectionsPerPage: number;
};

const Pagination: FC<PaginationProps> = (props) => {
  const { collectionsLength, collectionsPerPage, currentPage, setCurrentPage } =
    props;

  return (
    <ul className={s.pagination}>
      {Array.from(
        {
          length: Math.ceil(collectionsLength / collectionsPerPage),
        },
        (_, i) => i + 1
      ).map((page) => {
        const className = page === currentPage ? s.active : "";
        return (
          <li
            key={page}
            className={className}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </li>
        );
      })}
    </ul>
  );
};

export { Pagination };
