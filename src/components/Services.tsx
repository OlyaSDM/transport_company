"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import styles from "./ServicesBlock.module.scss";

export default function ServicesBlock() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (typeof window === "undefined") return;

    const services = sectionRef.current?.querySelectorAll(`.${styles.service}`);
    if (!services || services.length === 0) return;

    services.forEach((service) => {
      const image = service.querySelector(`.${styles.imageWrapper}`);
      const h3 = service.querySelector("h3");
      const p = service.querySelector("p");

      if (!image || !h3 || !p) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: service,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        image,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }
      )
        .fromTo(
          h3,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        )
        .fromTo(
          p,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="services"
      className={styles.services}
      ref={sectionRef}
      aria-labelledby="services-title"
    >
      <h2 id="services-title" className={styles.title}>
        <span className={styles.line} />
        Services
      </h2>
      <p className={styles.p}>
        We help logistics companies scale with tech-driven solutions and ensure
        cargo gets where it needs to go — fast and efficiently.
      </p>

      <div className={styles.service}>
        <div className={styles.imageWrapper}>
<Image
  src="/images/s2.webp"
  alt="Smart Logistics Software Service"
  className={styles.image}
  fill
  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 600px"
  priority
  decoding="async"
/>

        </div>
        <div className={styles.text}>
          <h3>Smart Logistics Software</h3>
          <p>
            Build, automate, and manage with intelligent systems made by
            logistics experts.
          </p>
          <Link
            href="/serviceone"
            className={styles.button}
            aria-label="Read more about Smart Logistics Software"
          >
            Read more
          </Link>
        </div>
      </div>

      <div className={`${styles.service} ${styles.reversed}`}>
        <div className={styles.imageWrapper}>
<Image
  src="/images/s1.webp"
  alt="Freight Services in the EU"
  className={styles.image}
  fill
  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 600px"
  priority
  decoding="async"
/>

        </div>
        <div className={styles.text}>
          <h3>Freight Services in the EU</h3>
          <p>We deliver across Europe using our own tech-optimized fleet.</p>
          <Link
            href="/servicetwo"
            className={styles.button}
            aria-label="Read more about Freight Services in the EU"
          >
            Read more
          </Link>
        </div>
      </div>
    </section>
  );
}
