"use client";

import styles from "./HeaderFooter.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.rightContent}>
        <div className={styles.arrows}>
          <div className={styles.arrow} />
          <div className={styles.arrow} />
        </div>
        <div className={styles.topRightSquares}>
          <div className={styles.squareWhite} />
          <div className={styles.squareWhite} />
          <div className={styles.squareBlue} />
        </div>
      </div>
    </header>
  );
}
