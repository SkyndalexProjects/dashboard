import { useParams } from "react-router-dom";
import Navbar from "../../../../../../components/ui/navigation/navbar";
import Sidebar from "../../../../../../components/ui/navigation/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";
import { fetchCustombots } from "../../../../../../thunks/custombots";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../store";
import { useEffect, useState } from "react";
import classes from "./custombot-manage.module.css";
export default function ManageCustombot() {
	const dispatch = useDispatch<AppDispatch>();
	const { id, botId } = useParams<{ id: string; botId: string }>();
	const custombot = useSelector((state: RootState) =>
		state.custombots.data.find((bot) => bot.id === Number(botId)),
	);

	const [detailedCustombot, setCustombot] = useState<CustomBot | null>(null);
	const [custombotRPC, setCustombotRPC] = useState<CustomBotRPC | null>(null);
	
	useEffect(() => {
		if (id) {
			dispatch(fetchCustombots(id));
		}
	}, [dispatch, id]);

	useEffect(() => {
		const fetchBotData = async () => {
			if (custombot) {
				const botResponse = await fetch(
					`${import.meta.env.VITE_API_URL}/bot`,
					{
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
							authorization: `Bot ${custombot.token}`,
						},
					},
				);
				const botData = await botResponse.json();
				setCustombot(botData);
				const botRPCResponse = await fetch(
					`${import.meta.env.VITE_API_URL}/bot/rpc`,
					{
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
							clientid: custombot.clientId,
						},
					},
				);
				const botRPCData = await botRPCResponse.json();
				setCustombotRPC(botRPCData);
			}
		};

		fetchBotData();
	}, [custombot]);

	const iconURL = `https://cdn.discordapp.com/avatars/${detailedCustombot?.id}/${detailedCustombot?.avatar}.png`;

	return (
		<div>
			<Navbar />
			<Sidebar />
			<h2>
				{detailedCustombot && (
					<div className={classes.custombot}>
						<img
							src={iconURL}
							alt={`${detailedCustombot.username} icon`}
							className={classes.botIcon}
						/>
						<p className={classes.botName}>
							{detailedCustombot.username}
							<p className={classes.botStatus}> online </p>{" "}
						</p>
						<div className={classes.botDetails}>
							<h1> ABOUT ME </h1>
							<p>
								{custombotRPC?.description || "No about me"}	
							</p>
						</div>
					</div>
				)}
			</h2>
		</div>
	);
}
