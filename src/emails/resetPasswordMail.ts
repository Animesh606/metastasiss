import { mailInfo } from "@/utils/mailer";

const resetPasswordMail = ({ fullName, url }: mailInfo) => {
    return `
        ${fullName} click the link to reset password ${url}
    `;
};

export default resetPasswordMail;