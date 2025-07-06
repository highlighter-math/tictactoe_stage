"use client";

import styles from "./HeaderFooter.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottomLeftSquares}>
        <div className={styles.squareRed} />
        <div className={styles.squareWhite} />
        <div className={styles.squareWhite} />
      </div>
      <div className={styles.bottomRightText}>開成強動</div>
    </footer>
  );
}
