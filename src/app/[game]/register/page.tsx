"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from 'next/navigation'
import Loader from "@/components/Loader";
interface Member {
    name: string;
    email: string;
}
interface User {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    college: string;
    mode: string;
    transactionId?: string;
    transactionVerified: boolean;
    isAdmin: boolean;
}
export default function register() {
    const [user, setUser] = useState<User | null>(null);
    const { data, status } = useSession();
    const [teamName, setTeamName] = useState<string>("");
    const [members, setMembers] = useState<Member[]>([]);
    const [leaderIdCard, setLeaderIdCard] = useState<File | null>(null);
    const [loader, setLoader] = useState(false);
    const params = useParams<{
        [x: string]: any; tag: string; item: string
    }>()
    const game = params.game;
    const formattedString = game.replace(/_/g, ' ');

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

    const handleAddMember = () => {
        if (members.length != 0) {
            const lastMember = members[members.length - 1];
            if (lastMember.name && lastMember.email) {
                setMembers([...members, { name: "", email: "" }]);
            } else {
                alert("Please fill in the previous member's name and email.");
            }
        } else {
            setMembers([...members, { name: "", email: "" }]);
        }
    };
    const register = async (e: Event) => {
        try {
            e.preventDefault();
            setLoader(true);

            // Create a formData
            const formData = new FormData();
            formData.append("teamName", teamName);
            formData.append("eventName", formattedString);
            formData.append("userId", user?._id || "");
            formData.append("members", JSON.stringify(members));
            formData.append("collegeId", leaderIdCard!);

            // Send formData to server
            const response = await axios.post("/api/team", formData);

            // Add toaster and handle response
            toast.success("Team registered Successfully");

        } catch (error: any) {
            toast.error(`${error.response.data.message}`);
            console.log(error);
        } finally {
            setLoader(false);
        }

    };
    const handleMemberChange = (
        index: number,
        key: keyof Member,
        value: string
    ) => {
        const updatedMembers = [...members];
        updatedMembers[index][key] = value;
        setMembers(updatedMembers);
    };

    const handleLeaderIdCardChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setLeaderIdCard(file);
        }
    };

    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <div className="reg">
                    <div className="container">
                        <div>
                            <h1 className="form-title">Registration for {formattedString}</h1>
                        </div>
                        <div className="details">

                            <form action="#"
                                // @ts-ignore
                                onSubmit={register}>
                                <div className="main-user-info">
                                    <div className="user-input-box">
                                        <label htmlFor="fullName">Team Name</label>
                                        <input
                                            required
                                            type="text"
                                            id="teamName"
                                            placeholder="Team Name"
                                            value={teamName}
                                            onChange={(e) =>
                                                setTeamName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="user-input-box">
                                        <label htmlFor="leaderName">
                                            Leader Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            id="leaderName"
                                            name="leaderName"
                                            value={user?.fullName}
                                            placeholder="Enter Username"
                                            disabled
                                        />
                                    </div>
                                    <div className="user-input-box">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={user?.email}
                                            placeholder="Enter Email"
                                            disabled
                                        />
                                    </div>
                                    <div className="user-input-box">
                                        <label htmlFor="phoneNumber">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={user?.phone}
                                            placeholder="Enter Phone Number"
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        {members.map((member, index) => (
                                            <>
                                                <div key={index}>
                                                    <div className="user-input-box">
                                                        <label htmlFor="leaderName">
                                                            Member Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Member Name"
                                                            value={member.name}
                                                            onChange={(e) =>
                                                                handleMemberChange(
                                                                    index,
                                                                    "name",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="user-input-box">
                                                        <label htmlFor="leaderName">
                                                            Member Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder="Member Email"
                                                            value={member.email}
                                                            onChange={(e) =>
                                                                handleMemberChange(
                                                                    index,
                                                                    "email",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>

                                    <div className="file">
                                        <label htmlFor="phoneNumber">
                                            Leader's Id card
                                        </label>
                                        <div className="user-input-boxx">
                                            <input
                                                required
                                                type="file"
                                                id="leaderIdCard"
                                                onChange={handleLeaderIdCardChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-submit-btn">
                                        <div>
                                            <input
                                                className="register"
                                                type="submit"
                                                value="Register"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={handleAddMember}
                                                className="button-9"
                                            >
                                                {" "}
                                                Add member{" "}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="lastline">
                            <p >
                                * all members should be registered in the website
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
