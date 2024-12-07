import Navbar from "../../../../../components/ui/navigation/navbar";
import Sidebar from "../../../../../components/ui/navigation/sidebar";
import classes from "./custombots.list.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function CustombotList() {
	const { id } = useParams<{ id: string }>();
	const [custombots, setCustombots] = useState([]);

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
		const data = await response.json();
		setCustombots(data);
	};

	useEffect(() => {
		getCustombots();
	}, [id]);

	console.log("custombots", custombots);
	interface custombBot {
		id: number;
		guildId: string;
		clientId: string;
		token: string;
		activity: string;
		status: string;
	}
	return (
		<div className={classes.container}>
			<Navbar />
			<Sidebar />

			{/* TODO: Finish the table */}
			<h1> Custom Bots List </h1>
			<table className={classes.customBotsTable}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Guild ID</th>
						<th>Client ID</th>
						<th>Activity</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{custombots.map((bot: custombBot) => (
						<tr key={bot.id}>
							<td>{bot.id}</td>
							<td>{bot.guildId}</td>
							<td>{bot.clientId}</td>
							<td>{bot.activity}</td>
							<td>{bot.status}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
