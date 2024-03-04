import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const verifyJWT = () => {
    try {
        const token = cookies().get("access_token")?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.SECRET_KEY!);
        return decodedToken;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export default verifyJWT;