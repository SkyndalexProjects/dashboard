import { SignIn } from "./components/signIn";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/app/auth";
export default function Page() {
  return (
    <SessionProvider>
      <PageContent />
    </SessionProvider>
  );
}
export async function PageContent() {
  const session = await auth()
  console.log("session", session);
//  const session = await getServerSession();
  // if (data) {
  //   console.log("session", session);

  //   return (
  //     <div>
  //       {/* Signed in as {session.user?.name} <br />
  //       <button onClick={() => signOut()}>Sign out</button> */}
  //     </div>
  // );
  // }

  return (
    <div>
      <SignIn />
    </div>
  );
}