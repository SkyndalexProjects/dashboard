import GuildsDropdown from "./guilds";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import classes from "./navbar.module.css"
const navbar = () => {
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
					width={60}
					height={60}
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
