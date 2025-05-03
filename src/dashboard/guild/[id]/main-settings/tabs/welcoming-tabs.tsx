import classes from "./tabs.module.css";
import React, { useState } from "react";
import Switch from "@/components/ui/inputs/switch";

import Select, {
	SelectOption,
} from "@/components/ui/inputs/search";
import {useSelector} from "react-redux";
import type {RootState} from "@/store";
const WelcomingTabs = () => {
	const [activeTab, setActiveTab] = useState("Greetings");
	const [searchTerm, setSearchTerm] = useState("");
	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
		console.log("searchTerm", searchTerm);
	};
	const channels = useSelector((state: RootState) => state.channels.data);

	const filteredChannels = channels
		.filter((channel) =>
			channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
		)
		.slice(0, 5);
	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};
	interface SettingProps {
		name: string;
	}

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
								<Switch switchClassName={classes.switch} knobClassName={classes.knob} />
								Greetings image
							</p>

						<TabSetting name={"WELCOME CHANNEL"} />
						<TabSetting name={"WELCOME TITLE"} />
						<TabSetting name={"WELCOME DESCRIPTION"} />

					</div>
				)}
				{activeTab === "Goodbyes" && (
					<div>
						<p className={classes.imageBackgroundBoolean}>
							{" "}
							<Switch switchClassName={classes.switch} knobClassName={classes.knob} />
							Farewell image
						</p>
					</div>
				)}
			</div>


		</div>
	);

	// TODO: split this to the more functions and make better handling

	function TabSetting({ name }: SettingProps): React.JSX.Element {
		return (
			<div className={classes.setting}>
				<div className={classes.settingOverlay}>
					<p className={classes.overlayTitle}>{name}</p>

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
							<SelectOption key={channel.id} value={channel.name}>
								{channel.name}
							</SelectOption>
						))}
					</Select>
				</div>
			</div>
		);
	}
};

export default WelcomingTabs;
