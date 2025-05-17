import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import classes from "./navbar.module.css";
import Select, { SelectOption } from "../../inputs/search";
import { useState, useEffect } from "react";
import { fetchGuilds } from "@/thunks/guilds";
import { fetchUser } from "@/thunks/user";
import ChooseGuildModal from "@/components/ui/navigation/navbar/modals/ChooseGuild";
const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [searchTerm, setSearchTerm] = useState("");
	const getCurrentUser = useSelector(
		(state: RootState) => state.user.data as unknown as User,
	);
	const guildId = location.pathname.split("/")[3];
	const getCurrentGuild = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data)
			? state.guilds.data.find((x) => x.id === guildId)
			: undefined,
	);

	const haveUserFetched = useSelector(
		(state: RootState) => state.user.isUserFetched,
	);

	useEffect(() => {
		if (!haveUserFetched) {
			dispatch(fetchUser());
		}
		if (!getCurrentGuild) {
			dispatch(fetchGuilds());
		}
	}, []);

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

	const generateGuildIcon = `https://cdn.discordapp.com/icons/${getCurrentGuild?.id}/${getCurrentGuild?.icon}.webp`;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<>
			<nav>
				<div className={classes.navLeft}>
					<img
						className={classes.botIcon}
						src={`https://cdn.discordapp.com/avatars/1059594156839809074/f2ed3c7590d834ed2d86912124c4ee1e.webp?size=1024`}
						alt="Guild Icon"
						onError={(e) => {
							e.currentTarget.src = "/default_guild_icon.png";
						}}
					/>

					<p className={classes.navTitle}> Dashboard </p>
					<div className={classes.versionOverlay}>v0.0.0</div>
				</div>
				<button onClick={openModal} className={classes.guildChooser}>
					<img
						className={classes.guildIcon}
						src={generateGuildIcon}
						alt="Guild Icon"
						onError={(e) => {
							e.currentTarget.src = "/default_guild_icon.png";
						}}
					/>
					<p className={classes.currentGuildName}>
						{" "}
						{getCurrentGuild?.name}{" "}
					</p>
				</button>
				<div className={classes.navRight}>
					<Select
						value={searchTerm}
						onChange={handleOptionSelect}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
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
			<ChooseGuildModal isOpen={isModalOpen} onClose={closeModal} />
		</>
	);
};

export default Navbar;
