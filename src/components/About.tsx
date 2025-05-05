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
        { x: 0, opacity: 1, duration: 1.6, ease: "power3.out" }
      ).fromTo(
        textRef.current,
        { x: isMobile ? 0 : "100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 1.6, ease: "power3.out" },
        "<0.2"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageClip} ref={imageRef}>
          <Image
            src="/about.jpeg"
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
            We are a modern transportation company that blends years of
            logistics experience with cutting-edge digital innovation. Our
            mission is not just to move freight, but to build a seamless, safe,
            and efficient environment for everyone involved in delivery.{" "}
            <br></br>
            Every day, we craft smart routes where timing, reliability, and
            attention to detail are more than words — they’re our core values.
            But we don’t stop there: we’re also developing our own mobile app to
            make drivers’ lives easier and more connected. From order tracking
            to live dispatcher chat — everything in one place, always within
            reach. <br></br>
            We connect cities, countries, and technologies — so you can trust
            the journey from departure to destination.
          </p>
        </div>
      </div>
    </section>
  );
}
