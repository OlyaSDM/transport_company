"use client";

import { motion } from "framer-motion";
import styles from "./ServiceTwo.module.scss";
import { CheckCircle } from "lucide-react"; 

const features = [
  {
    title: "Tech-Optimized Fleet",
    description:
      "Our own fleet is equipped with the latest telematics, route optimization tools, and real-time tracking systems to minimize delays and maximize efficiency.",
  },
  {
    title: "Fast & Reliable Transit Times",
    description:
      "Thanks to strategically located hubs and real-time traffic data integration, we ensure fast delivery times while maintaining flexibility in route planning.",
  },
  {
    title: "Sustainable Transport",
    description:
      "Our fleet includes eco-friendly vehicles that meet Euro 6 standards, helping reduce the carbon footprint of your shipments.",
  },
  {
    title: "Cargo Safety & Insurance",
    description:
      "All cargo is handled with care and protected with comprehensive insurance options for added peace of mind.",
  },
  {
    title: "Real-Time Visibility",
    description:
      "Our client portal provides 24/7 shipment tracking, live updates, delivery status, and direct communication with our support team.",
  },
];

export default function ServiceTwoPage() {
  return (
    <section className={styles.all}>
      <div className={styles.service}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className={styles.header}
        >
          <h1>
            <span className={styles.line} />
            Freight Services in the EU
          </h1>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.text}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.3 } },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.header}
            >
              <h2>
                We provide efficient and secure freight services throughout the
                European Union, leveraging our modern fleet and advanced
                logistics technology to ensure timely, transparent, and
                cost-effective delivery of goods.
              </h2>
              <h2>What we offer:</h2>
            </motion.div>
            <div className={styles.features}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={styles.featureItem}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: index * 0.1 }}
                >
                  <CheckCircle size={28} className={styles.icon} />
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
