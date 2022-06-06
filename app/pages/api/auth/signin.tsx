import { signIn } from "next-auth/react"


function SignIn ({providers}: {providers: any}) {

    return (
        <>
        {(providers) ? Object.values(providers).map((provider) => (
            <div key={(provider as any).name}>
            <button onClick={() => signIn((provider as any).id)}>
                Sign in with {(provider as any).name}
            </button>
            </div>
        )): null}
        </>
    )
}

export default SignIn;
