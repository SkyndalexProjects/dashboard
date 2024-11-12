import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import type { AppDispatch, RootState } from "./store.ts"
import { fetchGuilds } from "./thunks/guilds.ts";
import Home from "./dashboard/guild/[id]/home/page.tsx";
interface Guild {
	id: string;
	name: string;
	icon: string;
}

interface User {
	username: string;
}

export default function App() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		async function fetchUser() {
			const userResponse = await fetch("http://localhost:3000/api/user", {
				credentials: "include",
			});
			const userData = await userResponse.json();
			setUser(userData);
		}

		fetchUser();
	}, []);

	const dispatch = useDispatch<AppDispatch>();

	const haveGuildsFetched = useSelector((state: RootState) => {
        console.log("state.guilds.data", state.guilds.data);
        return state.guilds.haveGuildsFetched;
    });

	useEffect(() => {
        if (!haveGuildsFetched) {
            dispatch(fetchGuilds());
        }
    }, [dispatch, haveGuildsFetched]);
	const guilds = useSelector((state: RootState) => state.guilds.data);
	
	console.log("guilds", guilds);
	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={<HomePage guilds={guilds} user={user} />}
				/>
				<Route path="/dashboard/guild/:id/home" element={<Home />} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</div>
	);
}

function HomePage({ guilds, user }: { guilds: Guild[]; user: User | null }) {
	return (
		<div>
			<h1 className="title"> Welcome, {user?.username} </h1>
			<h2 className="title"> Please, choose guild:</h2>
			<div className="guilds-container">
				<div className="guilds-grid">
					{guilds.map((guild) => (
						<Link
							key={guild.id}
							to={`/dashboard/guild/${guild.id}/home`}
							className="guild"
						>
							<div>
								<img
									src={
										guild.icon
											? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
											: "/default-icon.png"
									}
									alt={`<no icon>`}
								/>
								<p>{guild.name}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
			<button onClick={() => console.log('Sign out')} className="sign-out">
				Sign out
			</button>
		</div>
	);
}

function NoMatch() {
	return (
		<div>
			<h2>Nothing to see here!</h2>
			<p>
				<Link to="/">Go to the home page</Link>
			</p>
		</div>
	);
}
