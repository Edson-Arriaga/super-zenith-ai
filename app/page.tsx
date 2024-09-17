import { SignIn, SignInButton } from "@clerk/nextjs";

export default async function InitialPage() {
    
    return (
        <main className="h-screen">
            <SignInButton>
                <button>Iniciar Sesión</button>
            </SignInButton>

            <p>Registrarte</p>
            ;
        </main>
    );
}
