import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import classes from "./custombots.module.css";
import InputType from "@/components/ui/inputs/input";
import SearchSelect from "@/components/ui/inputs/search";
import { SelectOption } from "@/components/ui/inputs/search";
import { useParams, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

export default function Page() {
	const [, setError] = useState("");
	const [token, setToken] = useState("");
	const [activity, setActivity] = useState("");
	const [status, setStatus] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const redirectUser = async () => {		
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/guilds/${id}/custombots/get`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ id }),
				},
			);

			if (response.ok) {
				const data = await response.json();

				if (data.length >= 1) {
					navigate(`/dashboard/guild/${id}/custombots/list`);
				}
			} else {
				console.error("Failed to fetch custombots");
				setError("Failed to fetch custombots");
			}
		} catch (error) {
			console.error("Error fetching custombots:", error);
			setError("Error fetching custombots");
		}
	};

	useEffect(() => {
		redirectUser();
	}, [id]);
	const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToken(e.target.value);
	};

	const handleActivityChange = (value: string) => {
		setActivity(value);
	};
	const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStatus(e.target.value);
	};

			{/* TEST VERSION - WARNING: NO VALIDATION YET */ }
	const handleSaveButton = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/guilds/${id}/custombots/add`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ guildId: id, token, activity, status }),
				},
			);

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				useEffect(() => {
					redirectUser();
				}, [id]);
			} else {
				console.error("Failed to create custombot");
				setError("Failed to create custombot");
			}
		} catch (error) {
			console.error("Error creating custombot:", error);
			setError("Error creating custombot");
		}
	}
	return (
		<div>
			<Navbar />
			<Sidebar />

			<div className={classes.noCustombotsWarningContainer}></div>
			<div className={classes.container}>
				<p className={classes.title}>Custombot details</p>
				<p className={classes.subtitle}> Bot token </p>

				<InputType
					onChange={handleTokenChange}
					placeholder="Bot token"
					placeholderLogo="/key.svg"
					placeholderLogoClassName={classes.placeholderLogo}
					className={classes.tokenInput}
					type="password"
				/>
				<p className={classes.description}> Authorize your bot </p>

				<p className={classes.subtitle}> Activity type </p>

				<SearchSelect
					value={searchTerm}
					onChange={handleActivityChange}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					inputClassName={classes.activityInput}
					indicatorClassName={classes.indicator}
					className={classes.activityInput}
				>
					{[
						{ id: "1", name: "Idle" },
						{ id: "2", name: "Do not Disturb" },
						{ id: "3", name: "Online" },
					].map((channel) => (
						<SelectOption key={channel.id} value={channel.name}>
							{channel.name}
						</SelectOption>
					))}
				</SearchSelect>
				<p className={classes.description}>
					{" "}
					Select DND/Idle/Online etc.{" "}
				</p>

				<p className={classes.subtitle}> Status </p>

				<InputType
					onChange={handleStatusChange}
					placeholder="Hey! I'm a custombot, have a nice day!"
					placeholderLogo="/menu.svg"
					placeholderLogoClassName={classes.placeholderLogo}
					className={classes.tokenInput}
					type="text"
				/>

				<p className={classes.description}>
					{" "}
					Type status for activity{" "}
				</p>

				<button className={classes.button} onClick={handleSaveButton}>Save</button>
			</div>
		</div>
	);
}
