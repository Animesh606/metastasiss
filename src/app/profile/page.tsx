"use client"
import React from "react"
import Link from "next/link"
import "./page.css"
export default function profile() {
    return (
        <div className="profileContainers">
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src="/snacks.png" alt="akas" />
                    <p>Akash Mondal</p>

                </div>
                <div>
                  
                    <div>
                        <h4>Email</h4>
                        <p>akashramnagar</p>
                    </div>
                    <div>
                        <h4>College</h4>
                        <p>jgec</p>
                    </div>
                    <div>
                        <h4>Phone</h4>
                        <p>7001871073</p>
                    </div>
                    <div>
                        <h4>Role</h4>
                        <p>participant</p>
                    </div>

                </div>
            </div>
            {/* <div className="secondpart">
                <Link href="/myorders">My Events</Link> */}
            {/* </div> */}
        </div>
    )
} 