import React from "react";
import { useAppSelector } from "../../hooks/redux";
import styles from "./FavouritesPage.module.scss";

const FavouritesPage = () => {
  const { favourites } = useAppSelector((state) => state.github);

  if (favourites.length === 0)
    return <p className={styles.empty}>No items! ._.</p>;

  return (
    <div className={styles.container}>
      <ul>
        {favourites.map((f) => (
          <li key={f} className={styles.wrapper}>
            <a href={f} target="_blank">
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPage;
