"use client";

import { motion } from "framer-motion";
import styles from "./ServiceOne.module.scss";
import { CheckCircle } from "lucide-react"; 

const features = [
  {
    title: "Optimize Route Planning",
    description:
      "Automatically generate the most efficient delivery routes based on real-time traffic data, delivery time windows, and fuel efficiency.",
  },
  {
    title: "Automate Core Processes",
    description:
      "Reduce manual workload through automation of dispatching, invoicing, cargo tracking, document management, and customer communication.",
  },
  {
    title: "Enhance Visibility & Tracking",
    description:
      "Gain full control over your fleet with GPS-based live tracking, geofencing alerts, and performance monitoring.",
  },
  {
    title: "Smart Data Analytics",
    description:
      "Make informed decisions with powerful dashboards and real-time reports on delivery performance, driver behavior, fuel consumption, and more.",
  },
  {
    title: "Scalable & Customizable",
    description:
      "Our modular system adapts to your business needs and grows with you, whether you're a small carrier or a large logistics provider.",
  },
  {
    title: "Integration-Ready",
    description:
      "Seamlessly connect with your existing ERP, CRM, or third-party logistics systems via secure API integrations.",
  },
  {
    title: "Driver & Client Portals",
    description:
      "Offer convenient access for both drivers and customers through dedicated web or mobile portals.",
  },
];

export default function ServiceOnePage() {
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
            Smart Logistics Software
          </h1>
          <p>
            Build, automate, and manage your logistics operations with
            intelligent solutions designed by industry experts.
          </p>
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
                Developed by professionals with deep expertise in logistics and
                supply chains, our software offers:
              </h2>
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

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our team of logistics and software experts work together to create
              systems that save you time, reduce costs, and improve transparency
              across the entire supply chain.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
