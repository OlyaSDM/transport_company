"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ModalContactForm from "../components/ModalContactForm";
import styles from "./Header.module.scss";

const menuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

type MenuItem = {
  text: string;
  link?: string;
  isModal?: boolean;
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { text: "About us", link: "/#aboutus" },
    { text: "Services", link: "/#services" },
    { text: "Advantages", link: "/#advantages" },
    { text: "Contacts", link: "/#contacts" },
    { text: "Write to us", isModal: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 150;
      const ids = ["aboutus", "services", "advantages", "contacts"];
      let current: string | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }

      setActiveId(current);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1322);
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

  const isDarkText = pathname === "/serviceone" || pathname === "/servicetwo";
  const isBlueHeader = ["/serviceone", "/servicetwo"].includes(pathname);

  const headerClassNames = [
    styles.header,
    isScrolled && !isDarkText && styles.scrolled,
    isDarkText && styles.darkText,
    isBlueHeader && styles.blueHeader,
  ]
    .filter(Boolean)
    .join(" ");

  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    const id = link.split("#")[1];
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", link);
    }
    closeMenu();
  };

  return (
    <>
      <header className={headerClassNames}>
        <Link href="/" className={styles.logo} aria-label="Homepage">
          <Image
            src="/images/logo.webp"
            alt="Trucking Company"
            width={150}
            height={50}
            decoding="async"
            priority
            style={{ width: "150px", height: "50px", color: "transparent" }}
            sizes="(max-width: 768px) 60px, 150px"
          />
        </Link>
        {!isMenuOpen && isMobile && (
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
          {isMobile && isMenuOpen && (
            <>
              <motion.div
                className={styles.closeMenu}
                onClick={closeMenu}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.4 }}
                role="button"
                aria-label="Close navigation menu"
              >
                <span className={styles.closeLine}></span>
                <span className={styles.closeLine}></span>
              </motion.div>
              <motion.nav
                className={styles.nav}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                role="navigation"
              >
                <ul>
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={index}
                      variants={menuItemVariants}
                      custom={index}
                    >
                      {item.isModal ? (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                            closeMenu();
                          }}
                        >
                          {item.text}
                        </a>
                      ) : (
                        <a
                          href={item.link}
                          onClick={(e) => handleLinkClick(e, item.link!)}
                          className={
                            activeId === item.link?.split("#")[1]
                              ? styles.activeLink
                              : ""
                          }
                        >
                          {item.text}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
        {!isMobile && (
          <nav className={styles.nav}>
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.isModal ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                      }}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <a
                      href={item.link}
                      onClick={(e) => handleLinkClick(e, item.link!)}
                      className={
                        activeId === item.link?.split("#")[1]
                          ? styles.activeLink
                          : ""
                      }
                    >
                      {item.text}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
      <ModalContactForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
