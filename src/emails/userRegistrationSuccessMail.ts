import { mailInfo } from "@/utils/mailer";

const userRegistrationSuccessMail = ({ fullName }: mailInfo) => {
    return `
        ${fullName} is Registered Successfully.
    `;
};

export default userRegistrationSuccessMail;