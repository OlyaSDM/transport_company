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
    import("gsap/TextPlugin").then((TextPlugin) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(TextPlugin);

      if (typeof window === "undefined") return;

      const services = sectionRef.current?.querySelectorAll(`.${styles.service}`);

      if (!services || services.length === 0) return;

      services.forEach((service) => {
        const image = service.querySelector(`.${styles.imageWrapper}`);
        const h3 = service.querySelector("h3");
        const p = service.querySelector("p");

        if (!image || !h3 || !p) return;

        const h3Text = h3.innerHTML;
        const pText = p.innerHTML;

        h3.setAttribute("data-text", h3Text);
        p.setAttribute("data-text", pText);

        h3.innerHTML = "";
        p.innerHTML = "";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: service,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          image,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
        )
          .to(
            h3,
            {
              text: h3Text,
              duration: 0.9,
              ease: "power1.inOut",
            },
            "+=0.2"
          )
          .to(
            p,
            {
              text: pText,
              duration: 1.4,
              ease: "power1.inOut",
            },
            "+=0.1"
          );
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
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
            className={styles.image}
            width={750}
            height={400}
          />
        </div>
        <div className={styles.text}>
          <h3>
            Where can I get some
            <br />
            can I get some
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
            amet
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
            Where can I get some
            <br />
            can I get some
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
            amet..
          </p>
          <Link href="/service2" className={styles.button}>
            Read more
          </Link>
        </div>
      </div>
    </section>
  );
}
