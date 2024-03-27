"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import router from "next/router";
import { useParams } from 'next/navigation'
interface User {
    _id: string;
    fullName: string;
    submission: string;
}
interface Team {
    teamId: string;
    teamName: string;

}
export default function Submit() {
    const [user, setUser] = useState<User | null>(null);
    const [team, setTeam] = useState<Team | null>(null);
    const [game, setGame] = useState<string>("");
    const { data, status } = useSession();
    const [loader, setLoader] = useState(true);
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
    let capitalizedFullName: string = capitalizedWords.join(' ');

    useEffect(() => {
        const getUserData = async () => {
            try {
                if (status === "authenticated" && data.user) {
                    const resp = await axios.get(
                        // @ts-ignore
                        `/api/user/profile?userId=${data?.user?._id}`
                    );

                    if (resp.status === 200) {
                        if (resp.data.user.participations) {
                            try {
                                const teamss = resp.data.user.participations;
                                const respp = await axios.get(
                                    // @ts-ignore
                                    `/api/user/team?userId=${data?.user?._id}&game=${games}`);


                                if (respp.status === 200) {
                                    setTeam(respp.data.team)

                                }

                            }
                            finally {

                            }
                        }

                    }
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
            finally {
                setLoader(false);
            }
        };
        getUserData();
    }, [status]);
    const registers = async (e: any) => {
        try {
            e.preventDefault();
            setLoader(true);
            const datas = {
                teamId: team?.teamId,
                submission: game,
                submittedBy:data?.user?.name,
            }

            const response = await axios.post("/api/update/team", datas);

            // Add toaster and handle response
            toast.success("submission successfull");

        } catch (error: any) {
            toast.error(`${error.response.data.message}`);

        } finally {
            setLoader(false);
        }
    };
    return (<>
        {loader ? (
            <Loader />
        ) : (
            <div className="reg">
                <div className="containerss">
                    <div>
                        <h1 className="form-title"> Submission for {capitalizedFullName} </h1>
                    </div>
                    <div className="detailss">

                        <form action="#"
                            // @ts-ignore
                            onSubmit={registers}>
                            <div className="main-user-info">
                                <div className="user-input-box">
                                    <label htmlFor="fullName">Team Name</label>
                                    <input
                                        required
                                        type="text"
                                        id="teamName"
                                        placeholder="Team Name not found"
                                        value={team?.teamName}
                                        disabled
                                    />
                                </div>
                                <div className="user-input-box">
                                    <label htmlFor="leaderName">
                                        Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        id="leaderName"
                                        name="leaderName"
                                        //@ts-ignore
                                        value={data?.user?.name}
                                        disabled
                                    />
                                </div>
                                <div className="user-input-box">
                                    <label htmlFor="leaderName">
                                        Submit your Game
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        id="game"
                                        name="game"
                                        value={game}
                                        placeholder="Enter drive link"
                                        onChange={(e) => setGame(e.target.value)}
                                    />
                                </div>
                                <div className="form-submit-btnn">
                                    <div className="butt">
                                        <input
                                            className="register"
                                            type="submit"
                                            value="Register"
                                            disabled={team === null}

                                        />
                                    </div>
                                </div>
                               
                            </div>
                        </form>

                    </div>
                    <div className="lastline">
                                    <p >
                                        &#42; Export your game from your developement software and upload the HTML file to your google drive folder.
                                        Enter the link here
                                    </p>
                                </div>
                </div>
            </div>
        )}

    </>)
}