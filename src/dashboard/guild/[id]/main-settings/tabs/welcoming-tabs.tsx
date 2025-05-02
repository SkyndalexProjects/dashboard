import classes from "./tabs.module.css";
import React, { useState } from "react";
import Switch from "@/components/ui/inputs/switch";
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
						<div className={classes.boolean}>
							<p className={classes.imageBackgroundBoolean}>
								{" "}
								<Switch switchClassName={classes.switch} knobClassName={classes.knob} />
								Greetings image
							</p>
						</div>
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
};

export default WelcomingTabs;
