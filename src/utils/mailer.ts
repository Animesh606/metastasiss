import { contactUsMail, resetPasswordMail, teamRegistrationSuccessMail, userRegistrationSuccessMail, verificationMail } from "@/emails"
import eventSubmitionMail from "@/emails/eventSubmitionMail";
import nodemailer from "nodemailer";

export interface mailInfo {
    email: string;
    fullName: string;
    teamName?: string;
    eventName?: string;
    url?: string;
    message?: string;
    leadUser?: any;
    members?: any[];
    sumittedBy:any;
    link:string;
}

const transporter = nodemailer.createTransport({
    host: process.env.DOMAIN_NAME,
    port: 587,
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
});

const sendEmail = async (mailType: string, mailInfo: mailInfo) => {
    try {
        if(mailType === "verifyEmail"){
            return await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: mailInfo.email,
                subject: "Verify Your Email",
                html: verificationMail(mailInfo)
            });
        }
        if(mailType === "resetPassword"){
            return await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: mailInfo.email,
                subject: "Reset Your Password",
                html: resetPasswordMail(mailInfo)
            });
        }
        if(mailType === "contactUs"){
            return await transporter.sendMail({
                from: mailInfo.email,
                to: process.env.MAIL_USER,
                subject: "Contact/Feedback Meta-stasiss",
                html: contactUsMail(mailInfo)
            });
        }
        if(mailType === "userRegistration"){
            return await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: mailInfo.email,
                subject: "Welcome to Meta-stasiss",
                html: userRegistrationSuccessMail(mailInfo)
            });
        }
        if(mailType === "teamRegistration"){
            return await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: mailInfo.email,
                subject: `Welcome ${mailInfo.teamName} to ${mailInfo.eventName}`,
                html: teamRegistrationSuccessMail(mailInfo)
            });
        }
        if(mailType === "eventSubmition"){
            return await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: mailInfo.email,
                subject: `Submission successfull for ${mailInfo.eventName}`,
                html: eventSubmitionMail(mailInfo)
            });
        }
    } catch (error: any) {
        console.log("Error in sending email: ", error.message);
    }
};

export default sendEmail;