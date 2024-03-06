"use client";
import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LoggedinUser } from "./loginuser";
// import axios from "axios";
import { useSession } from "next-auth/react";

// interface User {
//     // Define the properties of the user object
//     email: string;
//     name: string;
//     role: string;
// }

export const Navbar = () => {
    const [hover, setHover] = useState(false);
    // const [loggedin, setLoggedIn] = useState(false);
    // const [user, setUser] = useState<User | null>(null);
    const { status } = useSession();
    // useEffect(() => {
    //     const getUser = async () => {
    //         try {
    //             const response = await axios.get("/api/user/auth");
    //             if (response.data) {
    //                 setLoggedIn(true);
    //                 const { email, fullName } = response.data.user;
    //                 setUser({ email, name: fullName, role: "user" });
    //             }
    //         } catch (error) {
    //             console.log("Error getting user data", error);
    //             setLoggedIn(false);
    //         }
    //     };
    //     getUser();
    // }, [loggedin]);
    return (
        <>
            <div className="heade">
                <div className="logo">
                    <div className="img">
                        <Image
                            className="Image"
                            src="/Metastasis.png"
                            alt={""}
                            width={100}
                            height={100}
                        ></Image>
                    </div>
                </div>
                <div className="links">
                    <ul className={` ${hover ? "navactive" : "nav"}`}>
                        <li>
                            <a href="/home">Home</a>
                        </li>
                        <li>
                            <a href="/events">Events</a>
                        </li>
                        <li>
                            <a href="/contact">Contact</a>
                        </li>
                        <li>
                            <a
                                href="/login"
                                className="loggins"
                                style={{ display: (status === "authenticated") ? "none" : "block" }}
                            >
                                Login
                            </a>
                        </li>
                    </ul>
                    <div></div>
                </div>
                <div
                    className=" mobile"
                    onClick={() => {
                        setHover(!hover);
                    }}
                >
                    {" "}
                    <FontAwesomeIcon icon={faBars} className="icons" />
                </div>
            </div>
            <LoggedinUser/>
        </>
    );
};
