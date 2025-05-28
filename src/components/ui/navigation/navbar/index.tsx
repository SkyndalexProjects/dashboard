import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import classes from "./navbar.module.css";
import { useState, useEffect, useRef } from "react";
import { fetchGuilds } from "@/thunks/guilds";
import { fetchUser } from "@/thunks/user";
import ChooseGuildModal from "@/components/ui/navigation/navbar/modals/ChooseGuild";
import Dropdown, { DropdownOption } from "../../inputs/dropdown";
const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const getCurrentUser = useSelector(
		(state: RootState) => state.user.data as unknown as User,
	);
	const guildId = location.pathname.split("/")[3];
	const isInitialFetch = useRef(true);
	const haveGuildsFetched = useSelector(
		(state: RootState) => state.guilds.haveGuildsFetched,
	);
	const isUserFetched = useSelector(
		(state: RootState) => state.user.isUserFetched,
	);
	const getCurrentGuild = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data)
			? state.guilds.data.find((x) => x.id === guildId)
			: undefined,
	);

	useEffect(() => {
		if (isInitialFetch.current) {
			if (!haveGuildsFetched) {
				dispatch(fetchGuilds());
			}
			if (!isUserFetched) {
				dispatch(fetchUser());
			}
			isInitialFetch.current = false;
		}
	}, [haveGuildsFetched, isUserFetched, dispatch]);

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
					<Dropdown
						placeholder={getCurrentUser?.username}
						placeholderIcon={`https://cdn.discordapp.com/avatars/${getCurrentUser?.id}/${getCurrentUser?.avatar}.png`}
					>
						{options.map((option) => (
							<DropdownOption key={option.id} value={option.id}>
								{option.name}
							</DropdownOption>
						))}
					</Dropdown>
				</div>
			</nav>
			<ChooseGuildModal isOpen={isModalOpen} onClose={closeModal} />
		</>
	);
};

export default Navbar;
