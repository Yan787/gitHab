import React, { useEffect, useState } from "react";
import RepoCard from "../../components/RepoCard/RepoCard";
import { useDebounce } from "../../hooks/debounce";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../../store/github/github.api";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);

  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3 /* при каких условиях не делать запрос */,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    /* fetchRepos функция - загружает по запросу необходимые данные */
    useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (userName: string) => () => {
    fetchRepos(userName);
    setDropdown(false);
  };

  return (
    <div>
      {isError && <div className={styles.err}>Something went wrong...</div>}

      <div className={styles.container}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {dropdown && (
          <ul className={styles.dropdown}>
            {isLoading && <p>Loading...</p>}

            {data?.map((user) => (
              <li
                key={user.id}
                onClick={clickHandler(user.login)}
                className={styles.login}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.repositories}>
          {areReposLoading && (
            <p className={styles.loading}>Repos are loading...</p>
          )}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
