import { useState } from "react";
import classes from "./tabs.module.css";

const CustombotSettingsTabs = () => {
	const [activeTab, setActiveTab] = useState("Chatbot");

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div>
			<div className={classes.tabsContainer}>
				<button
					className={
						activeTab === "Chatbot"
							? classes.activeTab
							: classes.inactiveTab
					}
					onClick={() => handleTabClick("Chatbot")}
				>
					Chatbot
				</button>
				<button
					className={
						activeTab === "Radio"
							? classes.activeTab
							: classes.inactiveTab
					}
					onClick={() => handleTabClick("Radio")}
				>
					Radio
				</button>
			</div>
			<div className={classes.tabContent}>
				{activeTab === "Chatbot" && <div>Chatbot Content</div>}
				{activeTab === "Radio" && <div>Radio Content</div>}
			</div>
		</div>
	);
};

export default CustombotSettingsTabs;
