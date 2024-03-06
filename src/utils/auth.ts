import connectDB from "@/utils/db.connect";
import User from "@/models/user.model";

import CredentialsProvider, {
    CredentialInput,
} from "next-auth/providers/credentials";
import { DefaultSession, Session, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";

interface Credentials {
    email?: string;
    password?: string;
}

interface CustomUser {
    _id: string;
    email: string;
    fullName: string;
    password: string;
    isCorrectPassword: Function;
}
interface SessionCallbackParams {
    session?: { user?: { _id: string } };
    token?: { _id: string };
}

interface JWTCallbackParams {
    user?: { _id: string };
    token?: { _id: string };
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            } as Record<string, CredentialInput>,

            async authorize(credentials: Credentials | undefined) {
                if (
                    !credentials ||
                    !credentials.email ||
                    !credentials.password
                ) {
                    return null;
                }

                const { email, password } = credentials;

                try {
                    await connectDB();
                    let user: CustomUser | null = null;
                    user = await User.findOne({ email, isVerified: true });
                    if (!user) {
                        return null;
                    }

                    const passwordsMatch: boolean =
                        await user.isCorrectPassword(password);

                    if (!passwordsMatch) {
                        return null;
                    }

                    return {
                        _id: user._id,
                        name: user.fullName,
                        email: user.email
                    } as any;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
        maxAge: 4 * 24 * 60 * 60, //30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        async session({
            session,
            token,
        }: SessionCallbackParams): Promise<Session | DefaultSession> {
            if (session?.user && token?._id) {
                (session.user as { _id: string })._id = token._id;
            }
            return session as Session | DefaultSession;
        },

        async jwt({ user, token }: JWTCallbackParams): Promise<JWT> {
            if (user) {
                (token as { _id: string })._id = user._id;
            }
            return token as JWT;
        },
    },

    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: "/login"
    },
};
