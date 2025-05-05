"use client";

import { useState } from 'react';
import styles from './Footer.module.scss';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaTelegramPlane, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('Thank you! We will contact you.');
        setEmail('');
      } else {
        setStatus('Error sending. Try again later.');
      }
    } catch (error) {
      setStatus('Error sending.');
    }
  };

  return (
    <footer id="contacts" className={styles.footer}>
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <section className={styles.info}>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000 years old.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </section>

        <section className={styles.contact}>
          <h2 className={styles.foot}>Contact</h2>
          <address>
            <div><FaMapMarkerAlt /> <span>Lorem Ipsum street</span></div>
            <div><FaPhoneAlt /> <a href="tel:+88883888888">+888 88 388 88 88</a></div>
            <div className={styles.icons}>
              <a href="mailto:info@example.com" aria-label="Email"><MdEmail /></a>
              <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
              <a href="#" aria-label="Telegram"><FaTelegramPlane /></a>
            </div>
          </address>
        </section>

        <section className={styles.form}>
          <h2 className={styles.foot}>More information</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.send}>Send</button>
            {status && <p className={styles.status}>{status}</p>}
          </form>
        </section>
      </motion.div>
    </footer>
  );
}
