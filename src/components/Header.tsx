"use client";
import { useState, useEffect } from "react";
import Link from "next/link";  // Импортируем Link
import styles from "./Header.module.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>LOGO</div>
      <div className={styles.burger} onClick={toggleMenu}>
        <span
          className={menuOpen ? styles.burgerLineOpen : styles.burgerLine}
        ></span>
        <span
          className={menuOpen ? styles.burgerLineOpen : styles.burgerLine}
        ></span>
        <span
          className={menuOpen ? styles.burgerLineOpen : styles.burgerLine}
        ></span>
      </div>
      <nav
        className={`${styles.nav} ${menuOpen ? styles.open : ""} ${
          isClosing ? styles.closing : ""
        }`}
      >
        <ul>
          <li>
            <Link href="/" onClick={toggleMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={toggleMenu}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/services" onClick={toggleMenu}>
              Advantages
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={toggleMenu}>
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
