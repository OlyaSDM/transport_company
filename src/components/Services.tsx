"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import styles from "./ServicesBlock.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesBlock() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll(`.${styles.service}`);

    items?.forEach((item, index) => {
      const direction = index % 2 === 0 ? -100 : 100;

      gsap.fromTo(
        item,
        { opacity: 0, x: direction },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section className={styles.services} ref={sectionRef}>
      <h2 className={styles.title}>
        <span className={styles.line} />
        Services
      </h2>
      <div className={styles.service}>
        <div className={styles.imageWrapper}>
          <Image
            src="/1.jpg"
            alt="Service 1"
            fill
            className={styles.image}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 90vw, 750px"
          />
        </div>
        <div className={styles.text}>
          <h3>
            Where can I get some
            <br />
            can I get some
          </h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Link href="/service1" className={styles.button}>
            Learn More
          </Link>
        </div>
      </div>
      <div className={`${styles.service} ${styles.reversed}`}>
        <div className={styles.imageWrapper}>
          <Image
            src="/2.jpg"
            alt="Service 1"
            fill
            className={styles.image}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 90vw, 750px"
          />
        </div>
        <div className={styles.text}>
          <h3>
            Where can I get some
            <br />
            can I get some
          </h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Link href="/service2" className={styles.button}>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
