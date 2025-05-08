"use client";

import { useRef, useEffect } from "react";
import styles from "./AboutUs.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Head from "next/head"; 

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
        {
          x: isMobile ? 0 : "-100%", 
          opacity: 0, 
        },
        {
          x: 0, 
          opacity: 1, 
          duration: 1.6,
          ease: "power3.out",
        }
      ).fromTo(
        textRef.current,
        {
          x: isMobile ? 0 : "100%", 
          opacity: 0, 
        },
        {
          x: 0, 
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
        },
        "<0.2" 
      );
    });

    return () => ctx.revert(); 
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content="Learn about our logistics company providing freight transportation across Europe" />
        <meta name="keywords" content="logistics, freight transportation, Europe, digital solutions, fleet management" />
        <meta name="robots" content="index, follow" />
        <title>About Us | Logistics Company</title>
      </Head>
      <section id="aboutus" className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.imageClip} ref={imageRef}>
            <Image
              src="/about.webp"
              alt="About our logistics company providing freight transportation across Europe"
              fill
              className={styles.image}
              priority
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
          <div className={styles.text} ref={textRef}>
            <h2>About Us</h2>
            <p>
              We are a technology-driven logistics company providing fast and secure
              freight transportation across Europe. With our own fleet of vehicles, 
              we ensure timely and efficient deliveries while leveraging advanced digital solutions
              to improve our operations.
            </p>
            <p>
              Our mission is to empower logistics businesses with intelligent tools, from driver 
              workplace automation to AI-powered process analytics and virtual managers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
