import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import CustomBotModal from "@/components/ui/modals/CreateCustomBot";
import classes from "./custombots.list.module.css";

export default function CustombotList() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [custombots, setCustombots] = useState<CustomBot[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const getCustombots = async () => {
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
		} catch (error) {
			console.error("Error fetching custom bots:", error);
		}
	};

	useEffect(() => {
		getCustombots();
	}, [id]);

	const toggleBot = async (botId: number) => {
		const bot = custombots.find((bot) => bot.id === botId);
		if (!bot) return;
		// Add logic to toggle bot status
	};

	const handleNavigation = (path: string) => {
		navigate(path);
	};

	return (
		<div>
			<Navbar />
			<Sidebar />
			<div
				className={`${classes.list} ${isModalOpen ? classes.blurBackground : ""}`}
			>
				{custombots.map((bot: CustomBot) => (
					<div key={bot.id} className={classes.listItem}>
						<img
							src={`https://cdn.discordapp.com/avatars/${bot.clientId}/${bot.icon}.png`}
							alt={bot.username}
							className={classes.listItemIcon}
						/>
						<div>
							<p className={classes.listItemName}>
								{bot.username}
							</p>
							<p className={classes.listItemFooter}>
								{bot.status || "No status"}
							</p>
						</div>
						<div className={classes.listItemActionButtons}>
							<button
								className={classes.listItemActionButton}
								onClick={() =>
									handleNavigation(
										`/dashboard/guild/${id}/custombots/manage/${bot.id}`,
									)
								}
							>
								<img src="/edit-button.svg" alt="Edit" />
							</button>
							<button
								className={classes.listItemActionButton}
								onClick={() => toggleBot(bot.id)}
							>
								<img src="/trash.svg" alt="Trash" />
							</button>
						</div>
					</div>
				))}
			</div>
			<div className={classes.addMoreCustomBotsContainer}>
				<button
					className={classes.addCustomBotButton}
					onClick={openModal}
				>
					<img
						src="/plus.svg"
						alt="plus.svg"
						className={classes.addCustomBotIcon}
					/>
					<p>Add more custom bots</p>
				</button>
			</div>
			<CustomBotModal isOpen={isModalOpen} onClose={closeModal} />
		</div>
	);
}
