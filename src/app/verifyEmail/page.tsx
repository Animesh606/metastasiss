"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import "./page.css"
export default function VerifyEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [iserror, setIsError] = useState(false);
    console.log(searchParams.get('token'));
    useEffect(() => {
        (async function () {
            try {
                const response = await axios.post("/api/user/verifyEmail",{ token: searchParams.get('token') });
                console.log(response);
                toast.success(`${(response)?.data.message}`);
                toast.success("Welcome to metastasiss");
                router.push("/login");
            } catch (error: any) {
                setIsError(true)
                toast.error(`${error.response.data.message}`);
            }
        })();
    }, [])
    return (
        <>{iserror?(<div className="verifyEmail"><h1 >Please try again </h1></div>):(<Loader />)}
        </>
    )
} 