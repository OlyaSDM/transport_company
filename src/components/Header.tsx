'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Обработчик скролла
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Обработчик изменения размера экрана
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Закрытие меню с задержкой
  const toggleMenu = () => {
    if (!hasInteracted) setHasInteracted(true);

    if (menuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setMenuOpen(false);
      }, 400); // Задержка для анимации
    } else {
      setMenuOpen(true);
    }
  };

  // Обработка плавной прокрутки
  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    toggleMenu();
  };

  // Логика для скрытия меню при изменении размера экрана
  useEffect(() => {
    if (windowWidth > 1080 && menuOpen) { // Если экран шире 1080px и меню открыто
      setMenuOpen(false); // Закрываем меню
    }
  }, [windowWidth]);

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
        className={`${styles.nav} 
          ${hasInteracted && menuOpen ? styles.open : ""} 
          ${hasInteracted && isClosing ? styles.closing : ""}`}
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
