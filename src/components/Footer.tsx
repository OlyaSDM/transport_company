"use client";
import { useEmailForm } from "../app/hooks/useEmailForm";
import styles from "./Footer.module.scss";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
export default function Footer() {
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
<footer className={styles.footer} id="contacts">
   <motion.div
   className={styles.container}
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.6 }}
   >
   <div className={styles.block}>
      <h2>About</h2>
      <p>
         Our mission is to empower logistics businesses with intelligent
         tools, from driver workplace automation to AI-powered process
         analytics and virtual managers.
      </p>
   </div>
   <div className={styles.block}>
      <h2>Contact</h2>
      <address>
         <p>
            <MdEmail aria-hidden="true" />
            {" "}
            <a
               href="mailto:info@kimmywheels.com"
               aria-label="Email us at info@kimmywheels.com"
               >
            info@kimmywheels.com
            </a>
         </p>
      </address>
   </div>
   <div className={styles.block}>
      <form onSubmit={handleSubmit} noValidate>
         <h2>Contact us</h2>
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
         <button type="submit">Send</button>
         {status && (
         <p className={styles.status} aria-live="assertive">
            {status}
         </p>
         )}
      </form>
   </div>
   </motion.div>
</footer>
);
}