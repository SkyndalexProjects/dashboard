import GuildsDropdown from "./guilds";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import classes from "./navbar.module.css";
import { version } from "@/../package.json";

const navbar = () => {
	const location = useLocation();
	const guildId = location.pathname.split("/")[3];
	const guild = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data)
			? state.guilds.data.find((x) => x.id === guildId)
			: undefined,
	);
	return (
		<>
			<nav>
				<img
					className={classes.guildIcon}
					src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`}
					alt="logo"
					onError={(e) => {
						e.currentTarget.src = "/default_guild_icon.png";
					}}
				/>
				<p className={classes.navTitle}> {guild?.name} </p>
				<GuildsDropdown />
				<div className={classes.navRight}>
					<p className={classes.navItem}> {version} </p>
				</div>
			</nav>
		</>
	);
};

export default navbar;
