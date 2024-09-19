import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <main className="w-full h-screen flex justify-center items-center">
            <SignIn />
            <div className="w-96">
                <img src="/images/zenith-logo.png" alt="" />
            </div>
        </main>
    )
}
