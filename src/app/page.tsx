import { SignIn } from "@/app/components/signIn";
import { cookies } from "next/headers";
export default async function PageContent() {
	const cookieStore = await cookies();
	const access_token = cookieStore.get("access_token");

	console.log("main access_token", access_token);

	const res = await fetch("http://localhost:3000/api/dashboard/getUser");
	const user = await res.json();
	console.log("user", user);

	const res2 = await fetch("http://localhost:3000/api/dashboard/getGuilds");
	const guilds = await res2.json();
	console.log("guilds", guilds);

	if (user.username) {
		return (
			<div>
				<h1>Logged in as {user.username} </h1>
			</div>
		);
	} else {
		return (
			<div>
				<SignIn />
			</div>
		);
	}
}
