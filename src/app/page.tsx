"use client";
import { SignIn } from "./components/signIn";
import { signOut } from "next-auth/react";
import { useSession, SessionProvider } from "next-auth/react";
export default function Page() {
  return (
    <SessionProvider>
      <PageContent />
    </SessionProvider>
  );
}

function PageContent() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div>
      <SignIn />
    </div>
  );
}