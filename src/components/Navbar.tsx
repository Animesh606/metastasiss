'use client'
import React from "react";
import "./Navbar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons"
import {faBars } from '@fortawesome/free-solid-svg-icons'
import {useState} from "react"
import Image from "next/image"
export const Navbar=()=>{
    const [hover,setHover]=useState(false);
    console.log(hover);
    return(
        <>
        <header>
        <input type="checkbox" name="" id="chk1" />
        <div className="logo">
            <div className="img">
             <Image className="Image" src="/Metastasis.png" alt={""} width={100} height={100}></Image>
             </div>
             <div>
            <h1>Meta-stasiss</h1>
            </div>
            </div>
            <div className="search-box">
            </div>
            <ul className={` ${hover ? 'navactive' : 'nav'}`}>
                <li><a href="/home">Home</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/login" className="login">Login</a></li>
                
            </ul>
            <div className=" mobile"  onClick={()=>{setHover(!hover)}}> <FontAwesomeIcon icon={faBars} className="icon"/></div>
            </header>
        </>
    )
}