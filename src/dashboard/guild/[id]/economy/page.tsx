import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import classes from "./economy.module.css";
import InputType from "@/components/ui/inputs/input";
import React, { useState } from "react";
import Switch from "@/components/ui/inputs/switch";
import CommandsTabs from "@/dashboard/guild/[id]/economy/commands-settings/commands-settings";

interface SettingProps {
	name: string;
	children: React.ReactNode;
}

const Setting: React.FC<SettingProps> = ({ name, children }) => {
	return (
		<div>
			<p className={classes.settingTitle}>{name}</p>
			{children}
		</div>
	);
};

interface SectionProps {
	title: React.ReactNode;
	children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
	return (
		<div className={classes.settingsMoneySection}>
			<div className={classes.sectionTitle}>
				{title}
				<div className={classes.underlineVector}></div>
			</div>
			<div className={classes.settingRow}>{children}</div>
		</div>
	);
};
export default function Economy() {
	return (
		<div>
			<Navbar />
			<Sidebar />

			<Section title="Money settings">
				<SymbolSetting />
				<StartingPointSetting />
				<AdditionalSettings />
			</Section>

			<Section title="Commands settings">
				<CommandsSettings />
			</Section>
		</div>
	);
}
function SymbolSetting() {
	const [symbol, setSymbol] = useState("$");

	const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSymbol(e.target.value);
	};

	return (
		<div className={classes.setting}>
			<Setting name="Symbol">
				<InputType
					value={symbol}
					onChange={handleSymbolChange}
					placeholder="$"
					type="text"
					className={classes.input}
				/>
			</Setting>
		</div>
	);
}

function StartingPointSetting() {
	const [startingAmount, setStartingAmount] = useState("100");
	const [isForBank, setIsForBank] = useState(false);

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStartingAmount(e.target.value);
	};

	const handleToggleChange = (isChecked: boolean) => {
		setIsForBank(isChecked);
	};

	return (
		<div className={classes.setting}>
			<Setting name="Starting point">
				<InputType
					value={startingAmount}
					onChange={handleAmountChange}
					placeholder="100"
					type="text"
					className={classes.input}
				/>
			</Setting>
		</div>
	);
}
function AdditionalSettings() {
	return (
		<div className={classes.additionalSettings}>
			<Setting name="Additional Settings">
				<div className={classes.additionalSettingsRow}>
					Enable rob system
					<Switch />
				</div>
				<div className={classes.additionalSettingsRow}>
					Clear money after leaving the guild
					<Switch />
				</div>
			</Setting>
		</div>
	);
}
function CommandsSettings() {
	return (
		<div className={classes.commandsSettings}>
			<CommandsTabs />
		</div>
	);
}
