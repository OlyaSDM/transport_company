"use client";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.line}></p>
        <h1 className={styles.title}>
          Modern logistics <span>and</span> smart control
        </h1>
        {/* <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa mollis
          quam adipiscing fames nec. Non viverra etiam nulla pellentesque cursus
          facilisi nibh enim.
        </p> */}
        {/* <button className={styles.button}>Discover more</button> */}
      </div>
    </section>
  );
}
