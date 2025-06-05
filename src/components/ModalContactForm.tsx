"use client";
import styles from "./ModalContactForm.module.scss";
import { useEmailForm } from "../app/hooks/useEmailForm";
import { motion, AnimatePresence } from "framer-motion";
export default function ModalContactForm({
isOpen,
onClose,
}: {
isOpen: boolean;
onClose: () => void;
}) {
const {
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
} = useEmailForm();
return (
<AnimatePresence>
   {isOpen && (
   <motion.div
   className={styles.backdrop}
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   exit={{ opacity: 0 }}
   onClick={onClose}
   >
   <motion.div
   className={styles.modal}
   initial={{ y: "-50%", opacity: 0 }}
   animate={{ y: "0%", opacity: 1 }}
   exit={{ y: "-50%", opacity: 0 }}
   transition={{ duration: 0.4 }}
   onClick={(e) => e.stopPropagation()}
   >
   <button
      className={styles.close}
      onClick={onClose}
      aria-label="Close form"
      >
   ×
   </button>
   <h2>Contact Us</h2>
   <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <input
         id="name"
         type="text"
         placeholder="Your name"
         value={name}
         onChange={(e) => setName(e.target.value)}
      className={errors.name ? styles.errorInput : ""}
      aria-invalid={!!errors.name}
      aria-describedby="name-error"
      />
      {errors.name && (
      <p id="name-error" className={styles.errorText}>
         {errors.name}
      </p>
      )}
      <input
         id="email"
         type="email"
         placeholder="Your email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
      className={errors.email ? styles.errorInput : ""}
      aria-invalid={!!errors.email}
      aria-describedby="email-error"
      />
      {errors.email && (
      <p id="email-error" className={styles.errorText}>
         {errors.email}
      </p>
      )}
      <select
         id="topic"
         value={topic}
         onChange={(e) =>
         setTopic(e.target.value)}
         className={errors.topic ? styles.errorInput : ""}
         aria-invalid={!!errors.topic}
         aria-describedby="topic-error"
         >
         <option value="">Choose topic</option>
         <option value="general">General questions</option>
         <option value="financial">Financial questions</option>
      </select>
      {errors.topic && (
      <p id="topic-error" className={styles.errorText}>
         {errors.topic}
      </p>
      )}
      <textarea
         id="message"
         placeholder="Your message"
         value={message}
         onChange={(e) =>
      setMessage(e.target.value)}
      rows={4}
      className={errors.message ? styles.errorInput : ""}
      aria-invalid={!!errors.message}
      aria-describedby="message-error"
      />
      {errors.message && (
      <p id="message-error" className={styles.errorText}>
         {errors.message}
      </p>
      )}
      <button className={styles.btn} type="submit">
      Send
      </button>
      {status && (
      <p className={styles.status} aria-live="assertive">
         {status}
      </p>
      )}
   </form>
   </motion.div>
   </motion.div>
   )}
</AnimatePresence>
);
}