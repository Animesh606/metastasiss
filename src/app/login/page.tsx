"use client"
import React, { Fragment, useEffect, useRef, useState } from "react";
import Link from 'next/link';
import "./page.css"
export default function login() {
    const logintab = useRef<HTMLDivElement | null>(null);
    const registerTab = useRef<HTMLDivElement | null>(null);
    const switcherTab = useRef<HTMLButtonElement | null>(null);
    const [loginemail, setLoginemail] = useState("");
    const [loginpassword, setLoginpassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        college:"",
        ph:"",
        password: "",
    });
    const { name, email, password ,college,ph} = user;
    const registerSubmit = (e: any) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("college", college);
        myForm.set("ph", ph);
        myForm.set("password", password);
        // myForm.set("avatar", avatar);
        console.log("register");

    }
    const registerDataChange = (e: { target: { name: any; value: any; }; }) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const switchTable = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, tab: string) => {
        console.log("aka")
        if (tab === "login" && switcherTab.current) {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            if (registerTab.current && logintab.current) {
                registerTab.current.classList.remove("shiftToNeutralForm");
                logintab.current.classList.remove("shiftToLeft");
            }
        }
        if (tab === "register" && switcherTab.current) {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
    
            if (registerTab.current && logintab.current) {
                registerTab.current.classList.add("shiftToNeutralForm");
                logintab.current.classList.add("shiftToLeft");
            }
        }
    }
    
    const loginSubmit=(e: { preventDefault: () => void; })=>{
        console.log("submitted");
        e.preventDefault();
    }


    return (
        <Fragment>
            
            <div className="LoginSignUpContainer">
               
                <div className="LoginSignin">
                 
                    <div className="head">
                        <div className="login_signup_toggel">
                            <p onClick={(e) => switchTable(e, "login")}>Login</p>
                            <p onClick={(e) => switchTable(e, "register")}>Register</p>
                        </div>
                        <button ref={switcherTab} ></button>
                    </div>
                    <form className="loginForm" ref={logintab} onSubmit={loginSubmit}>
                        {/* <MailOutlineIcon /> */}
                        <div className="loginEmail">
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginemail}
                                onChange={(e) => setLoginemail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            {/* <LockOpenIcon /> */}
                            <input
                                type="password"
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
                            {/* <FaceIcon /> */}
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                // onChange={(e) => setName(e.target.value)}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpEmail">
                            {/* <MailOutlineIcon /> */}
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={registerDataChange}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="signUpEmail">
                            {/* <MailOutlineIcon /> */}
                            <input
                                type="text"
                                placeholder="College"
                                required
                                name="email"
                                value={college}
                                onChange={registerDataChange}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="signUpEmail">
                            {/* <MailOutlineIcon /> */}
                            <input
                                type="number"
                                placeholder="phone"
                                required
                                name="email"
                                value={ph}
                                onChange={registerDataChange}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                           <div className="signUpPassword">
                            {/* <LockOpenIcon /> */}
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                                // onChange={(e) => setPassword(e.target.value)}
                            />
                            </div>
                            <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                </div>
        </div>
        </Fragment >
    )
}