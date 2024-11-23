import GuildsDropdown from "./guilds";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
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
					className="guild-icon"
					src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`}
					alt="logo"
					width={60}
					height={60}
				/>
				<p className="nav-title"> {guild?.name} </p>
				<GuildsDropdown />
				<div className="nav-right">
					<p className="nav-item"> 0.0.0 </p>
				</div>
			</nav>
			<hr />
		</>
	);
};

export default navbar;
