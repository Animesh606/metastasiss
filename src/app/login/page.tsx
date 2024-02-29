"use client"
import React, { Fragment, useEffect, useRef, useState } from "react";
import Link from 'next/link';
import "./page.css"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons/faEnvelope";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useRouter} from "next/navigation";
import { toast } from 'react-hot-toast';
export default function login() {
    const login = useRef<HTMLDivElement | null>(null);
    const signin = useRef<HTMLDivElement | null>(null);
    const logsintab = useRef<HTMLDivElement | null>(null);
    const logintab = useRef<HTMLDivElement | null>(null);
    const registerTab = useRef<HTMLDivElement | null>(null);
    const switcherTab = useRef<HTMLButtonElement | null>(null);
    const [loginemail, setLoginemail] = useState("");
    const [loginpassword, setLoginpassword] = useState("");
    const [log, setLog] = useState(true);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        college: "",
        ph: "",
        password: "",
    });
    const { name, email, password, college, ph } = user;
    const router = useRouter();
    const registerSubmit = async(e: any) => {
        try {
            e.preventDefault();
            setLoading(true);
            toast.success('You did it!');
            console.log(user);
            const response = await axios.post("/api/user/signup", user);
            console.log("Login success", response.data);
            router.push("/profile");
        } catch (error:any) {
            console.log("registration failed");
        } finally{
        setLoading(false);
        }
    }
    const registerDataChange = (e: { target: { name: any; value: any; }; }) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const switchTable = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, tab: string) => {
        console.log("aka")
        if (tab === "login" && switcherTab.current) {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            if (registerTab.current && logintab.current && logsintab.current) {
                registerTab.current.classList.remove("shiftToNeutralForm");
                logintab.current.classList.remove("shiftToLeft");
                logsintab.current.classList.remove("LoginSignin");
                logsintab.current.classList.add("LoginSignin_login");
            }
            if (login.current && signin.current) {
                login.current.classList.remove("sign");
                login.current.classList.add("log");
                signin.current.classList.remove("log");
                signin.current.classList.add("sign");
            }
        }
        if (tab === "register" && switcherTab.current) {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            if (registerTab.current && logintab.current && logsintab.current) {
                registerTab.current.classList.add("shiftToNeutralForm");
                logintab.current.classList.add("shiftToLeft");
                logsintab.current.classList.add("LoginSignin");
                logsintab.current.classList.remove
                    ("LoginSignin_login");
            }
            if (login.current && signin.current) {
                login.current.classList.remove("log");
                login.current.classList.add("sign");
                signin.current.classList.remove("sign");
                signin.current.classList.add("log");
            }
        }
    }

    const loginSubmit = async(e: { preventDefault: () => void; }) => {
        try {
            console.log("submitted");
            e.preventDefault();
            setLoading(true);
            const response = await axios.post("/api/user/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    return (
        <Fragment>

            <div className="LoginSignUpContainer">

                <div className="LoginSignin_login" ref={logsintab}>

                    <div className="head">
                        <div className="login_signup_toggel">
                            <p ref={login} className="log" onClick={(e) => switchTable(e, "login")}>Login</p>
                            <p ref={signin} className="sign" onClick={(e) => switchTable(e, "register")}>Register</p>
                        </div>
                        <button ref={switcherTab} ></button>
                    </div>
                    <form className="loginForm" ref={logintab} onSubmit={loginSubmit}>

                        <div className="loginEmail">
                            <FontAwesomeIcon icon={faEnvelope} className="icon" />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginemail}
                                onChange={(e) => setLoginemail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <FontAwesomeIcon icon={faKey} className="icon" />
                            <FontAwesomeIcon onClick={() => setVisible(!visible)} icon={!visible ? faEye : faEyeSlash} className="eyeicon" />
                            <input
                                type={visible ? "password" : "text"}
                                placeholder="password"
                                required
                                value={loginpassword}
                                onChange={(e) => setLoginpassword(e.target.value)}
                            />
                        </div>
                        <Link href="/forgotpassword">Forget Password ?</Link>
                        <input type="submit" value="Login" className="loginBtn" />
                    </form>
                    <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="signUpName">
                            <FontAwesomeIcon icon={faAddressCard} className="icon" />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpEmail">
                            <FontAwesomeIcon icon={faEnvelope} className="icon" />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={registerDataChange}

                            />
                        </div>
                        <div className="signUpEmail">
                            <FontAwesomeIcon icon={faUniversity} className="icon" />
                            <input
                                type="text"
                                placeholder="College"
                                required
                                name="college"
                                value={college}
                                onChange={registerDataChange}

                            />
                        </div>
                        <div className="signUpEmail">
                            <FontAwesomeIcon icon={faPhone} className="icon" />
                            <input
                                type="tel"
                                placeholder="phone"
                                required
                                name="ph"
                                value={ph}
                                onChange={registerDataChange}
                            // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="signUpPassword">
                            <FontAwesomeIcon icon={faKey} className="icon" />
                            <FontAwesomeIcon onClick={() => setVisible(!visible)} icon={!visible ? faEye : faEyeSlash} className="eyesicon" />
                            <input
                                type={visible ? "password" : "text"}
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}

                            />
                        </div>
                        <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                </div>
            </div>
        </Fragment >
    )
}