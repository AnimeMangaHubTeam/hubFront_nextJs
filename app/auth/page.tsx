"use client";

import SignIn from "@/components/auth/signIn";
import SignUp from "@/components/auth/signUp";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthContent() {
  const searchParams = useSearchParams();
  return (
    <div>{searchParams.get("page") === "signIn" ? <SignIn /> : <SignUp />}</div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
