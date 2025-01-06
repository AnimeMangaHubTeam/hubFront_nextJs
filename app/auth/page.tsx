'use client';

import SignIn from "@/components/auth/signIn";
import SignUp from "@/components/auth/signUp";
import { useSearchParams } from "next/navigation";

export default function Page() {

    const AuthPageParams = useSearchParams();

    return (
        <div>
            {AuthPageParams.get("page") === "signIn" ? <SignIn /> : <SignUp />}
            <button onClick={() => AuthPageParams.set()}> test </button>
        </div>
);
}