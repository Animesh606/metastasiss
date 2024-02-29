import { mailInfo } from "@/utils/mailer";

const verificationMail = ({ fullName, url }: mailInfo) => {
    return `
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Please verify your email with MetaStatiss</title>

                <style>
                    body {
                        font-family: Helvetica, Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f7f7f7;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .container {
                        width: 100%;
                        max-width: 600px;
                        border-collapse: collapse;
                        border: 0;
                        border-spacing: 0;
                        font-family: Arial, Helvetica, sans-serif;
                        background-color: #f7f7f7;
                    }

                    .content {
                        max-width: 600px;
                        margin: auto;
                        padding: 1rem 2rem;
                        text-align: left;
                    }

                    .header {
                        padding-bottom: 20px;
                        text-align: center;
                    }

                    .logo img {
                        width: 100px;
                    }

                    .card {
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                    }

                    h1 {
                        margin: 1rem 0;
                        color: #333333;
                    }

                    p {
                        padding-bottom: 16px;
                        color: #666666;
                    }

                    .btn {
                        padding: 12px 24px;
                        border-radius: 4px;
                        color: #ffffff;
                        background-color: #2b52f5;
                        text-decoration: none;
                        display: inline-block;
                    }

                    .link {
                        color: #2b52f5;
                        text-decoration: underline;
                    }

                    .footer {
                        padding-top: 20px;
                        color: #999999;
                        text-align: center;
                    }
                </style>
            </head>

            <body>
                <table class="container">
                    <tr>
                        <td class="content">
                            <div class="header">
                                <div class="logo">
                                    <img
                                        src="https://www.metastasiss.co.in/_next/image?url=%2FMetastasis.png&w=128&q=75"
                                        alt="Meta-stasiss"
                                    />
                                </div>
                            </div>
                            <div class="card">
                                <h1>Welcome to Meta-stasiss!</h1>
                                <p>Hi ${fullName}, </p>
                                <p>
                                    To activate your account, please verify your email
                                    address:
                                </p>
                                <p>
                                    <a href="${url}" target="_blank" class="btn"
                                        >Verify Email</a
                                    >
                                </p>
                                <p>
                                    If you're unable to click the button above, please
                                    copy and paste the following link into your browser:
                                </p>
                                <p>
                                    <a href="${url}" class="link" target="_blank"
                                        >${url}</a
                                    >
                                </p>
                                <p>
                                    If you didn’t sign up for an account with
                                    Meta-stasiss, you can safely ignore this email.
                                </p>
                                <p>Best regards,<br />The Meta-stasiss Team</p>
                            </div>
                            <div class="footer">
                                <p>
                                    The Meta-stasiss team, AIIMS Guwahati
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;
};

export default verificationMail;
