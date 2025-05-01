"use client";

import { useRef, useEffect } from "react";
import styles from "./AboutUs.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        imageRef.current,
        { x: isMobile ? 0 : "-100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      ).fromTo(
        textRef.current,
        { x: isMobile ? 0 : "100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "<0.2"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageClip} ref={imageRef}>
          <Image
            src="/about.jpg"
            alt="About our company"
            fill
            className={styles.image}
            priority
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        </div>
        <div className={styles.text} ref={textRef}>
          <h2>About us</h2>
          <p>
            There are many variations of Lorem Ipsum available, but the majority
            have suffered alteration in some form, by injected humor...
          </p>
        </div>
      </div>
    </section>
  );
}
