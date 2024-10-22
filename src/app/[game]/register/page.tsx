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
export default function Register() {
    const [user, setUser] = useState<User | null>(null);
    const { data, status } = useSession();
    const [teamName, setTeamName] = useState<string>("");
    const [members, setMembers] = useState<Member[]>([]);
    const [leaderIdCard, setLeaderIdCard] =useState<string>("");
    const [loader, setLoader] = useState(false);
    const params = useParams<{
        [x: string]: any; tag: string; item: string
    }>()
    const games = params.game;
    let words: string[] = games.split('_');

    // Capitalize the first letter of each word
    let capitalizedWords: string[] = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  
    // Join the capitalized words back together
    let formattedString: string = capitalizedWords.join(' ');

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
            const myForm = new FormData();
            myForm.set("teamName", teamName);
            myForm.set("eventName", formattedString);
            myForm.set("members", JSON.stringify(members));
            myForm.set("userId", user?._id || "");
            myForm.set("leaderIdCard", leaderIdCard);
            myForm.set("submission"," ");
            // Send formData to server
            const config = { headers: { "Content-Type": "multipart/form-data" } };
            // console.log("before sending data")
         
            const response = await axios.post("/api/team",myForm,config);
            // console.log("after sending data")
      
            toast.success("Team registered Successfully"); 

        } catch (error: any) {
            // console.log(error);
            toast.error(`${error.response.data.message}`);
         
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

    // const handleLeaderIdCardChange = (
    //     event:any
    // ) => {
    //     const file = event.target.files && event.target.files[0];
    //     const limit=2000;
       
    //     if (file) {
         
    //         if((file.size/1024)>limit)
    //         {
               
    //             if( event.target.files)
    //             setLeaderIdCard(null);
    //             toast.error(`size is greater than 2MB please select another file`)
    //         }
    //         else
    //         {
               
    //                 const reader = new FileReader();
              
    //                 reader.onload = () => {
    //                   if (reader.readyState === 2) {
    //                     // Cast reader.result to string
    //                     setLeaderIdCard(reader.result);
    //                   }
    //                 };
    //                 reader.readAsDataURL(event.target.files[0]);
    //               } 
    //         }
    //     }


    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <div className="reg">
                    <div className="containers">
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
                                            Leader&apos;s Id card (give the drive link of your id card )
                                        </label>
                                        <div className="user-input-box">
                                            <input
                                                required
                                                placeholder="Drive link"
                                                name="leaderIdCard"
                                                type="text"
                                                id="leaderIdCard"
                                                onChange={(e) =>
                                                    setLeaderIdCard(e.target.value)
                                                }
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
                            &#42; all members should be registered in the website
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};
