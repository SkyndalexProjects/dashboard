import { useLocation, useNavigate } from "react-router-dom";
import classes from "./sidebar.module.css"
const Sidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	console.log("current path", location.pathname);
	const isActive = (path: string) => location.pathname === path;

	const handleNavigation = (path: string) => {
		navigate(path);
	};

	const guildId = location.pathname.split("/")[3];
	return (
		<div className={classes.sidebar}>
			<div className={classes.sidebarBorder}>
				<button
					className={`${classes.sidebarItem} ${isActive(`/dashboard/guild/${guildId}/home`) ? classes.active : ""}`}
					onClick={() =>
						handleNavigation(`/dashboard/guild/${guildId}/home`)
					}
				>
					<img src="/home.svg" alt="home" width={30} height={30} />
					<span className={classes.sidebarItemText}>Home</span>
				</button>
				<button
					className={`${classes.sidebarItem} ${isActive(`/dashboard/guild/${guildId}/custombots`) ? classes.active : ""}`}
					onClick={() =>
						handleNavigation(`/dashboard/guild/${guildId}/custombots`)
					}
				>
					<img src="/bot_icon.svg" alt="home" width={30} height={30} />
					<span className={classes.sidebarItemText}>Custombots</span>
				</button>
				<button
					className={`${classes.sidebarItem} ${isActive(`/dashboard/guild/${guildId}/economy`) ? classes.active : ""}`}
					onClick={() =>
						handleNavigation(`/dashboard/guild/${guildId}/economy`)
					}
				>
					<img src="/economy.svg" alt="home" width={30} height={30} />
					<span className={classes.sidebarItemText}>Economy</span>
				</button>
				<button
					className={`${classes.sidebarItem} ${isActive(`/dashboard/servers/${guildId}/levels`) ? classes.active : ""}`}
					onClick={() =>
						handleNavigation(`/dashboard/servers/${guildId}/levels`)
					}
				>
					<img src="/levels.svg" alt="home" width={30} height={30} />
					<span className={classes.sidebarItemText}>Levels</span>
				</button>
				<button
					className={`${classes.sidebarItem} ${isActive(`/dashboard/servers/${guildId}/radio`) ? classes.active : ""}`}
					onClick={() =>
						handleNavigation(`/dashboard/servers/${guildId}/radio`)
					}
				>
					<img src="/radio.svg" alt="home" width={30} height={30} />
					<span className={classes.sidebarItemText}>Radio</span>
				</button>
				<button
					className={`${classes.sidebarItem} ${isActive(`/dashboard/servers/${guildId}/ai`) ? classes.active : ""}`}
					onClick={() =>
						handleNavigation(`/dashboard/servers/${guildId}/ai`)
					}
				>
					<img src="/sparkles.svg" alt="home" width={30} height={30} />
					<span className={classes.sidebarItemText}>AI</span>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
