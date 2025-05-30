import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import classes from "./custombots.module.css";
import InputType from "@/components/ui/inputs/input";
import SearchSelect, { SelectOption } from "@/components/ui/inputs/search";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState, useEffect } from "react";

export default function Page() {
	const [, setError] = useState("");
	const [token, setToken] = useState("");
	const [activity, setActivity] = useState("");
	const [status, setStatus] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const navigate = useNavigate();
	const user = useSelector(
		(state: RootState) =>
			state.user.data as unknown as {
				username: string;
				avatar: string;
				id: string;
			},
	);

	const { id } = useParams<{ id: string }>();
	const userId = user.id;
	const redirectUser = async () => {
		try {
			// @ts-ignore
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

	{
		/* TEST VERSION - WARNING: NO VALIDATION YET */
	}
	const handleSaveButton = async () => {
		try {
			// @ts-ignore
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/guilds/${id}/custombots/add`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						guildId: id,
						token,
						activity,
						status,
						value: "custombot_created",
						userId,
						clientId: atob(token.split(".")[0]),
					}),
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
	};
	return (
		<div>
			<Navbar />
			<Sidebar />

			<div className={classes.alert}>
				<img src="/warning-icon.svg" alt="Alert" />
				You don’t have any custombots. Please create one
			</div>

			<div className={classes.container}>
				<p className={classes.title}> Custombot details </p>

				<div className={classes.inputContainer}>
					Token
					<InputType
						onChange={handleTokenChange}
						type={"password"}
						className={classes.input}
					/>
				</div>
				<div className={classes.inputContainer}>
					Activity type
					<InputType
						onChange={handleTokenChange}
						type={"text"}
						className={classes.input}
					/>
				</div>
				<div className={classes.inputContainer}>
					Status
					<InputType
						onChange={handleTokenChange}
						type={"text"}
						className={classes.input}
					/>
				</div>

				<button
					onClick={handleSaveButton}
					className={classes.saveButton}
				>
					{" "}
					Save{" "}
				</button>
			</div>
		</div>
	);
}
