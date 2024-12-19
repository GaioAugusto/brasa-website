import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, subject, message } = req.body;

    if (!firstName || !email || !subject || !message) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use your email service
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: `Contact Form Submission: ${subject}`,
        text: `
          From: ${firstName} ${lastName}
          Email: ${email}
          Subject: ${subject}

          Message:
          ${message}
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Failed to send email. Try again later." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
