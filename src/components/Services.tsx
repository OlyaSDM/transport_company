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
    <section id="services" className={styles.services} ref={sectionRef}>
      <h2 className={styles.title}>
        <span className={styles.line} />
        Services
      </h2>
      <p className={styles.p}>
      We help logistics companies scale with tech-driven solutions and ensure cargo gets where it needs to go — fast and efficiently.
          </p>
      <div className={styles.service}>
        <div className={styles.imageWrapper}>
          <Image
            src="/s2.webp"
            alt="Service 1"
            className={styles.image}
            fill
            sizes="(max-width: 768px) 100vw, 750px"
          />
        </div>
        <div className={styles.text}>
          <h3>Smart Logistics Software</h3>
          <p>
          Build, automate, and manage with intelligent systems made by logistics experts.
          </p>
          <Link href="/service1" className={styles.button}>
            Read more
          </Link>
        </div>
      </div>

      <div className={`${styles.service} ${styles.reversed}`}>
        <div className={styles.imageWrapper}>
          <Image
            src="/s1.webp"
            alt="Service 2"
            className={styles.image}
            fill
            sizes="(max-width: 768px) 100vw, 750px"
          />
        </div>
        <div className={styles.text}>
          <h3>
          Freight Services in the EU
          </h3>
          <p>
          We deliver across Europe using our own tech-optimized fleet.
            {/* <p>Smart route planning considering traffic and current road conditions.

            Real-time monitoring of vehicle status, including technical data and timely reminders for checks.

            Intuitive navigation with tips on safe routes and hazardous zones.

            Feedback and support for quick resolution of any issues and rapid communication with the dispatcher.

            Reporting system for analyzing travel distance, fuel consumption, and other key data.</p> */}
          </p>
          <Link href="/service2" className={styles.button}>
            Read more
          </Link>
        </div>
      </div>
    </section>
  );
}
