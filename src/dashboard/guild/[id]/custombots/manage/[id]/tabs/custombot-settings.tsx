import { useState, useEffect } from "react";
import classes from "./tabs.module.css";
import Select, {
	SelectOption,
} from "../../../../../../../components/ui/inputs/search";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Slider from "@/components/ui/inputs/slider";

const CustombotSettingsTabs = () => {
	const [activeTab, setActiveTab] = useState("Chatbot");
	const [modelList, setModelList] = useState<{
		models: { id: string; name: string }[];
	}>({ models: [] });
	const [promptInput, setPromptInput] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [modelSearchTerm, setModelSearchTerm] = useState("");
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

	const fetchModels = async (searchTerm: string) => {
		const url = `/huggingface/models-json?sort=trending&search=${encodeURIComponent(
			searchTerm,
		)}&withCount=true`;

		fetch(url)
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return setModelList(await response.json());
			})
			.catch((error) => {
				console.error("Error fetching huggingface models:", error);
			});
	};

	useEffect(() => {
		if (modelSearchTerm) {
			fetchModels(modelSearchTerm);
		}
	}, [modelSearchTerm]);

	const filteredModels = modelList?.models.slice(0, 5);

	const handleModelSearchChange = (value: string) => {
		setModelSearchTerm(value);
	};

	const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPromptInput(event.target.value);
	};

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
				{activeTab === "Chatbot" && (
					<div>
						<div className={classes.chatbotTabContent}>
							<div className={classes.column}>
								<div className={classes.chatbotSettingBox}>
									<p
										className={
											classes.chatbotSettingBoxTitle
										}
									>
										CHANNEL
									</p>
									<div
										className={
											classes.chatbotSettingBoxContent
										}
									>
										<Select
											value={searchTerm}
											onChange={handleSearchChange}
											searchTerm={searchTerm}
											setSearchTerm={setSearchTerm}
											className={classes.selectContainer}
											placeholder="Search for a channel"
											inputClassName={
												classes.inputContainer
											}
											indicatorClassName={
												classes.indicator
											}
											disableSearch={false}
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

								<div className={classes.chatbotSettingBox}>
									<p
										className={
											classes.chatbotSettingBoxTitle
										}
									>
										PROMPT
									</p>
									<div
										className={
											classes.chatbotSettingBoxContent
										}
									>
										<input
											type="text"
											value={promptInput}
											onChange={handlePromptChange}
											className={classes.promptInput}
										/>
									</div>
								</div>

								<div className={classes.chatbotSettingBox}>
									<p
										className={
											classes.chatbotSettingBoxTitle
										}
									>
										MODEL
									</p>
									<div
										className={
											classes.chatbotSettingBoxContent
										}
									>
										<Select
											value={modelSearchTerm}
											onChange={handleModelSearchChange}
											searchTerm={modelSearchTerm}
											setSearchTerm={setModelSearchTerm}
											inputClassName={
												classes.inputContainer
											}
											className={classes.selectContainer}
											placeholder="Search for a model"
											indicatorClassName={
												classes.indicator
											}
										>
											{filteredModels.map((model) => (
												<SelectOption
													key={model.id}
													value={model.id}
												>
													{model.id}
												</SelectOption>
											))}
										</Select>
									</div>
								</div>
							</div>

							<div className={classes.column}>
								<div className={classes.chatbotSettingBox}>
									<p
										className={
											classes.chatbotSettingBoxTitle
										}
									>
										MAX TOKENS
									</p>
									<div
										className={
											classes.chatbotSettingBoxContent
										}
									>
										<Slider
											min={1}
											max={4096}
											initialValue={2048}
											className={classes.sliderContainer}
											inputClassName={
												classes.sliderInputContainer
											}
											rageClassName={
												classes.sliderRangeContainer
											}
										/>
									</div>
								</div>

								<div className={classes.chatbotSettingBox}>
									<p
										className={
											classes.chatbotSettingBoxTitle
										}
									>
										TEMPERATURE
									</p>
									<div
										className={
											classes.chatbotSettingBoxContent
										}
									>
										{/* Dodaj tutaj suwaki lub inne elementy */}
									</div>
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
