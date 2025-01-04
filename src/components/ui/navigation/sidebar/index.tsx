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

	const currentPath = location.pathname;
	return (
		<div className={classes.sidebar}>
			<div className={classes.sidebarBorder}>
				<button
					className={`${classes.sidebarItem} ${isActive(`/dashboard/guild/${guildId}/home`) ? classes.active : ""}`}
					onClick={() =>
						handleNavigation(`/dashboard/guild/${guildId}/home`)
					}
				>
					<img
						src="/home.svg"
						alt="home"
						className={classes.sidebarIcon}
					/>
					<span className={classes.sidebarItemText}>Home</span>
				</button>
				<button
					className={`${classes.sidebarItem} ${isActive(`/dashboard/guild/${guildId}/custombots`) || isActive(`/dashboard/guild/${guildId}/custombots/list`) ? classes.active : ""}`}
					onClick={() =>
						handleNavigation(
							`/dashboard/guild/${guildId}/custombots`,
						)
					}
				>
					<img
						src="/bot_icon.svg"
						alt="home"
						className={classes.sidebarIcon}
					/>
					<span className={classes.sidebarItemText}>Custombots</span>
				</button>
				<button
					className={`${classes.sidebarItem} ${isActive(`/dashboard/guild/${guildId}/economy`) ? classes.active : ""}`}
					onClick={() =>
						handleNavigation(`/dashboard/guild/${guildId}/economy`)
					}
				>
					<img
						src="/economy.svg"
						alt="home"
						className={classes.sidebarIcon}
					/>
					<span className={classes.sidebarItemText}>Economy</span>
				</button>
				<button
					className={`${classes.sidebarItem} ${isActive(`/dashboard/guild/${guildId}/levels`) ? classes.active : ""}`}
					onClick={() =>
						handleNavigation(`/dashboard/guild/${guildId}/levels`)
					}
				>
					<img
						src="/levels.svg"
						alt="home"
						className={classes.sidebarIcon}
					/>
					<span className={classes.sidebarItemText}>Levels</span>
				</button>
				<button
					className={`${classes.sidebarItem} ${isActive(`/dashboard/guild/${guildId}/radio`) ? classes.active : ""}`}
					onClick={() =>
						handleNavigation(`/dashboard/guild/${guildId}/radio`)
					}
				>
					<img
						src="/radio.svg"
						alt="home"
						className={classes.sidebarIcon}
					/>
					<span className={classes.sidebarItemText}>Radio</span>
				</button>
				<button
					className={`${classes.sidebarItem} ${isActive(`/dashboard/guild/${guildId}/ai`) ? classes.active : ""}`}
					onClick={() =>
						handleNavigation(`/dashboard/guild/${guildId}/ai`)
					}
				>
					<img
						src="/sparkles.svg"
						alt="home"
						className={classes.sidebarIcon}
					/>
					<span className={classes.sidebarItemText}>AI</span>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
