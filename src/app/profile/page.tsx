"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface User {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    mode: string;
    transactionId?: string;
    transactionVerified: boolean;
    isAdmin: boolean;
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const { data, status } = useSession();
    useEffect(() => {
        const getUserData = async () => {
            try {
                if (status === "authenticated" && data.user) {
                    const resp = await axios.get(
                        // @ts-ignore
                        `/api/user/profile?userId=${data?.user?._id}`
                    );
                    if (resp.status === 200) {
                        setUser(resp.data.user);
                    }
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        };
        getUserData();
    }, [status]);
    return (
        <div className="profileContainers">
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src="/avatar.png" alt="akas" />
                    <p>{user?.fullName}</p>
                </div>
                <div>
                    <div>
                        <h4>Email</h4>
                        <p>{user?.email}</p>
                    </div>
                    <div>
                        <h4>College</h4>
                        <p>{user?.college}</p>
                    </div>
                    <div>
                        <h4>Phone</h4>
                        <p>{user?.phone}</p>
                    </div>
                    <div>
                        <h4>Role</h4>
                        <p>{user?.isAdmin ? "Admin" : "user"}</p>
                    </div>
                </div>
            </div>
            {/* <div className="secondpart">
                <Link href="/myorders">My Events</Link> */}
            {/* </div> */}
        </div>
    );
}
