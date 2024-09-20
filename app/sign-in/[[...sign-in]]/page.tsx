import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <main className="w-full h-screen flex justify-center items-center">
            <SignIn appearance={{
                variables: {
                    colorPrimary: "#fcc919",
                    
                }
            }}/>
        </main>
    )
}
