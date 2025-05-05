"use client";

import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const menuVariants = {
  hidden: {
    x: "100%",
    opacity: 0,
    scale: 0.95,
    filter: "blur(4px)",
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    scale: 0.97,
    filter: "blur(4px)",
    transition: {
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const closeIconVariants = {
  hidden: { rotate: -90, opacity: 0, scale: 0.6 },
  visible: {
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
  },
  exit: {
    rotate: 90,
    opacity: 0,
    scale: 0.6,
    transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] },
  },
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleResize = () => setIsMobile(window.innerWidth < 1080);

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const menuItems = ["About us", "Services", "Advantages", "Contacts"];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>LOGO</div>

      {isMobile && !isMenuOpen && (
        <motion.div
          className={styles.burger}
          onClick={() => setIsMenuOpen(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </motion.div>
      )}

      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            className={styles.closeMenu}
            onClick={closeMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={closeIconVariants}
          >
            <span className={styles.closeLine}></span>
            <span className={styles.closeLine}></span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.nav
            className={styles.nav}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <ul>
              {menuItems.map((text, index) => (
                <motion.li
                  key={index}
                  variants={menuItemVariants}
                  custom={index}
                >
                  <ScrollLink
                    to={text.toLowerCase().replace(" ", "")}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={closeMenu}
                  >
                    {text}
                  </ScrollLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {!isMobile && (
        <nav className={styles.nav}>
          <ul>
            {menuItems.map((text, index) => (
              <li key={index}>
                <ScrollLink
                  to={text.toLowerCase().replace(" ", "")}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  {text}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
