import { useState } from "react";

export function useEmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    if (!email) {
      setStatus("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("Thank you! We will contact you.");
        setEmail("");
      } else {
        setStatus("Error sending email. Please try again later.");
      }
    } catch {
      setStatus("Error sending email. Please try again.");
    }
  };

  return {
    email,
    setEmail,
    status,
    handleSubmit,
  };
}
