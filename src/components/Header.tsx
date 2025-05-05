"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 1080 && menuOpen) {
      setMenuOpen(false);
      setIsClosing(false);
    }
  }, [windowWidth, menuOpen]);

  const toggleMenu = () => {
    if (menuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setMenuOpen(false);
      }, 400);
    } else {
      setMenuOpen(true);
    }
  };

  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    toggleMenu();
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>LOGO</div>

      <div className={styles.burger} onClick={toggleMenu}>
        <span className={menuOpen ? styles.burgerLineOpen : styles.burgerLine}></span>
        <span className={menuOpen ? styles.burgerLineOpen : styles.burgerLine}></span>
        <span className={menuOpen ? styles.burgerLineOpen : styles.burgerLine}></span>
      </div>

      <nav
        className={`
          ${styles.nav} 
          ${hasMounted && menuOpen ? styles.open : ""} 
          ${hasMounted && isClosing ? styles.closing : ""}
        `}
      >
        <ul>
          <li>
            <Link href="#about" onClick={() => handleSmoothScroll("about")}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="#services" onClick={() => handleSmoothScroll("services")}>
              Services
            </Link>
          </li>
          <li>
            <Link href="#advantages" onClick={() => handleSmoothScroll("advantages")}>
              Advantages
            </Link>
          </li>
          <li>
            <Link href="#contacts" onClick={() => handleSmoothScroll("contacts")}>
              Contacts
            </Link>
          </li>
        </ul>

        <div className={styles.closeMenu} onClick={toggleMenu}>
          <span className={styles.closeLine}></span>
          <span className={styles.closeLine}></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
