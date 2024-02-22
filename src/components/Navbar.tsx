import React from "react";
import "./Navbar.css"
export const Navbar=()=>{
    return(
        <>
        <header>
        <input type="checkbox" name="" id="chk1" />
        <div className="logo"><h1>Metastasiss</h1></div>
            <div className="search-box">
            </div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Events</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#" className="login">Login</a></li>
            </ul>
            
    </header>
        </>
    )
}