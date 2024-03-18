import { mailInfo } from "@/utils/mailer";

const teamRegistrationSuccessMail = ({ teamName, eventName, fullName, leadUser, members }: mailInfo) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Email Template</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .header {
                padding-bottom: 20px;
                text-align: center;
            }

            .logo img {
                width: 100px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
            }
            .header {
                padding: 40px 0 30px 0;
                text-align: center;
                background-color: #f8f8f8;
            }
            h1 {
                font-size: 24px;
                color: #333333;
            }
            .content {
                padding: 40px 30px;
                background-color: #ffffff;
            }
            p, ul {
                font-size: 16px;
                color: #333333;
                line-height: 1.5;
            }
            strong {
                font-weight: bold;
            }
            .footer {
                padding: 20px 30px;
                background-color: #333333;
                color: #ffffff;
            }
            .footer p {
                font-size: 14px;
                line-height: 1.5;
            }
        </style>
    </head>
    <body>
        <div class="container">
        <div class="header">
        <div class="logo">
            <img
                src="https://www.metastasiss.co.in/_next/image?url=%2FMetastasis.png&w=128&q=75"
                alt="Meta-stasiss"
            />
        </div>
       </div>
            <div class="header">
                <h1>Dear ${fullName},</h1>
            </div>
            <div class="content">
                <p>You are successfully registered for the "<strong>${eventName} </strong>".</p>
                <p>Your team details are as follows:</p>
                <ul>
                    <li><strong>Leader Name:</strong> "${leadUser.fullName}"</li>
                    <li><strong>Team Name:</strong> "${teamName}"</li>
                    <li><strong>Team Members:</strong>
                        <ul>
                            <!-- Loop through team members array and generate list items for each member -->
                            ${members?.map(member => `<li>Name: ${member.name}, Email: ${member.email}</li>`).join('')}
                        </ul>
                    </li>
                </ul>
                <p>See you at the event. All the very best!</p>
            </div>
            <div class="footer">
                <p>Best regards,<br>Metastasiss</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export default teamRegistrationSuccessMail;