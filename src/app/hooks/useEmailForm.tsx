"use client";

import { useState } from "react";

type Errors = {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
};

export function useEmailForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!name.trim()) newErrors.name = "Please enter your name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email address.";
    if (!topic) newErrors.topic = "Please select a topic.";
    if (!message.trim()) newErrors.message = "Please enter your message.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setErrors({});

    if (!validate()) return;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message }),
      });

      if (res.ok) {
        setStatus("Thank you! We will contact you.");
        setName("");
        setEmail("");
        setTopic("");
        setMessage("");
        setErrors({});
      } else {
        setStatus("Error sending email. Please try again later.");
      }
    } catch {
      setStatus("Error sending email. Please try again.");
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    topic,
    setTopic,
    message,
    setMessage,
    status,
    errors,
    handleSubmit,
  };
}
