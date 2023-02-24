import { FC } from "react";
import s from "./Collection.module.scss";

type CollectionProps = {
  name: string;
  images: string[];
};

const Collection: FC<CollectionProps> = ({ name, images }: any) => {
  return (
    <div className={s.collection}>
      <img className={s.collection__big} src={images[0]} alt="Item" />
      <div className={s.collection__bottom}>
        <img className={s.collection__mini} src={images[1]} alt="Item" />
        <img className={s.collection__mini} src={images[2]} alt="Item" />
        <img className={s.collection__mini} src={images[3]} alt="Item" />
      </div>
      <h4>{name}</h4>
    </div>
  );
};

export { Collection };
