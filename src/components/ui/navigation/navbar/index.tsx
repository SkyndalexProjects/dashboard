import GuildsDropdown from "./guilds";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import classes from "./navbar.module.css";
const navbar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const guildId = location.pathname.split("/")[3];
	const guild = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data)
			? state.guilds.data.find((x) => x.id === guildId)
			: undefined,
	);

	useEffect(() => {
		console.log("selected guild", guild);
	}, [guild]);
	return (
		<>
			<nav>
				<img
					className={classes.guildIcon}
					src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`}
					alt="logo"
					width={60}
					height={60}
					onError={(e) => {
						e.currentTarget.src = "/default_guild_icon.png";
					}}
				/>
				<p className={classes.navTitle}> {guild?.name} </p>
				<GuildsDropdown />
				<div className={classes.navRight}>
					<p className={classes.navItem}> 0.0.0 </p>
				</div>
			</nav>
		</>
	);
};

export default navbar;
