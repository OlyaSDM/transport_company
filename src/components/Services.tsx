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

      <div className={styles.service}>
        <div className={styles.imageWrapper}>
          <Image
            src="/1.jpg"
            alt="Service 1"
            className={styles.image}
            width={750}
            height={400}
          />
        </div>
        <div className={styles.text}>
          <h3>Transport services for freight shipping</h3>
          <p>
            We offer reliable and efficient transport services for freight
            shipping. Our company has a modern fleet and professional drivers,
            allowing us to guarantee the safety and timeliness of deliveries. We
            provide both one-time and regular shipments on flexible terms,
            taking into account the specific needs of your business or
            individual requirements.
          </p>
          <Link href="/service1" className={styles.button}>
            Read more
          </Link>
        </div>
      </div>

      <div className={`${styles.service} ${styles.reversed}`}>
        <div className={styles.imageWrapper}>
          <Image
            src="/2.jpg"
            alt="Service 2"
            className={styles.image}
            width={750}
            height={400}
          />
        </div>
        <div className={styles.text}>
          <h3>
            We are developing a modern application designed for drivers of
            transportation companies
          </h3>
          <p>
            This solution optimizes drivers' daily work, improving productivity,
            safety, and communication with the central office. <br></br>
            Key features of the app:
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
