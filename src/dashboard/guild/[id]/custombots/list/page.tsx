import Navbar from "../../../../../components/ui/navigation/navbar";
import Sidebar from "../../../../../components/ui/navigation/sidebar";
import classes from "./custombots.list.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface CustomBot {
	id: number;
	guildId: string;
	clientId: string;
	token: string;
	activity: string;
	status: string;
	username: string;
	icon: string;
}

export default function CustombotList() {
	const { id } = useParams<{ id: string }>();
	const [custombots, setCustombots] = useState<CustomBot[]>([]);

	const getCustombots = async () => {
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
		const bots = await response.json();
		console.log("Fetched bots:", bots);

		const detailedBots = await Promise.all(
			bots.map(async (bot: CustomBot) => {
				const botResponse = await fetch(
					`${import.meta.env.VITE_API_URL}/bot`,
					{
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
							authorization: `Bot ${bot.token}`,
						},
					},
				);
				const botData = await botResponse.json();
				return {
					...bot,
					username: botData.username,
					icon: botData.avatar,
				};
			}),
		);

		setCustombots(detailedBots);
	};

	useEffect(() => {
		getCustombots();
	}, [id]);

	console.log("detailedCustombots", custombots);
	return (
		<div className={classes.container}>
			<Navbar />
			<Sidebar />

			<div className={classes.customBotsList}>
				{custombots.map((bot: CustomBot) => (
					<div key={bot.id} className={classes.customBotCard}>
						<img
							src={`https://cdn.discordapp.com/avatars/${bot.clientId}/${bot.icon}.png`}
							alt={bot.username}
							className={classes.customBotIcon}
						/>
						<div>
							<p className={classes.customBotName}>
								{bot.username}
							</p>
							<p className={classes.customBotStatus}>
								{bot.status || "No status"}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
