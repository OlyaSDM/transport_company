"use client";

import { useEmailForm } from "..//app/hooks/useEmailForm";
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
  const { email, setEmail, status, handleSubmit } = useEmailForm();

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
              If you have any questions, we will contact you
            </label>
            <input
              id="email"
              type="text"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
