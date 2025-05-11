"use client";

import { useState } from "react";
import styles from "./Footer.module.scss";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(""); 
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("Thank you! We will contact you.");
        setEmail(""); 
      } else {
        setStatus("Error sending. Try again later.");
      }
    } catch {
      setStatus("Error sending. Please try again.");
    }
  };

  return (
    <footer className={styles.footer} id="contacts">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.block}>
          <h2>About</h2>
          <p>
            Our mission is to empower logistics businesses with intelligent
            tools, from driver workplace automation to AI-powered process
            analytics and virtual managers.
          </p>
        </div>

        <div className={styles.block}>
          <h2>Contact</h2>
          <address>
            <p>
              <FaMapMarkerAlt aria-hidden="true" /> Lorem Ipsum Street
            </p>
            <p>
              <FaPhoneAlt aria-hidden="true" />{" "}
              <a
                href="tel:+88883888888"
                aria-label="Call us at +888 88 388 88 88"
              >
                +888 88 388 88 88
              </a>
            </p>
            <p>
              <MdEmail aria-hidden="true" />{" "}
              <a
                href="mailto:info@example.com"
                aria-label="Email us at info@example.com"
              >
                info@example.com
              </a>
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="WhatsApp" role="link">
                <FaWhatsapp />
              </a>
              <a href="#" aria-label="Telegram" role="link">
                <FaTelegramPlane />
              </a>
            </div>
          </address>
        </div>

        <div className={styles.block}>
          <form onSubmit={handleSubmit} id="contacts">
            <label htmlFor="email" className="sr-only">
              Your email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-describedby="emailHelp"
            />
            <button type="submit">Send</button>
            {status && (
              <p className={styles.status} aria-live="assertive">
                {status}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </footer>
  );
}
