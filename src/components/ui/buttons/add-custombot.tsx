import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuildsSelect from "../dropdowns/guilds-select";
interface Bot {
	username: string;
	id: string;
	avatar: string;
}

/* react-toastify is only temporary lib, please do not take it serious xD */

const InsertSetting = ({}: { bot: Bot }) => {
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
					<div className="add-custombot">
						<label
							htmlFor="bot-token"
							style={{ marginBottom: "5px", color: "white" }}
						>
							Your bot token
						</label>
						<input
							id="bot-token"
							type="password"
							value={token}
							onChange={handleTokenChange}
							placeholder="Add Setting"
							style={{ color: "white" }}
							autoComplete="off"
						/>
					</div>
					<ToastContainer />
				</form>

				{isBotAdded && (
					<>
						<div className="logged-in-as">
							<p className="logged-in-as-text">
								Logged in as
								<div className="custombot-data">
									<img
										src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`}
										alt="custombot-avatar"
										className="custombot-avatar"
									/>
									<p className="custombot-username">
										{user?.username}
									</p>
									<button className="manage-button">
										<img
											src="/icons8-manage 1.png"
											alt="manage-icon"
											className="manage-icon"
										/>
									</button>
								</div>
							</p>
						</div>

						<form>
						<GuildsSelect />

							<div className="add-custombot">
								<label
									htmlFor="activity"
									style={{
										marginBottom: "5px",
										color: "white",
									}}
								>
									Activity
								</label>
								<input
									id="activity"
									type="text"
									value={activity}
									onChange={handleActivityChange}
									placeholder="Enter Activity"
									style={{ color: "white" }}
									autoComplete="off"
								/>
							</div>
						</form>

						<form>
							<div className="add-custombot">
								<label
									htmlFor="status"
									style={{
										marginBottom: "5px",
										color: "white",
									}}
								>
									Status
								</label>
								<input
									id="status"
									type="text"
									value={status}
									onChange={handleStatusChange}
									placeholder="Enter Status"
									style={{ color: "white" }}
									autoComplete="off"
								/>
							</div>
						</form>

					</>
				)}
		</div>
	);
};

export default InsertSetting;
