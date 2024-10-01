"use client"

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <main className="w-full h-screen flex justify-center items-center -mb-10">
            <SignIn />
        </main>
    )
}
