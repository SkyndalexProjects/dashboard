import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import classes from "./buttons.module.css";
import { Link } from "react-router-dom";

interface Bot {
	username: string;
	id: string;
	avatar: string;
}

const InsertSetting = () => {
	const { id } = useParams<{ id: string }>();
	const [token, setToken] = useState("");
	const [activity, setActivity] = useState("");
	const [status, setStatus] = useState("");

	const [isBotAdded, setIsBotAdded] = useState(false);

	const [user, setUser] = useState<Bot | null>(null);
	const guild = useParams<{ id: string }>();
	const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToken(e.target.value);
	};

	const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActivity(e.target.value);
	};

	const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStatus(e.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log("Token:", token);
		const clientId = atob(token.split(".")[0]);
		const endpoint = `${import.meta.env.VITE_API_URL}/bot`;

		const userResponse = await fetch(endpoint, {
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bot ${token}`,
			},
		});

		if (!userResponse.ok) {
			return console.error("Failed to fetch user");
		}

		const user: Bot = await userResponse.json();
		setUser(user); // Set the user state

		if (clientId.length < 17) {
			return console.error("Invalid token");
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/guilds/${id}/custombots/get`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						guildId: id,
						clientId,
						activity,
						status,
						token,
					}),
				},
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const result = await response.json();
			console.log("Success:", result);

			setIsBotAdded(true);
		} catch (error) {
			console.error("Error:", error);
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className={classes.addCustombot}>
					<label htmlFor="bot-token" className={classes.label}>
						Your bot token
					</label>
					<input
						id="bot-token"
						type="password"
						value={token}
						onChange={handleTokenChange}
						placeholder="Enter token"
						autoComplete="off"
					/>
				</div>
			</form>

			<form onSubmit={handleSubmit}>
				<div className={classes.addCustombot}>
					<label htmlFor="activity" className={classes.label}>
						Activity
					</label>
					<input
						id="bot-activity"
						type="text"
						value={activity}
						onChange={handleActivityChange}
						placeholder="Enter activity"
						autoComplete="off"
					/>
				</div>
			</form>
			<form onSubmit={handleSubmit}>
				<div className={classes.addCustombot}>
					<label htmlFor="bot-token" className={classes.label}>
						Status
					</label>
					<input
						id="bot-status"
						type="text"
						value={status}
						onChange={handleStatusChange}
						placeholder="Enter status"
						className={classes.input}
						autoComplete="off"
					/>
				</div>
			</form>

			{isBotAdded && (
				<>
					<div className={classes.loggedInAs}>
						<p className={classes.loggedInAsText}>
							Logged in as
							<div className={classes.custombotData}>
								<img
									src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`}
									alt="custombot-avatar"
									className={classes.custombotAvatar}
								/>
								<Link
									to={`/dashboard/guild/${guild.id}/custombots/list`}
									className="custombotUsername"
									key={guild.id}
								>
									{user?.username}
								</Link>
							</div>
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default InsertSetting;
