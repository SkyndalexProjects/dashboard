import classes from "./tabs.module.css";
import { useState } from "react";
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
						<p> Test content </p>
					</div>
				)}
				{activeTab === "Goodbyes" && (
					<div>
						<p> Test content 2 </p>
					</div>
				)}
			</div>
		</div>
	);
};

export default WelcomingTabs;
