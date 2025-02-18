import { useState } from "react";
import classes from "./tabs.module.css";
import Select, { SelectOption } from "../../dropdowns/select";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const CustombotSettingsTabs = () => {
	const [activeTab, setActiveTab] = useState("Chatbot");

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	const channels = useSelector((state: RootState) => state.channels.data);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredChannels = channels
		.filter((channel) =>
			channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
		)
		.slice(0, 5);
		
		const handleSearchChange = (value: string) => {
			setSearchTerm(value);
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
				{activeTab === "Chatbot" && (
					<div>
						<div className={classes.chatbotTabContent}>
							<div
								className={
									classes.chatbotTabContentChannelSelectBox
								}
							>
								<div
									className={
										classes.chatbotChannelSelectInput
									}
								>
									<Select
										value={searchTerm}
										onChange={handleSearchChange}
										searchTerm={searchTerm}
										setSearchTerm={setSearchTerm}
									>
                                        {filteredChannels.map((channel) => (
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
					</div>
				)}
				{activeTab === "Radio" && <div>Radio Content</div>}
			</div>
		</div>
	);
};

export default CustombotSettingsTabs;
