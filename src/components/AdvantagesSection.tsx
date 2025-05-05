"use client";

import { motion } from "framer-motion";
import styles from "./AdvantagesSection.module.scss";
import Image from "next/image";
import Head from "next/head";

const advantages = [
  {
    id: 1,
    text: "Guaranteed safety and on-time delivery",
    description:
      "With a modern fleet and experienced drivers, we ensure reliable freight transportation, meeting all deadlines and safety requirements — for both one-time and regular shipments.",
  },
  {
    id: 2,
    text: "Digital optimization through a driver app",
    description:
      "Our proprietary mobile app helps drivers plan smart routes based on traffic, receive maintenance reminders, navigate safely, and stay in constant contact with dispatchers — boosting productivity and minimizing risks on the road.",
  },
  {
    id: 3,
    text: "Flexible terms tailored to your business",
    description:
      "We offer personalized solutions for each client — from one-time deliveries to long-term partnerships. Transparent pricing, responsive support, and adaptability to your industry’s specifics ensure a smooth and efficient collaboration.",
  },
];

export default function AdvantagesSection() {
  return (
    <>
      <Head>
        <title>Our Advantages</title>
        <meta
          name="description"
          content="Key benefits of our transportation service: reliability, experience, and modern approach."
        />
      </Head>

      <section id="advantages" className={styles.advantagesSection}>
        <div className={styles.overlay}></div>
        <Image
          src="/ad.webp"
          alt="Truck background"
          fill
          style={{ objectFit: "cover" }}
          quality={90}
          className={styles.bgImage}
          priority
        />

        <div className={styles.content}>
          <h2>
            <span className={styles.line} /> Advantages
          </h2>
          <div className={styles.items}>
            {advantages.map((adv, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={adv.id}
                  className={`${styles.item} ${
                    isLeft ? styles.left : styles.right
                  }`}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.3,
                    ease: "easeOut",
                  }}
                >
                  <div className={styles.row}>
                    <div className={styles.number}>{adv.id}</div>
                    <div>
                      <p className={styles.text}>{adv.text}</p>
                      <p className={styles.description}>{adv.description}</p>
                    </div>
                  </div>
                  <motion.div
                    className={styles.line}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.3 + 0.2,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
