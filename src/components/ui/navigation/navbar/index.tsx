import GuildsDropdown from "./guilds";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import classes from "./navbar.module.css";
import Select, { SelectOption } from "../../inputs/search";
import { useState } from "react";

const Navbar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const guildId = location.pathname.split("/")[3];
	const guild = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data)
			? state.guilds.data.find((x) => x.id === guildId)
			: undefined,
	);
	const [searchTerm, setSearchTerm] = useState("");
	const getCurrentUser = useSelector(
		(state: RootState) => state.user.data as unknown as User,
	);

	const options = [
		{ id: "user_panel", name: "Go to user panel" },
		{ id: "logout", name: "Logout" },
	];

	const handleOptionSelect = (optionId: string) => {
		if (optionId === "user_panel") {
			navigate(`/dashboard/user/${getCurrentUser?.id}/home`);
		} else if (optionId === "logout") {
			window.location.href = "/logout";
		}
	};

	const isUserPath = location.pathname.includes("/user");

	return (
		<>
			<nav>
				{isUserPath ? (
					<img
						className={classes.guildIcon}
						src={`https://cdn.discordapp.com/avatars/${getCurrentUser.id}/${getCurrentUser.avatar}.png`}
						alt="User Avatar"
						onError={(e) => {
							e.currentTarget.src = "/default_guild_icon.png";
						}}
					/>
				) : (
					<img
						className={classes.guildIcon}
						src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`}
						alt="Guild Icon"
						onError={(e) => {
							e.currentTarget.src = "/default_guild_icon.png";
						}}
					/>
				)}
				<p className={classes.navTitle}>
					{isUserPath ? getCurrentUser?.username : guild?.name}
				</p>
				<GuildsDropdown />
				<div className={classes.navRight}>
					<Select
						value={searchTerm}
						onChange={handleOptionSelect}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						className={classes.selectContainer}
						inputClassName={classes.selectInput}
						indicatorClassName={classes.selectIndicator}
						placeholder={getCurrentUser?.username}
						placeholderLogo={`https://cdn.discordapp.com/avatars/${getCurrentUser?.id}/${getCurrentUser?.avatar}.png`}
						disableSearch={true}
					>
						{options.map((option) => (
							<SelectOption key={option.id} value={option.id}>
								{option.name}
							</SelectOption>
						))}
					</Select>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
