import React, { useState } from "react";
import classes from "./custombot-radio-settings.module.css";
import { useParams } from "react-router-dom";
import VoiceChannelsSelect from "../dropdowns/radio-voice-channel";

const CustombotRadioSettings = () => {
	const [settings, setSettings] = useState({
		radioVoiceChannel: "",
		radioStation: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSettings((prevSettings) => ({
			...prevSettings,
			[name]: value,
		}));
	};
	const { id } = useParams<{ id: string }>();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/guilds/${id}/custombots/settings/add`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						radioVoiceChannel: settings.radioVoiceChannel,
						radioStation: settings.radioStation,
					}),
				},
			);

			if (response.ok) {
				const data = await response.json();
				console.log("new data", data);
			} else {
				console.error("Failed to add custombot settings");
			}
		} catch (e) {
			console.error("Error adding custombot settings:", e);
		}
	};

	return (
		<div>
			<VoiceChannelsSelect />
		</div>
	);
};

export default CustombotRadioSettings;
