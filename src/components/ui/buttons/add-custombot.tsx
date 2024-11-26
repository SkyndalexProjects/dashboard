import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuildsSelect from "../dropdowns/guilds-select";
import classes from "./buttons.module.css"

interface Bot {
	username: string;
	id: string;
	avatar: string;
}

/* react-toastify is only temporary lib, please do not take it serious xD */

const InsertSetting = () => {
	const { id } = useParams<{ id: string }>();
	const [token, setToken] = useState("");
	const [activity, setActivity] = useState("");
	const [status, setStatus] = useState("");

	const [isBotAdded, setIsBotAdded] = useState(false);

	const [user, setUser] = useState<Bot | null>(null);

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

		const clientId = atob(token.split(".")[0]);
		const userResponse = await fetch(
			`https://discord.com/api/v9/users/@me`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bot ${token}`,
				},
			},
		);

		if (!userResponse.ok) {
			toast.error("Unauthorized: Invalid bot token", {
				theme: "dark",
			});
			return;
		}

		const user: Bot = await userResponse.json();
		setUser(user); // Set the user state

		if (clientId.length < 17) {
			toast.error("Invalid token format", {
				theme: "dark",
			});
			return;
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/guilds/${id}/custombots/get`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token }),
				},
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const result = await response.json();
			console.log("Success:", result);

			toast.success(`Logged in as ${user.username}`, {
				theme: "dark",
			});
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
				<ToastContainer />
			</form>
			<div className={classes.addCustombot}>
					<label htmlFor="guilds" className={classes.label}>
						Assign guild
					</label>
			<GuildsSelect />

				</div>

	
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
				<ToastContainer />
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
				<ToastContainer />
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
								<p className="custombotUsername">
									{user?.username}
								</p>
								<button className={classes.manageButton}>
									<img
										src="/icons8-manage 1.png"
										alt="manageIcon"
										className={classes.manageIcon}
									/>
								</button>
							</div>
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default InsertSetting;
