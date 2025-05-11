"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

const menuVariants = {
  hidden: { x: "100%", opacity: 0, scale: 0.95, filter: "blur(4px)" },
  visible: {
    x: 0, opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    x: "100%", opacity: 0, scale: 0.97, filter: "blur(4px)",
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] }
  }
};

const menuItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
};

export default function Header() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1080);
    };

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

  const isDarkText = pathname === "/serviceone" || pathname === "/servicetwo";
  const isShadow = isDarkText;

  const headerClassNames = `${styles.header}
    ${hasMounted && isScrolled ? styles.scrolled : ""}
    ${isDarkText ? styles.darkText : ""}
    ${hasMounted && isScrolled && isDarkText ? styles.scrolledDarkText : ""}
    ${isShadow ? styles.shadow : ""}
  `;

  return (
    <header className={headerClassNames.trim()} role="banner">
      <div className={styles.logo}>
        <img src="/logo.png" alt="Trucking Company" />
      </div>

      {hasMounted && isMobile && !isMenuOpen && (
        <motion.div
          className={styles.burger}
          onClick={() => setIsMenuOpen(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="button"
          aria-label="Open navigation menu"
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </motion.div>
      )}

      <AnimatePresence>
        {hasMounted && isMobile && isMenuOpen && (
          <motion.div
            className={styles.closeMenu}
            onClick={closeMenu}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4 }}
            role="button"
            aria-label="Close navigation menu"
          >
            <span className={styles.closeLine}></span>
            <span className={styles.closeLine}></span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasMounted && isMobile && isMenuOpen && (
          <motion.nav
            className={styles.nav}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            role="navigation"
            aria-label="Main navigation menu"
          >
            <ul>
              {menuItems.map((text, index) => (
                <motion.li key={index} variants={menuItemVariants} custom={index}>
                  <ScrollLink
                    to={text.toLowerCase().replace(" ", "")}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={closeMenu}
                    aria-label={`Go to ${text}`}
                  >
                    {text}
                  </ScrollLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {hasMounted && !isMobile && (
        <nav className={styles.nav} role="navigation" aria-label="Main navigation menu">
          <ul>
            {menuItems.map((text, index) => (
              <li key={index}>
                <ScrollLink
                  to={text.toLowerCase().replace(" ", "")}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  aria-label={`Go to ${text}`}
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
