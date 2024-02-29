import { mailInfo } from "@/utils/mailer";

const teamRegistrationSuccessMail = ({ teamName, eventName, fullName }: mailInfo) => {
    return `
        ${fullName} is successfully Registratered in ${eventName} with team ${teamName}.
    `;
};

export default teamRegistrationSuccessMail;