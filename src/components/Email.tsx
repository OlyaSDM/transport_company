"use client";

import { useState, useEffect, useRef } from "react";
import { MdEmail } from "react-icons/md";
import styles from "./Email.module.scss";

export default function Email() {
  const [isVisible, setIsVisible] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("");

    if (!email) {
      setStatusMessage("Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage("Thank you! We will contact you soon.");
        setEmail("");
      } else {
        setStatusMessage(data.error || "Error sending. Try again later.");
      }
    } catch {
      setStatusMessage("Error sending. Try again.");
    }
  };

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
        className={`${styles.formContainer} ${
          showForm ? styles.show : ""
        }`}
        ref={formRef}
      >
        {showForm && (
          <>
            <form onSubmit={handleSubmit} className={styles.emailForm}>
              <h3>Enter your email, and we will contact you!</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
              />
              <button type="submit">Submit</button>
              {statusMessage && (
                <p className={styles.statusMessage}>{statusMessage}</p>
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
