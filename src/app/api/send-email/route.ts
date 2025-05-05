import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Site Form" <${process.env.SMTP_USER}>`,
      to: 'client@example.com', // Заменить на почту заказчика
      subject: 'Запрос с сайта',
      text: `Пользователь оставил email: ${email}`,
    })

    return NextResponse.json({ message: 'Email sent' })
  } catch (error) {
    console.error('SendMail Error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
