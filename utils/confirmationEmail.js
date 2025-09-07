import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, studentId } = req.body;

    if (!firstName || !lastName || !email || !studentId) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.VERIFICATION_EMAIL_USER,
          pass: process.env.VERIFICATION_EMAIL_PASS,
        },
      });

      // 1. Send to BRASA's inbox
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New user tried to sign up: ${firstName} ${lastName}`,
        text: `
          From: ${firstName} ${lastName}
          Email: ${email}
          Student number: ${studentId}

          Message:
            A verification email was sent to the user.
        `,
      };

      await transporter.sendMail(adminMailOptions);

      // 2. Send confirmation back to the user
      const confirmationMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "We received your message ✔",
        text: `
          Hi ${firstName},

          Thanks for reaching out! We have received your request to sign up for BRASA Card!

          "Please click on this link to verify your email"

          
          Best,
          BRASA at UofT
        `,
      };

      await transporter.sendMail(confirmationMailOptions);

      return res.status(200).json({ message: "Emails sent successfully!" });
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
