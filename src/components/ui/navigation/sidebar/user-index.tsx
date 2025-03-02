import { useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./sidebar.module.css";
const UserSidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	console.log("current path", location.pathname);
	console.log("current location pathname", location.pathname);

	const isActive = (path: string) => location.pathname === path;

	const handleNavigation = (path: string) => {
		navigate(path);
	};
	const userId = useParams<{ id: string }>().id;

	const links = [
		{
			path: `/dashboard/user/${userId}/home`,
			icon: "/home.svg",
			text: "Home",
		},
		{
			path: `/dashboard/user/${userId}/ai-tokens`,
			icon: "/sparkles.svg",
			text: "AI Tokens",
		},
		{
			path: `/dashboard/user/${userId}/commands-setup`,
			icon: "/slash.svg",
			text: "Commands setup",
		},
		{
			path: `/dashboard/user/${userId}/radio-favorites`,
			icon: "/radio.svg",
			text: "Radio favorites",
		},
	];

	return (
		<div className={classes.sidebar}>
			<div className={classes.sidebarBorder}>
				{links.map(({ path, icon, text }) => (
					<button
						key={path}
						className={`${classes.sidebarItem} ${isActive(path) ? classes.active : ""}`}
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

export default UserSidebar;
