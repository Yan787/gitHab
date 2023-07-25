import React, { FC, useState } from "react";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { IRepo } from "../../models/models";
import styles from "./RepoCard.module.scss";

type RepoCardProps = {
  repo: IRepo;
};

const RepoCard: FC<RepoCardProps> = ({ repo }) => {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite(repo.html_url);
    setIsFav(true);
  };

  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo.html_url);
    setIsFav(false);
  };

  return (
    <div className={styles.container}>
      <a href={repo.html_url} target="_blank">
        <h2 className={styles.name}>{repo.full_name}</h2>
        <p>
          Forks: <span className={styles.text}>{repo.forks}</span>
          Watchers: <span className={styles.text}>{repo.watchers}</span>
        </p>
        <p className={styles.description}>{repo?.description}</p>

        {!isFav && (
          <button className={styles.btnAdd} onClick={addToFavourite}>
            Add
          </button>
        )}

        {isFav && (
          <button className={styles.btnRemove} onClick={removeFromFavourite}>
            Remove
          </button>
        )}
      </a>
    </div>
  );
};

export default RepoCard;
