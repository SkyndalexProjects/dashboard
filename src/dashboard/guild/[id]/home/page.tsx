import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import BetaWarning from "@/components/ui/alerts/beta-warning";
import JoinSupportAlert from "@/components/ui/alerts/support-join-warning";
import classes from "./home.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeTabs from "./hometabs/changelog-switch";
import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"

interface SettingContainerProps {
	title: string;
	children?: React.ReactNode;
}
interface Logs {
	id: number;
	userId: string;
	username: string;
	avatar: string;
	guildId: string;
	value: string;
	date: string;
}

const SettingContainer = ({
	title,
	children,
}: SettingContainerProps & { children?: React.ReactNode }) => (
	<div className={classes.container}>
		<p className={classes.containerTitle}>{title}</p>
		{children}
	</div>
);
export default function Page() {
	const [logs, setLogs] = useState<Logs[]>([]);
	const { id } = useParams<{ id: string }>();

	const logValues: { [key: string]: string } = {
		custombot_created: "Custom bot created",
		custombot_deleted: "Custom bot deleted",
	};

	async function fetchUser(userId: string) {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/users/${userId}/info`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ id: userId }),
				},
			);
			if (!response.ok) {
				console.error(`Failed to fetch user with ID: ${userId}`);
			}
			const users = await response.json();
			return users[0];
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	useEffect(() => {
		(async () => {
			try {
				console.log("Fetching user");

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/guilds/${id}/logs`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ id }),
					},
				);

				if (!response.ok) {
					console.error("Failed to fetch logs");
				}

				const data = await response.json();

				const updatedLogs: Logs[] = [];
				for (const log of data) {
					console.log("log", log);
					const user = await fetchUser(log.userId);
					console.log("fetched user", user);
					updatedLogs.push({
						...log,
						username: user.username,
						avatar: user.avatar,
					});
				}
				setLogs(updatedLogs);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [id]);

	// TODO: handling

	const options: ApexOptions = {
		series: [
			{
				name: "Economy Income",
				data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
			},
		],
		chart: {
			height: 350,
			type: "line",
			zoom: { enabled: true },
			background: "none",
			toolbar: { show: false },
		},
		dataLabels: { enabled: false },
		stroke: {
			width: [3, 3, 3],
			curve: "smooth",
			dashArray: [11],
		},
		legend: {
			show: false,
		},
		xaxis: {
			categories: [
				"JAN", "FEB", "MAR", "APR", "MAY", "JUN",
				"JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
			],
			labels: {
				style: { colors: "#615E83", fontSize: "14" },
			},
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
		},
		yaxis: {
			labels: {
				style: { colors: "#615E83", fontSize: "16"},
			},
		},
		grid: {
			borderColor: "#E5E5EF",
			strokeDashArray: 0,
		},
		tooltip: {
			theme: "dark",
		},
		colors: ["#27E761"],
	};

	const updatedOptions = {
		...options,
		colors: ["#AE4634"]
	}

	return (
		<div>
			<Navbar />
			<Sidebar />

			<div className={classes.alerts}>
				<BetaWarning />
				<JoinSupportAlert />
			</div>

			<div className={classes.container}>
				<div className={classes.header}>
					<p className={classes.title}>Statistics</p>
					<p className={classes.subtitle}>
						Total economy earnings
					</p>
				</div>
				<div className={classes.chartContainer}>
					{/**
					 ApexCharts has problem with typescript types unfortunately
					 **/
					 }

					{/* @ts-ignore */ }
					<ReactApexChart
						options={options}
						series={options.series}
						type="line"
						height={275}
					/>
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.header}>
					<p className={classes.title}>Statistics</p>
					<p className={classes.subtitle}>
						Total economy loss
					</p>
				</div>
				<div className={classes.chartContainer}>
					{/* @ts-ignore */ }
					<ReactApexChart
						options={updatedOptions}
						series={options.series}
						type="line"
						height={275}
					/>
				</div>
			</div>
			<div className={classes.dashboardLogContainer}>
				<p className={classes.dashboardLogSectionTitle}>
					{" "}
					Dashboard log
					<svg
						width="153"
						height="4"
						viewBox="0 0 185 4"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							flexShrink: 0,
							strokeWidth: 4,
							stroke: "#275EE7",
						}}
						className={classes.sectionTitleVector}
					>
						<line x1="0" y1="2" x2="185" y2="2" />
					</svg>
				</p>
				<div className={classes.logTableContainer}>
					<table className={classes.logTable}>
						<thead>
							<tr>
								<th>User</th>
								<th>Action</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							{logs.map((log) => (
								<tr key={log.id}>
									<td>
										<div>
											<img
												src={`https://cdn.discordapp.com/avatars/${log.userId}/${log.avatar}.webp?size=128`}
												alt={`avatar`}
												className={classes.avatar}
											/>
											<p className={classes.tUsername}>
												{log.username}
											</p>
										</div>
									</td>
									<td>
										<p className={classes.tValue}>
											{logValues[log.value] || log.value}

											<button
												className={classes.valueDetails}
											>
												View details
											</button>
										</p>
									</td>
									<td>
										<div className={classes.dateContainer}>
											<p className={classes.tDate}>
												{new Date(log.date)
													.toLocaleDateString(
														"en-US",
														{
															day: "2-digit",
															month: "2-digit",
															year: "numeric",
														},
													)
													.replace(/\//g, ".")}
											</p>
											<p className={classes.tHour}>
												{new Date(
													log.date,
												).toLocaleTimeString("en-US", {
													hour: "2-digit",
													minute: "2-digit",
													timeZone: "UTC",
												})}
											</p>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className={classes.recentChangesContainer}>
				<p className={classes.recentChangesSectionTitle}>
					{" "}
					Recent changes
					<svg
						width="166"
						height="4"
						viewBox="0 0 185 4"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							flexShrink: 0,
							strokeWidth: 4,
							stroke: "#275EE7",
						}}
						className={classes.sectionTitleVector}
					>
						<line x1="0" y1="2" x2="185" y2="2" />
					</svg>
				</p>

				<div className={classes.recentChangesTableContainer}>
					<HomeTabs />
				</div>
			</div>
		</div>
	);
}
