import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./dashboard/servers/[id]/home/page";
interface Guild {
	id: string;
	name: string;
	icon: string;
}

interface User {
	username: string;
}

export default function App() {
	const [guilds, setGuilds] = useState<Guild[]>([]);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		async function fetchData() {
		  const guildsResponse = await fetch(`http://localhost:3000/api/guilds`, {
			credentials: 'include',
		  });
		  const guildsData = await guildsResponse.json();
		  setGuilds(guildsData);
	
		  const userResponse = await fetch("http://localhost:3000/api/user", {
			credentials: "include",
		  });
		  const userData = await userResponse.json();
		  setUser(userData);
		}
	
		fetchData();
	  }, []);
	

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
