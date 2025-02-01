"use client"
import React, { useEffect } from 'react';
import {
	logout as LogoutController
} from '@/controllers/auth-controller';
import { useRouter } from 'next/navigation';

const Login = (): React.ReactElement => {
    const router = useRouter();
	useEffect(() => {
        LogoutController()
        .then((response) => {
            if (response == "Success") {
                router.push("/");
            } else {
                console.log("Failed");
            };
        })
        .catch((error) => {
            console.log(error);
        });
    },[]);
	return (
        <></>
	)
}

export default Login