import React, { useEffect, useRef } from "react";
import classes from "./modals.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchGuilds } from "@/thunks/guilds";

const ChooseGuildModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;
	const dispatch = useAppDispatch();
	const haveGuildsFetched = useAppSelector(
		(state) => state.guilds.haveGuildsFetched,
	);
	const guildsList = useAppSelector((state) => state.guilds.data);
	const isInitialFetch = useRef(true);

	useEffect(() => {
		if (isInitialFetch.current) {
			if (!haveGuildsFetched) {
				dispatch(fetchGuilds());
			}
			isInitialFetch.current = false;
		}
	}, [haveGuildsFetched, dispatch]);

	const filteredGuilds = guildsList.filter(
		(guild) =>
			(BigInt(guild.permissions) & BigInt(0x20)) === BigInt(0x20) &&
			guild.isBotAdded,
	);
	const currentUser = useSelector(
		(state: RootState) => state.user.data,
	) as unknown as User;
	const navigate = useNavigate();

	const generateUserAvatar = `https://cdn.discordapp.com/avatars/${currentUser?.id}/${currentUser?.avatar}.webp`;
	const handleGuildClick = (guild: {
		id: string;
		name: string;
		icon: string;
	}) => {
		const currentPage = window.location.pathname
			.split("/")
			.slice(4)
			.join("/");
		const hasNumber = /\d/.test(currentPage);
		if (hasNumber) {
			navigate(`/dashboard/guild/${guild.id}/home`, { replace: true });
		} else {
			navigate(`/dashboard/guild/${guild.id}/${currentPage}`, {
				replace: true,
			});
		}
		onClose();
	};

	return (
		<div className={classes.modalOverlay}>
			<div className={classes.modalContent}>
				<button onClick={onClose} className={classes.closeButton}>
					X
				</button>

				<div className={classes.loggedIn}>
					{" "}
					Logged in as
					<img
						src={generateUserAvatar}
						alt="avatar"
						className={classes.avatar}
					/>
					{currentUser?.username}
				</div>

				<div className={classes.guildList}>
					{filteredGuilds.map((guild) => {
						const generateGuildIcon = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`;
						return (
							<button
								key={guild.id}
								className={classes.guildItem}
								onClick={() => handleGuildClick(guild)}
							>
								<img
									src={generateGuildIcon}
									alt="Guild Icon"
									className={classes.guildIcon}
									onError={(e) => {
										e.currentTarget.src =
											"/default_guild_icon.png";
									}}
								/>
								<p className={classes.guildName}>
									{guild.name}
									<img
										src={"/indicator.svg"}
										alt="indicator.svg"
										className={classes.redirectArrow}
									/>
								</p>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default ChooseGuildModal;
