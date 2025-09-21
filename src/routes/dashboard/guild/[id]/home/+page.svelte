<script lang="ts">
	import ManagementNavbar from '$lib/components/navigation/ManagementNavbar.svelte';
	import Sidebar from '$lib/components/navigation/Sidebar.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import { linear } from 'svelte/easing';
	import { curveCatmullRom } from 'd3-shape';
	import { LineChart, Axis, Layer, Spline } from 'layerchart';
	import Tab from '$lib/components/ui/Tab.svelte';
	import type { APIUser } from 'discord-api-types/v10';
	const { data } = $props();
	console.log('data.guild', data.guild);
	function getAvatarUrl(user: APIUser) {
		if (user && user.id && user.avatar) {
			return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=1024`;
		}
	}

	const revenueData = [
		{ date: new Date('2023-02-01'), value: 0 },
		{ date: new Date('2023-03-01'), value: 30 },
		{ date: new Date('2023-04-01'), value: 25 },
		{ date: new Date('2023-05-01'), value: 5 },
		{ date: new Date('2023-06-01'), value: 20 },
		{ date: new Date('2023-07-01'), value: 35 }
	];

	const lossData = [
		{ date: new Date('2023-02-01'), value: 0 },
		{ date: new Date('2023-03-01'), value: 20 },
		{ date: new Date('2023-04-01'), value: 10 },
		{ date: new Date('2023-05-01'), value: 10 },
		{ date: new Date('2023-06-01'), value: 20 },
		{ date: new Date('2023-07-01'), value: 0 }
	];
	const logs = [
		{
			timestamp: '2024-06-01 12:00',
			event: 'custombot_created',
			description: 'Utworzono bota',
			author: data.user
		},
		{
			timestamp: '2024-06-02 15:30',
			event: 'custombot_deleted',
			description: 'Usunięto bota',
			author: data.user
		},
		{
			timestamp: '2024-06-03 09:10',
			event: 'custombot_created',
			description: 'Utworzono bota',
			author: data.user
		},
		{
			timestamp: '2024-06-02 15:30',
			event: 'custombot_deleted',
			description: 'Usunięto bota',
			author: data.user
		},
		{
			timestamp: '2024-06-03 09:10',
			event: 'custombot_created',
			description: 'Utworzono bota',
			author: data.user
		},
		{
			timestamp: '2024-06-02 15:30',
			event: 'custombot_deleted',
			description: 'Usunięto bota',
			author: data.user
		},
		{
			timestamp: '2024-06-03 09:10',
			event: 'custombot_created',
			description: 'Utworzono bota',
			author: data.user
		}
	];
	const recentChanges = [
		{ date: '2024-06-01', change: 'New version update changelog', author: data.user },
		{ date: '2024-06-02', change: 'Downtime warning!', author: data.user },
		{ date: '2024-06-02', change: 'Downtime warning!', author: data.user },
		{ date: '2024-06-02', change: 'Downtime warning!', author: data.user },
		{ date: '2024-06-02', change: 'Downtime warning!', author: data.user },
		{ date: '2024-06-02', change: 'Downtime warning!', author: data.user }
	];
	let selectedTab = $state('Dashboard');
	function handleTabSelect(tab: string) {
		selectedTab = tab;
	}
</script>

<svelte:head>
	<title>Skyndalex</title>
	<meta property="og:title" content="Skyndalex" />
	<meta property="og:description" content="Guilds selector" />
	<meta property="og:url" content="https://skyndalex.com/" />
	<meta property="og:type" content="website" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

{#await data.guilds}
	<p>Test</p>
{:then guilds}
	<ManagementNavbar guild={data.guild} user={data.user} {guilds} />
	<Sidebar guildId={data.guild.id} />
	<div class="app">
		<div class="alerts">
			<Alert type="info">
				You did not join our discord support guild. It is highly recommended to keep up to date with
				the changes in the bot that are currently being intensively carried out
			</Alert>
			<Alert type="warning">
				Dashboard is still under BETA version. Stable release will be out after v1.0.0
			</Alert>
		</div>
	</div>

	<div class="economy-charts">
		Economy charts
		<svg xmlns="http://www.w3.org/2000/svg" width="165" height="2" viewBox="0 0 165 2" fill="none">
			<path d="M0 1L165 1" stroke="#275EE7" stroke-width="2" />
		</svg>

		<div class="chart" data-slot="chart">
			<svg
				width="770"
				height="1"
				viewBox="0 0 770 1"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="chart-divider"
			>
				<line y1="0.5" x2="770" y2="0.5" stroke="#E5E5EF" />
			</svg>

			<div class="headers">
				<p class="chart-category-title">Entire guild stats</p>
				<p class="chart-title">Total economy earnings</p>
			</div>

			<div class="lines-info">
				<div class="loss">
					<svg
						width="9"
						height="9"
						viewBox="0 0 9 9"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="4.86206" cy="4.5" r="4.13794" fill="#D83C3C" />
					</svg>
					Loss
				</div>
				<div class="revenue">
					<svg
						width="9"
						height="9"
						viewBox="0 0 9 9"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="4.86206" cy="4.5" r="4.13794" fill="#27E761" />
					</svg>
					Revenue
				</div>
			</div>
			<LineChart
				x="date"
				y="value"
				series={[
					{
						data: revenueData,
						key: 'Revenue',
						color: '#27E761'
					},
					{
						data: lossData,
						key: 'Loss',
						color: '#D83C3C'
					}
				]}
				yNice
				renderContext="svg"
				padding={{ top: 150, right: 10, bottom: 40, left: 50 }}
			>
				{#snippet children({ context })}
					<Layer type="svg">
						<Axis
							placement="left"
							grid
							style="stroke: rgba(255,255,255,0.2); fill: #615E83; font-size: 15px;"
						/>
						<Axis
							placement="bottom"
							rule
							style="fill: #615E83; font-size: 15px; font-family: Inter, sans-serif; font-weight: 400;"
						/>

						<Spline
							data={revenueData}
							x="date"
							y="value"
							curve={curveCatmullRom}
							draw={{ duration: 1000, easing: linear }}
							style="stroke: #27E761; stroke-width: 3; fill: none; stroke-dasharray: 10,10;"
						/>

						<Spline
							data={lossData}
							x="date"
							y="value"
							curve={curveCatmullRom}
							draw={{ duration: 1000, easing: linear }}
							style="stroke: #D83C3C; stroke-width: 3; fill: none; stroke-dasharray: 10, 10;"
						/>
					</Layer>
				{/snippet}
			</LineChart>
			<!-- TODO: Other data than economy chart -->
			<div class="chart">
				<svg
					width="770"
					height="1"
					viewBox="0 0 770 1"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="chart-divider"
				>
					<line y1="0.5" x2="770" y2="0.5" stroke="#E5E5EF" />
				</svg>

				<div class="headers">
					<p class="chart-category-title">Entire guild stats</p>
					<p class="chart-title">Total economy earnings</p>
				</div>

				<div class="lines-info">
					<div class="loss">
						<svg
							width="9"
							height="9"
							viewBox="0 0 9 9"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="4.86206" cy="4.5" r="4.13794" fill="#D83C3C" />
						</svg>
						Loss
					</div>
					<div class="revenue">
						<svg
							width="9"
							height="9"
							viewBox="0 0 9 9"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="4.86206" cy="4.5" r="4.13794" fill="#27E761" />
						</svg>
						Revenue
					</div>
				</div>
				<LineChart
					x="date"
					y="value"
					series={[
						{
							data: revenueData,
							key: 'Revenue',
							color: '#27E761'
						},
						{
							data: lossData,
							key: 'Loss',
							color: '#D83C3C'
						}
					]}
					yNice
					renderContext="svg"
					padding={{ top: 150, right: 10, bottom: 40, left: 50 }}
				>
					{#snippet children({ context })}
						<Layer type="svg">
							<Axis
								placement="left"
								grid
								style="stroke: rgba(255,255,255,0.2); fill: #615E83; font-size: 15px;"
							/>
							<Axis
								placement="bottom"
								rule
								style="fill: #615E83; font-size: 15px; font-family: Inter, sans-serif; font-weight: 400;"
							/>

							<Spline
								data={revenueData}
								x="date"
								y="value"
								curve={curveCatmullRom}
								draw={{ duration: 1000, easing: linear }}
								style="stroke: #27E761; stroke-width: 3; fill: none; stroke-dasharray: 10,10;"
							/>

							<Spline
								data={lossData}
								x="date"
								y="value"
								curve={curveCatmullRom}
								draw={{ duration: 1000, easing: linear }}
								style="stroke: #D83C3C; stroke-width: 3; fill: none; stroke-dasharray: 10, 10;"
							/>
						</Layer>
					{/snippet}
				</LineChart>
			</div>
		</div>
	</div>
	<div class="recent-changes">
		Recent changes
		<svg xmlns="http://www.w3.org/2000/svg" width="165" height="2" viewBox="0 0 165 2" fill="none">
			<path d="M0 1L165 1" stroke="#275EE7" stroke-width="2" />
		</svg>

		<!-- TODO: fix tabs design + add icons -->

		<div class="recent-changes-container">
			<Tab tabs={['Dashboard', 'Bot']} {selectedTab} onTabSelect={handleTabSelect}>
				{#if selectedTab === 'Dashboard'}
					<div class="dashboard">
						{#each recentChanges as change}
							<div class="change-item">
								<img class="change-avatar" src={getAvatarUrl(change.author)} alt="avatar" />
								<div class="change-content">
									<p class="change-header">{change.change}</p>
									<p class="change-footer">{change.date}</p>
								</div>
							</div>
						{/each}
					</div>
				{:else if selectedTab === 'Bot'}
					<div class="bot">
						<h2>Bot Content</h2>
						<p>This is the content of the Bot tab.</p>
					</div>
				{/if}
			</Tab>
		</div>
	</div>
	<div class="dashboard-log">
		Dashboard log
		<svg xmlns="http://www.w3.org/2000/svg" width="165" height="2" viewBox="0 0 165 2" fill="none">
			<path d="M0 1L165 1" stroke="#275EE7" stroke-width="2" />
		</svg>

		<div class="dashboard-log-container">
			<table class="dashboard-log-table">
				<thead>
					<tr>
						<th>User</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{#each logs as log}
						<tr>
							<td>
								<div class="user-info">
									<img class="user-avatar" src={getAvatarUrl(log.author)} alt="avatar" />
									<div>
										<div class="user-name">{log.author?.username}</div>
										<div class="user-date">{log.timestamp}</div>
									</div>
								</div>
							</td>
							<td>
								<div class="action-info">
									<div class="action-event">{log.description}</div>
									<div class="view-details">View details</div>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/await}

<style>
	/* TODO: refactor font settings to the one line  */

	.app {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		margin-left: 373px;
		flex-direction: column;
		caret-color: transparent;
	}
	.alerts {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		width: max-content;
		margin-top: 100px;
		gap: 20px;
	}
	.economy-charts {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin-top: 35px;
		color: #fff;
		text-align: center;
		font:
			700 20px Poppins,
			sans-serif;
		margin-left: 375px;
	}
	.recent-changes {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		color: #fff;
		text-align: center;
		font:
			700 20px Poppins,
			sans-serif;
		margin-top: 35px;
		margin-left: 1234px;
	}
	.recent-changes-container {
		margin-top: 30px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		width: 658px;
		max-height: 536px;
		overflow-y: auto;
		flex-shrink: 0;
		background: rgba(0, 0, 0, 0.29);
		scrollbar-width: thin;
		scrollbar-color: #3e6bff rgba(255, 255, 255, 0.08);
	}
	.recent-changes-container::-webkit-scrollbar {
		width: 10px;
	}
	.recent-changes-container::-webkit-scrollbar-thumb {
		background: linear-gradient(135deg, #3e6bff 0%, #275ee7 100%);
		border-radius: 8px;
	}
	.recent-changes-container::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.08);
		border-radius: 8px;
	}
	.change-item {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		border: 1px solid rgba(255, 255, 255, 0.19);
		background: rgba(0, 0, 0, 0.1);
		height: 88px;
		flex-shrink: 0;
		padding-left: 20px;
	}
	.change-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 5px;
	}

	.change-header,
	.change-footer {
		margin: 0;
		padding: 0;
	}
	.change-item:not(:last-child) {
		border-bottom: none;
	}
	.change-header {
		color: #fff;
		font-family: 'Be Vietnam', sans-serif;
		font-size: 18px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}
	.change-footer {
		color: rgba(255, 255, 255, 0.2);
		text-align: center;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	.change-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 16px;
		object-fit: cover;
	}
	.dashboard-log-container {
		width: 658px;
		overflow-x: hidden;
		height: 471px;
		margin-top: 40px;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: #3e6bff rgba(255, 255, 255, 0.08);
	}
	.dashboard-log {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		color: #fff;
		text-align: center;
		font:
			700 20px Poppins,
			sans-serif;
		margin-top: 705px;
		margin-left: 1234px;
	}
	.dashboard-log-table {
		width: 658px;
		height: 471px;
		table-layout: fixed;
		border-collapse: collapse;
	}

	.dashboard-log-table th,
	.dashboard-log-table td {
		padding: 16px 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		text-align: left;
		vertical-align: middle;
	}

	.dashboard-log-table thead {
		background: rgba(0, 0, 0, 0.5);
		border-radius: 10px 10px 0 0;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	.dashboard-log-table tr {
		background: rgba(0, 0, 0, 0.3);
		border-radius: 10px 10px 0 0;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	.user-info {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.user-avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		object-fit: cover;
	}

	.user-name {
		color: #fff;
		font-family: Poppins, sans-serif;
		font-size: 18px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}

	.user-date {
		color: rgba(255, 255, 255, 0.2);
		text-align: center;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.action-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		color: #fff;
		font-family: Poppins, sans-serif;
		font-size: 18px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}

	.action-event {
		font-size: 15px;
		font-weight: 500;
	}

	.view-details {
		color: #275ee7;
		font-family: Poppins, sans-serif;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		cursor: pointer;
		margin-top: 2px;
	}
	.chart {
		margin-top: 30px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 20px;
		width: 809px;
		height: 537px;
		z-index: -1;
	}
	.chart-divider {
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 120px;
		margin-left: 20px;
	}
	.headers {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin-top: 35px;
		margin-left: 20px;
	}
	.chart-category-title {
		color: #9291a5;
		font-feature-settings:
			'liga' off,
			'clig' off;
		font:
			400 18px Inter,
			sans-serif;
		margin-top: 0;
	}
	.chart-title {
		color: #3e6bff;
		font-feature-settings:
			'liga' off,
			'clig' off;
		font:
			700 22px Poppins,
			sans-serif;
		margin-top: 0;
	}
	.lines-info {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 12px;
		margin: 40px 0 0 590px;
	}

	.loss,
	.revenue {
		display: inline-flex;
		height: 35px;
		align-items: center;
		flex-shrink: 0;
		gap: 6px;
		border: 1px solid rgba(229, 229, 239, 0.21);
		border-radius: 8px;
		color: #3e6bff;
		text-align: center;
		font:
			400 15px Poppins,
			sans-serif;
		font-feature-settings:
			'liga' off,
			'clig' off;
	}

	.loss {
		justify-content: flex-end;
		padding: 0 12px;
	}

	.revenue {
		justify-content: center;
		width: 105px;
		gap: 9px;
	}
</style>
