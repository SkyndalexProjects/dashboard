import { useLocation, useNavigate } from "react-router-dom";

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
		<div className="sidebar">
			<button
				className={`sidebar-item ${isActive(`/dashboard/guild/${guildId}/home`) ? "active" : ""}`}
				onClick={() =>
					handleNavigation(`/dashboard/guild/${guildId}/home`)
				}
			>
				<img src="/home.svg" alt="home" width={30} height={30} /> Home
			</button>
			<button
				className={`sidebar-item ${isActive(`/dashboard/guild/${guildId}/custombots`) ? "active" : ""}`}
				onClick={() =>
					handleNavigation(`/dashboard/guild/${guildId}/custombots`)
				}
			>
				<img src="/bot_icon.svg" alt="home" width={30} height={30} />{" "}
				Custombots
			</button>
			<button
				className={`sidebar-item ${isActive(`/dashboard/guild/${guildId}/economy`) ? "active" : ""}`}
				onClick={() =>
					handleNavigation(`/dashboard/guild/${guildId}/economy`)
				}
			>
				<img src="/economy.svg" alt="home" width={30} height={30} />{" "}
				Economy
			</button>
			<button
				className={`sidebar-item ${isActive(`/dashboard/servers/${guildId}/levels`) ? "active" : ""}`}
				onClick={() =>
					handleNavigation(`/dashboard/servers/${guildId}/levels`)
				}
			>
				<img src="/levels.svg" alt="home" width={30} height={30} />{" "}
				Levels
			</button>
			<button
				className={`sidebar-item ${isActive(`/dashboard/servers/${guildId}/radio`) ? "active" : ""}`}
				onClick={() =>
					handleNavigation(`/dashboard/servers/${guildId}/radio`)
				}
			>
				<img src="/radio.svg" alt="home" width={30} height={30} /> Radio
			</button>
			<button
				className={`sidebar-item ${isActive(`/dashboard/servers/${guildId}/ai`) ? "active" : ""}`}
				onClick={() =>
					handleNavigation(`/dashboard/servers/${guildId}/ai`)
				}
			>
				<img src="/sparkles.svg" alt="home" width={30} height={30} /> AI
			</button>
		</div>
	);
};

export default Sidebar;
