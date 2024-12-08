import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import classes from "./buttons.module.css";

const InsertSetting = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [token, setToken] = useState("");
	const [activity, setActivity] = useState("");
	const [status, setStatus] = useState("");
	const [error, setError] = useState("");

	const guild = useParams<{ id: string }>();

	const redirectUser = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/guilds/${id}/custombots/get`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ id }),
				},
			);

			if (response.ok) {
				const data = await response.json();
				console.log("new data", data);

				if (data.length >= 1) {
					navigate(`/dashboard/guild/${id}/custombots/list`);
				}
			} else {
				console.error("Failed to fetch custombots");
				setError("Failed to fetch custombots");
			}
		} catch (error) {
			console.error("Error fetching custombots:", error);
			setError("Error fetching custombots");
		}
	};

	useEffect(() => {
		redirectUser();
	}, [id]);

	if (error) {
		return <div>Something went wrong: {error}</div>;
	}

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

		if (clientId.length < 17) {
			return console.error("Invalid token");
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/guilds/${id}/custombots/add`,
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

			navigate(`/dashboard/guild/${guild.id}/custombots/list`);
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
		</div>
	);
};

export default InsertSetting;
