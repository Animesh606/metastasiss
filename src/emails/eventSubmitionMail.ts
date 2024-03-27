import { mailInfo } from "@/utils/mailer";

const eventSubmitionMail = ({ teamName, eventName, link, sumittedBy }: mailInfo) => {
    return `
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submission successfull 🎉🎉</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-image: url('https://www.metastasiss.co.in/_next/image?url=%2FMetastasis.png&w=128&q=75'); background-size: cover; background-position: center; color: #333; padding: 20px; margin: 0;">
    
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: rgba(255, 255, 255, 0.9); border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #008080;">Welcome to Meta-stasiss Platform!</h1>
      
      <p>Hi ${teamName},</p>
      
      <p>I am delighted to inform you that your work  has been successfully received under the event ${eventName}. I extend my heartfelt congratulations on your creative and innovative concept, which has shown great potential for becoming a successful and impactful event! </p>
      
     
      <p>Submission details</p>
      <p>Submittedby - ${sumittedBy}</p>
      <p>Link - ${link}</>
      <p>You can update your link before the last date .</p>
      <p> We're excited to see what you'll accomplish and the valuable contributions you'll make to our community.</p>
      
      <p>Best regards,<br>Meta-stasis</p>
    </div>
    
    </body>
    </html>
    `;
};

export default eventSubmitionMail;