import GuildsDropdown from "./guilds";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import classes from "./navbar.module.css";
import Select, { SelectOption } from "../../dropdowns/select";
import { version } from "@/../package.json";
import { useState } from "react";

const navbar = () => {
	const location = useLocation();
	const guildId = location.pathname.split("/")[3];
	const guild = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data)
			? state.guilds.data.find((x) => x.id === guildId)
			: undefined,
	);
	const [searchTerm, setSearchTerm] = useState("");
	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
		console.log("searchTerm", searchTerm);
	};

	const handleOptionSelect = (optionId: string) => {
		if (optionId === "user_panel") {
			window.location.href = "/user";
		} else if (optionId === "logout") {
			window.location.href = "/logout";
		}
	};

	const options = [
		{ id: "user_panel", name: "Przejdź do user panel" },
		{ id: "logout", name: "Wyloguj" },
	];

	const getCurrentUser = useSelector(
		(state: RootState) =>
			state.user.data as unknown as {
				username: string;
				avatar: string;
				id: string;
			},
	);
	console.log("currentUser", getCurrentUser);

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
					<Select
						value={searchTerm}
						onChange={handleOptionSelect}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						className={classes.selectContainer}
						inputClassName={classes.selectInput}
						placeholder={getCurrentUser?.username}
						placeholderLogo={`https://cdn.discordapp.com/avatars/${getCurrentUser?.id}/${getCurrentUser?.avatar}.png`}
						disableSearch={true}
					>
						{options.map((option) => (
							<SelectOption key={option.id} value={option.name}>
								{option.name}
							</SelectOption>
						))}
					</Select>
				</div>
			</nav>
		</>
	);
};

export default navbar;
