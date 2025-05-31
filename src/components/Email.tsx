"use client";

import { useEffect, useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import styles from "./Email.module.scss";
import { useEmailForm } from "..//app/hooks/useEmailForm";

export default function Email() {
  const [isVisible, setIsVisible] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const { email, setEmail, status, handleSubmit } = useEmailForm();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  useEffect(() => {
    const onResize = () => {
      setIsVisible(window.innerWidth >= 768);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className={styles.mailButtonContainer}>
      {isVisible && !showForm && (
        <button
          className={styles.mailButton}
          aria-label="Email us"
          onClick={() => setShowForm(true)}
        >
          <MdEmail size={34} />
        </button>
      )}

      <div
        className={`${styles.formContainer} ${showForm ? styles.show : ""}`}
        ref={formRef}
      >
        {showForm && (
          <>
            <form onSubmit={handleSubmit} className={styles.emailForm}>
              <h3>Enter your email, and we will contact you!</h3>
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
            <button
              className={styles.closeButton}
              aria-label="Close form"
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>
          </>
        )}
      </div>
    </div>
  );
}