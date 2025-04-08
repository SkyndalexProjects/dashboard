import { useParams } from "react-router-dom";
import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { fetchCustombots } from "@/thunks/custombots";
import { AppDispatch } from "@/store";
import { useEffect, useState } from "react";
import classes from "./custombot-manage.module.css";
import CustombotSettingsTabs from "./tabs/custombot-settings";

export default function ManageCustombot() {
	const dispatch = useDispatch<AppDispatch>();
	const { id, botId } = useParams<{ id: string; botId: string }>();
	const custombot = useSelector((state: RootState) =>
		state.custombots.data.find((bot) => bot.id === Number(botId)),
	);

	const currentUser = useSelector(
		(state: RootState) => state.user.data as unknown as User,
	);

	const clientId = custombot?.token
		? (() => {
				try {
					return atob(custombot.token.split(".")[0]);
				} catch (error) {
					console.error("Failed to decode token:", error);
					return null;
				}
			})()
		: null;
	const [detailedCustombot, setCustombot] = useState<CustomBot | null>(null);
	const [custombotRPC, setCustombotRPC] = useState<CustomBotRPC | null>(null);
	const [statusText, setStatusText] = useState<string>(
		custombot?.status || "unknown",
	);

	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen((prev) => !prev);
	};
	const handleTurnOn = async () => {
		setStatusText("loading...");
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/guilds/${id}/custombots/start`,
				{
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						clientId,
						requestedByUserId: currentUser.id,
						guildId: id,
					}),
				},
			);
			const data = await response.json();
			if (data.error) {
				setStatusText("error");
				return;
			} else {
				setStatusText("online");
			}
		} catch (error) {
			setStatusText("error");
		}
		setDropdownOpen(false);
	};
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
							...(clientId && { clientid: clientId }),
						},
					},
				);
				const botRPCData = await botRPCResponse.json();
				setCustombotRPC(botRPCData);
			}
		};

		fetchBotData();
	}, [custombot, id]);
	const iconURL = `https://cdn.discordapp.com/avatars/${detailedCustombot?.id}/${detailedCustombot?.avatar}.png`;
	return (
		<div>
			<Navbar />
			<Sidebar />
			<h2>
				{detailedCustombot && (
					<div className={classes.containers}>
						<div className={classes.custombot}>
							{" "}
							<img
								src={iconURL}
								alt={`${detailedCustombot.username} icon`}
								className={classes.botIcon}
							/>
							<div className={classes.custombotStatusName}>
								{detailedCustombot.username}
								<div
									className={`${
										classes.custombotStatusType
									} ${
										statusText === "error"
											? classes.red
											: statusText === "online"
												? classes.green
												: ""
									}`}
								>
									{statusText || "unknown"}
								</div>
							</div>
							<button
								className={classes.indicatorButton}
								onClick={toggleDropdown}
								aria-expanded={isDropdownOpen}
								aria-label="Toggle dropdown"
							>
								<img
									src="/indicator.svg"
									alt="indicator"
									className={`${classes.indicator} ${
										isDropdownOpen ? classes.rotate : ""
									}`}
								/>
							</button>
							{isDropdownOpen && (
								<div className={classes.dropdownOptions}>
									<ul>
										<li onClick={handleTurnOn}>
											{" "}
											Turn on{" "}
										</li>
										<li> Delete </li>
									</ul>
								</div>
							)}
						</div>
						<div className={classes.custombotAboutMeBox}>
							<p className={classes.custombotAboutMeBoxTitle}>
								{" "}
								ABOUT ME{" "}
							</p>
							<p
								className={
									classes.custombotAboutMeBoxRpcDescription
								}
							>
								{custombotRPC?.description}
							</p>
						</div>

						<CustombotSettingsTabs />
					</div>
				)}
			</h2>
		</div>
	);
}
