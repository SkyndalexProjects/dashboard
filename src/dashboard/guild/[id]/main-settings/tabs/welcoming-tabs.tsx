import classes from "./tabs.module.css";
import React, { useEffect, useState } from "react";
import Switch from "@/components/ui/inputs/switch";
import Select, { SelectOption } from "@/components/ui/inputs/search";
import InputType from "@/components/ui/inputs/input";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, AppDispatch } from "@/store";
import { fetchChannels } from "@/thunks/channels";

const SettingField = ({ title, children }) => (
	<div className={classes.setting}>
		<div className={classes.settingOverlay}>
			<p className={classes.overlayTitle}>{title}</p>
			{children}
		</div>
	</div>
);

const ChannelSelector = ({ purpose }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [searchTerm, setSearchTerm] = useState("");
	const channels = useSelector((state: RootState) => state.channels.data);
	const haveChannelsFetched = useSelector(
		(state: RootState) => state.channels.areChannelsFetched
	);
	const guildId = location.pathname.split("/")[3];

	useEffect(() => {
		if (!haveChannelsFetched) {
			dispatch(fetchChannels(guildId));
		}
	}, [haveChannelsFetched, dispatch, guildId]);

	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
	};

	const filteredChannels = channels
		.filter((channel) =>
			channel.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.slice(0, 5);

	return (
		<SettingField title={`${purpose} CHANNEL`}>
			<Select
				value={searchTerm}
				onChange={handleSearchChange}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				className={classes.selectContainer}
				placeholder={`Search for a ${purpose.toLowerCase()} channel`}
				inputClassName={classes.inputContainer}
				indicatorClassName={classes.indicator}
				disableSearch={false}
			>
				{filteredChannels.map((channel) => (
					<SelectOption key={channel.id} value={channel.name}>
						{channel.name}
					</SelectOption>
				))}
			</Select>
		</SettingField>
	);
};

const TextField = ({ title }) => {
	const [value, setValue] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<SettingField title={`${title}`}>
			<InputType
				onChange={handleChange}
				className={classes.inputContainer}
				type="text"
				value={value}
			/>
		</SettingField>
	);
};

const WelcomingTabs = () => {
	const [activeTab, setActiveTab] = useState("Greetings");

	const handleTabClick = (tab) => setActiveTab(tab);

	const ImageToggle = ({ label }) => (
		<p className={classes.imageBackgroundBoolean}>
			<Switch
				switchClassName={classes.switch}
				knobClassName={classes.knob}
			/>
			{label}
		</p>
	);

	return (
		<div>
			<div className={classes.tabsContainer}>
				<button
					className={activeTab === "Greetings" ? classes.activeTab : classes.inactiveTab}
					onClick={() => handleTabClick("Greetings")}
				>
					Greetings
				</button>
				<button
					className={activeTab === "Goodbyes" ? classes.activeTab : classes.inactiveTab}
					onClick={() => handleTabClick("Goodbyes")}
				>
					Goodbyes
				</button>
			</div>

			<div className={classes.tabContent}>
				{activeTab === "Greetings" && (
					<div>
						<ImageToggle label="Greetings image" />
						<ChannelSelector purpose="WELCOME" />
						<TextField title="WELCOME TITLE" />
						<TextField title="WELCOME DESCRIPTION" />
					</div>
				)}

				{activeTab === "Goodbyes" && (
					<div>
						<ImageToggle label="Farewell image" />
						<ChannelSelector purpose="GOODBYE" />
						<TextField title="GOODBYE TITLE" />
						<TextField title="GOODBYE DESCRIPTION" />
					</div>
				)}
			</div>
		</div>
	);
};

export default WelcomingTabs;