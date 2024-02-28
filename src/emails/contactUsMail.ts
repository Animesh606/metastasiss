import { mailInfo } from "@/utils/mailer";

const contactUsMail = ({ fullName, email, message}: mailInfo) => {
    return `
        senderName: ${fullName} <br/>
        senderEmail: ${email} <br/>
        senderMessage: ${message}
    `;
};

export default contactUsMail;