import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <nav className={styles.container}>
      <h3 className={styles.logo}>Github Search</h3>

      <span>
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/favourites">Favourites</Link>
      </span>
    </nav>
  );
};
export default Navigation;
