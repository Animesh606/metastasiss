import { mailInfo } from "@/utils/mailer";

const userRegistrationSuccessMail = ({ fullName }: mailInfo) => {
    return `
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Meta-stasiss Platform!</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-image: url('https://www.metastasiss.co.in/_next/image?url=%2FMetastasis.png&w=128&q=75'); background-size: cover; background-position: center; color: #333; padding: 20px; margin: 0;">
    
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: rgba(255, 255, 255, 0.9); border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #008080;">Welcome to Metastasis Platform!</h1>
      
      <p>Hi ${fullName},</p>
      
      <p>Congratulations on successfully completing your registration on Metastasis! 🎉</p>
      
      <p>We encourage you to take full advantage of all the tools and opportunities available to you. Don't hesitate to reach out if you have any questions or need assistance along the way. Our team is here to support you every step of the way.</p>
      
      <p>Once again, welcome to Metastasis! We're excited to see what you'll accomplish and the valuable contributions you'll make to our community.</p>
      
      <p>Best regards,<br>Meta-stasis</p>
    </div>
    
    </body>
    </html>
    `;
};

export default userRegistrationSuccessMail;