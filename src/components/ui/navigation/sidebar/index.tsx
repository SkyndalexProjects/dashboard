import { useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./sidebar.module.css";
const Sidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	console.log("current path", location.pathname);
	const isActive = (path: string) => location.pathname === path;

	const handleNavigation = (path: string) => {
		navigate(path);
	};
	const guildId = useParams<{ id: string }>().id;
	const { botId } = useParams<{ botId: string }>();

	const links = [
		{
			path: `/dashboard/guild/${guildId}/home`,
			icon: "/home.svg",
			text: "Home",
		},
		{
			path: `/dashboard/guild/${guildId}/custombots`,
			icon: "/bot_icon.svg",
			text: "Custombots",
			additionalPaths: [
				`/dashboard/guild/${guildId}/custombots/list`,
				`/dashboard/guild/${guildId}/custombots/manage/${botId}`,
			],
		},
		{
			path: `/dashboard/guild/${guildId}/economy`,
			icon: "/economy.svg",
			text: "Economy",
		},
		{
			path: `/dashboard/guild/${guildId}/levels`,
			icon: "/levels.svg",
			text: "Levels",
		},
		{
			path: `/dashboard/guild/${guildId}/radio`,
			icon: "/radio.svg",
			text: "Radio",
		},
		{
			path: `/dashboard/guild/${guildId}/ai`,
			icon: "/sparkles.svg",
			text: "AI",
		},
	];

	return (
		<div className={classes.sidebar}>
			<div className={classes.sidebarBorder}>
				{links.map(({ path, icon, text, additionalPaths }) => (
					<button
						key={path}
						className={`${classes.sidebarItem} ${isActive(path) || (additionalPaths && additionalPaths.some(isActive)) ? classes.active : ""}`}
						onClick={() => handleNavigation(path)}
					>
						<img
							src={icon}
							alt={text}
							className={classes.sidebarIcon}
						/>
						<span className={classes.sidebarItemText}>{text}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
