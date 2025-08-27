import classes from "./tabs.module.css";
import React, { useEffect, useState } from "react";
import Switch from "@/components/ui/selectors/switch";
import { SelectOption } from "@/components/ui/inputs/search";
import InputType from "@/components/ui/inputs/input";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, AppDispatch } from "@/store";
import { fetchChannels } from "@/features/channels";
import { useTranslation } from "react-i18next";
import SearchSelect from "@/components/ui/inputs/search";
import hashtagIcon from "@/assets/icons/hashtag.svg";
import tagIcon from "@/assets/icons/tag.svg";
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
		(state: RootState) => state.channels.areChannelsFetched,
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

	const filteredChannels = channels.filter((channel) => {
		return (
			channel.type === "GuildText" &&
			channel.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	});

	return (
		<SettingField title={`${purpose} CHANNEL`}>
			<div className={classes.inputContainer}>
				<SearchSelect
					value={searchTerm}
					onChange={handleSearchChange}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					placeholderIcon={hashtagIcon}
					inputStyle={classes.searchSelectInput}
					placeholderStyle={classes.searchSelectPlaceholder}
				>
					{filteredChannels.map((channel) => (
						<SelectOption key={channel.id} value={channel.name}>
							{channel.name}
						</SelectOption>
					))}
				</SearchSelect>
			</div>
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
			<div className={classes.inputContainer}>
				<InputType
					onChange={handleChange}
					type="text"
					value={value}
					className={classes.typeInputStyle}
					placeholderIcon={tagIcon}
				/>
			</div>
		</SettingField>
	);
};

const WelcomingTabs = () => {
	const [activeTab, setActiveTab] = useState("Greetings");
	const handleTabClick = (tab) => setActiveTab(tab);

	const ImageToggle = ({ label }) => (
		<p className={classes.imageBackgroundBoolean}>
			<Switch />
			{label}
		</p>
	);

	const { t } = useTranslation();
	return (
		<div>
			<div className={classes.container}>
				<div className={classes.sectionStart}>
					<p className={classes.sectionTitle}>
						{" "}
						{t("ui.titles.greetings_goodbyes")}
						<div className={classes.underlineVector}></div>
					</p>
				</div>
				<div className={classes.tabsContainer}>
					<button
						className={
							activeTab === "Greetings"
								? classes.activeTab
								: classes.inactiveTab
						}
						onClick={() => handleTabClick("Greetings")}
					>
						{t("ui.tabs.greetings")}
					</button>
					<button
						className={
							activeTab === "Goodbyes"
								? classes.activeTab
								: classes.inactiveTab
						}
						onClick={() => handleTabClick("Goodbyes")}
					>
						{t("ui.tabs.goodbyes")}
					</button>
				</div>

				<div className={classes.tabContent}>
					{activeTab === "Greetings" && (
						<div>
							<ImageToggle label="Greetings image" />
							<ChannelSelector purpose="WELCOME" />
							<TextField title="WELCOME TITLE" />
						</div>
					)}

					{activeTab === "Goodbyes" && (
						<div>
							<ImageToggle label="Farewell image" />
							<ChannelSelector purpose="GOODBYE" />
							<TextField title="GOODBYE TITLE" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default WelcomingTabs;
