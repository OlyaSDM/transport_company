import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, topic, message } = req.body;

  if (
    !name ||
    typeof name !== "string" ||
    !email ||
    !email.includes("@") ||
    !topic ||
    !message ||
    typeof message !== "string"
  ) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const recipient =
    topic === "financial"
      ? "account@kimmywheels.com"
      : "info@kimmywheels.com";

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: email,
      to: recipient,
      subject: `New ${topic} inquiry from website`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ message: "Error sending email" });
  }
}
