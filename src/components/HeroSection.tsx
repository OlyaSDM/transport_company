"use client";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  return (
    <section className={styles.hero} role="banner">
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.line} aria-hidden="true"></p>
        <h1 className={styles.title}>
          Modern logistics <span>and</span> smart control
        </h1>
      </div>
    </section>
  );
}
