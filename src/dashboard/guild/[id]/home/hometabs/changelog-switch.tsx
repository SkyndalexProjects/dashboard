import classes from "./hometabs.module.css";
import { useState } from "react";
const HomeTabs = () => {
	const [activeTab, setActiveTab] = useState("Dashboard");
	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};
	return (
		<div>
			<div className={classes.tabsContainer}>
				<button
					className={
						activeTab === "Dashboard"
							? classes.activeTab
							: classes.inactiveTab
					}
					onClick={() => handleTabClick("Dashboard")}
				>
					Dashboard
				</button>

				<button
					className={
						activeTab === "Bot"
							? classes.activeTab
							: classes.inactiveTab
					}
					onClick={() => handleTabClick("Bot")}
				>
					Bot
				</button>
			</div>

			<div className={classes.tabContent}>
				{activeTab === "Dashboard" && (
					<div>
						<p className={classes.tabContentTitle}>
							Dashboard Content
						</p>
						<p className={classes.tabContentDescription}>
							This is the content for the Dashboard tab.
						</p>
					</div>
				)}
				{activeTab === "Bot" && (
					<div>
						<p className={classes.tabContentTitle}>Bot Content</p>
						<p className={classes.tabContentDescription}>
							This is the content for the Bot tab.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default HomeTabs;
