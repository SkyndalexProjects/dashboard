import classes from "./tabs.module.css";
import React, { useEffect, useState } from "react";
import Switch from "@/components/ui/inputs/switch";

import Select, { SelectOption } from "@/components/ui/inputs/search";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, AppDispatch } from "@/store";
import { fetchUser } from "@/thunks/user";
import { fetchGuilds } from "@/thunks/guilds";
import { fetchChannels } from "@/thunks/channels";
import InputType from "@/components/ui/inputs/input";
const WelcomingTabs = () => {
	const [activeTab, setActiveTab] = useState("Greetings");

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div>
			<div className={classes.tabsContainer}>
				<button
					className={
						activeTab === "Greetings"
							? classes.activeTab
							: classes.inactiveTab
					}
					onClick={() => handleTabClick("Greetings")}
				>
					Greetings
				</button>
				<button
					className={
						activeTab === "Goodbyes"
							? classes.activeTab
							: classes.inactiveTab
					}
					onClick={() => handleTabClick("Goodbyes")}
				>
					Goodbyes
				</button>
			</div>
			<div className={classes.tabContent}>
				{activeTab === "Greetings" && (
					<div>
						<p className={classes.imageBackgroundBoolean}>
							{" "}
							<Switch
								switchClassName={classes.switch}
								knobClassName={classes.knob}
							/>
							Greetings image
						</p>

						<WelcomeChannel />
						<Title />
						<Description />
					</div>
				)}
				{activeTab === "Goodbyes" && (
					<div>
						<p className={classes.imageBackgroundBoolean}>
							{" "}
							<Switch
								switchClassName={classes.switch}
								knobClassName={classes.knob}
							/>
							Farewell image
						</p>
					</div>
				)}
			</div>
		</div>
	);

	function WelcomeChannel(): React.JSX.Element {
		const dispatch = useDispatch<AppDispatch>();
		const [searchTerm, setSearchTerm] = useState("");
		const handleSearchChange = (value: string) => {
			setSearchTerm(value);
			console.log("searchTerm", searchTerm);
		};
		const channels = useSelector((state: RootState) => state.channels.data);

		const haveChannelsFetched = useSelector(
			(state: RootState) => state.channels.areChannelsFetched,
		);

		const guildId = location.pathname.split("/")[3];

		useEffect(() => {
			if (!haveChannelsFetched) {
				dispatch(fetchChannels(guildId));
			}
		}, []);
		const filteredChannels = channels
			.filter((channel) =>
				channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
			)
			.slice(0, 5);

		return (
			<div>
				<div className={classes.setting}>
					<div className={classes.settingOverlay}>
						<p className={classes.overlayTitle}>WELCOME CHANNEL</p>

						<Select
							value={searchTerm}
							onChange={handleSearchChange}
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
							className={classes.selectContainer}
							placeholder="Search for a channel"
							inputClassName={classes.inputContainer}
							indicatorClassName={classes.indicator}
							disableSearch={false}
						>
							{filteredChannels.map((channel: Channel) => (
								<SelectOption
									key={channel.id}
									value={channel.name}
								>
									{channel.name}
								</SelectOption>
							))}
						</Select>
					</div>
				</div>
			</div>
		);
	}
	function Title(): React.JSX.Element {
		const [setStatus] = useState("");

		const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			// @ts-ignore
			setStatus(e.target.value);
		};

		return (
			<div>
				<div className={classes.setting}>
					<div className={classes.settingOverlay}>
						<p className={classes.overlayTitle}>WELCOME TITLE</p>

						<InputType
							onChange={handleSymbolChange}
							className={classes.inputContainer}
							type="text"
						/>
					</div>
				</div>
			</div>
		);
	}
	function Description(): React.JSX.Element {
		const [setStatus] = useState("");

		const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			// @ts-ignore
			setStatus(e.target.value);
		};

		return (
			<div>
				<div className={classes.setting}>
					<div className={classes.settingOverlay}>
						<p className={classes.overlayTitle}>
							WELCOME DESCRIPTION
						</p>

						<InputType
							onChange={handleSymbolChange}
							className={classes.inputContainer}
							type="text"
						/>
					</div>
				</div>
			</div>
		);
	}
};

export default WelcomingTabs;
