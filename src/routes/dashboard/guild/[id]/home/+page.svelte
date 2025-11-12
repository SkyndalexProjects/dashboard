<script lang="ts">
	import ManagementNavbar from '$lib/components/navigation/ManagementNavbar.svelte';
	import Sidebar from '$lib/components/navigation/Sidebar.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import { linear } from 'svelte/easing';
	import { curveCatmullRom } from 'd3-shape';
	import { LineChart, Axis, Layer, Spline } from 'layerchart';
	import Tab from '$lib/components/ui/Tab.svelte';
	import type { APIUser } from 'discord-api-types/v10';
	import type { Snippet } from 'svelte';

	const { data } = $props();

	function getAvatarUrl(user: APIUser | undefined): string {
		return user?.id && user?.avatar
			? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=1024`
			: 'https://cdn.discordapp.com/embed/avatars/0.png';
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
	interface recentChange {
		date: string;
		change: string;
		author: APIUser | null;
	}

	const recentChanges: recentChange[] = [
		{ date: '2024-06-01', change: 'New version update changelog', author: data.user },
		{ date: '2024-06-15', change: 'Security patch applied', author: data.user },
		{ date: '2024-06-08', change: 'Feature rollback initiated', author: data.user },
		{ date: '2024-06-22', change: 'Database maintenance scheduled', author: data.user },
		{ date: '2024-06-11', change: 'New API endpoints released', author: data.user },
		{ date: '2024-06-19', change: 'Performance optimization completed', author: data.user }
	];
	let selectedTab = $state('Dashboard');
	function handleTabSelect(tab: string) {
		selectedTab = tab;
	}
</script>

{#snippet DashboardIcon()}
	<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M22.6562 2.08333C22.8635 2.08333 23.0622 2.19308 23.2087 2.38843C23.3552 2.58378 23.4375 2.84873 23.4375 3.125V21.875C23.4375 22.1513 23.3552 22.4162 23.2087 22.6116C23.0622 22.8069 22.8635 22.9167 22.6562 22.9167H2.34375C2.13655 22.9167 1.93784 22.8069 1.79132 22.6116C1.64481 22.4162 1.5625 22.1513 1.5625 21.875V3.125C1.5625 2.84873 1.64481 2.58378 1.79132 2.38843C1.93784 2.19308 2.13655 2.08333 2.34375 2.08333H22.6562ZM2.34375 0C1.72215 0 1.12601 0.32924 0.686468 0.915291C0.24693 1.50134 0 2.2962 0 3.125L0 21.875C0 22.7038 0.24693 23.4987 0.686468 24.0847C1.12601 24.6708 1.72215 25 2.34375 25H22.6562C23.2779 25 23.874 24.6708 24.3135 24.0847C24.7531 23.4987 25 22.7038 25 21.875V3.125C25 2.2962 24.7531 1.50134 24.3135 0.915291C23.874 0.32924 23.2779 0 22.6562 0H2.34375Z"
			fill="currentColor"
		/>
		<path
			d="M7.8125 12.5C7.8125 12.2237 7.89481 11.9588 8.04132 11.7634C8.18784 11.5681 8.38655 11.4583 8.59375 11.4583H19.5312C19.7385 11.4583 19.9372 11.5681 20.0837 11.7634C20.2302 11.9588 20.3125 12.2237 20.3125 12.5C20.3125 12.7763 20.2302 13.0412 20.0837 13.2366C19.9372 13.4319 19.7385 13.5417 19.5312 13.5417H8.59375C8.38655 13.5417 8.18784 13.4319 8.04132 13.2366C7.89481 13.0412 7.8125 12.7763 7.8125 12.5ZM7.8125 7.29167C7.8125 7.0154 7.89481 6.75045 8.04132 6.5551C8.18784 6.35975 8.38655 6.25 8.59375 6.25H19.5312C19.7385 6.25 19.9372 6.35975 20.0837 6.5551C20.2302 6.75045 20.3125 7.0154 20.3125 7.29167C20.3125 7.56793 20.2302 7.83289 20.0837 8.02824C19.9372 8.22359 19.7385 8.33333 19.5312 8.33333H8.59375C8.38655 8.33333 8.18784 8.22359 8.04132 8.02824C7.89481 7.83289 7.8125 7.56793 7.8125 7.29167ZM7.8125 17.7083C7.8125 17.4321 7.89481 17.1671 8.04132 16.9718C8.18784 16.7764 8.38655 16.6667 8.59375 16.6667H19.5312C19.7385 16.6667 19.9372 16.7764 20.0837 16.9718C20.2302 17.1671 20.3125 17.4321 20.3125 17.7083C20.3125 17.9846 20.2302 18.2496 20.0837 18.4449C19.9372 18.6403 19.7385 18.75 19.5312 18.75H8.59375C8.38655 18.75 8.18784 18.6403 8.04132 18.4449C7.89481 18.2496 7.8125 17.9846 7.8125 17.7083ZM6.25 7.29167C6.25 7.56793 6.16769 7.83289 6.02118 8.02824C5.87466 8.22359 5.67595 8.33333 5.46875 8.33333C5.26155 8.33333 5.06284 8.22359 4.91632 8.02824C4.76981 7.83289 4.6875 7.56793 4.6875 7.29167C4.6875 7.0154 4.76981 6.75045 4.91632 6.5551C5.06284 6.35975 5.26155 6.25 5.46875 6.25C5.67595 6.25 5.87466 6.35975 6.02118 6.5551C6.16769 6.75045 6.25 7.0154 6.25 7.29167ZM6.25 12.5C6.25 12.7763 6.16769 13.0412 6.02118 13.2366C5.87466 13.4319 5.67595 13.5417 5.46875 13.5417C5.26155 13.5417 5.06284 13.4319 4.91632 13.2366C4.76981 13.0412 4.6875 12.7763 4.6875 12.5C4.6875 12.2237 4.76981 11.9588 4.91632 11.7634C5.06284 11.5681 5.26155 11.4583 5.46875 11.4583C5.67595 11.4583 5.87466 11.5681 6.02118 11.7634C6.16769 11.9588 6.25 12.2237 6.25 12.5ZM6.25 17.7083C6.25 17.9846 6.16769 18.2496 6.02118 18.4449C5.87466 18.6403 5.67595 18.75 5.46875 18.75C5.26155 18.75 5.06284 18.6403 4.91632 18.4449C4.76981 18.2496 4.6875 17.9846 4.6875 17.7083C4.6875 17.4321 4.76981 17.1671 4.91632 16.9718C5.06284 16.7764 5.26155 16.6667 5.46875 16.6667C5.67595 16.6667 5.87466 16.7764 6.02118 16.9718C6.16769 17.1671 6.25 17.4321 6.25 17.7083Z"
			fill="currentColor"
		/>
	</svg>
{/snippet}

{#snippet BotIcon()}
	<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12.5 0C12.0264 0 11.5722 0.210714 11.2373 0.585786C10.9024 0.960859 10.7143 1.46957 10.7143 2C10.7145 2.3508 10.7972 2.69537 10.9539 2.9991C11.1106 3.30284 11.3359 3.55507 11.6072 3.73047V6H7.1429C5.17059 6 3.57149 7.791 3.57149 10V25H21.4285V10C21.4285 7.791 19.8294 6 17.8571 6H13.3929V3.72852C13.6638 3.55328 13.889 3.30136 14.0457 2.998C14.2024 2.69463 14.2851 2.35047 14.2857 2C14.2857 1.46957 14.0976 0.960859 13.7627 0.585786C13.4278 0.210714 12.9736 0 12.5 0ZM8.9286 11C9.9152 11 10.7143 11.895 10.7143 13C10.7143 14.105 9.9152 15 8.9286 15C7.942 15 7.1429 14.105 7.1429 13C7.1429 11.895 7.942 11 8.9286 11ZM16.0714 11C17.058 11 17.8571 11.895 17.8571 13C17.8571 14.105 17.058 15 16.0714 15C15.0848 15 14.2857 14.105 14.2857 13C14.2857 11.895 15.0848 11 16.0714 11ZM0.878989 11.9863C0.642495 11.9905 0.417129 12.0995 0.252352 12.2896C0.0875755 12.4796 -0.00314937 12.7351 8.9292e-05 13V19C-0.00158395 19.1325 0.0202741 19.2641 0.0643932 19.387C0.108512 19.51 0.174013 19.6219 0.257087 19.7163C0.340162 19.8107 0.439155 19.8856 0.548312 19.9368C0.65747 19.9879 0.774615 20.0142 0.89294 20.0142C1.01127 20.0142 1.12841 19.9879 1.23757 19.9368C1.34673 19.8856 1.44572 19.8107 1.52879 19.7163C1.61187 19.6219 1.67737 19.51 1.72149 19.387C1.76561 19.2641 1.78746 19.1325 1.78579 19V13C1.78743 12.8662 1.76508 12.7334 1.72006 12.6095C1.67505 12.4855 1.60829 12.373 1.52373 12.2784C1.43917 12.1839 1.33854 12.1094 1.2278 12.0592C1.11705 12.009 0.99844 11.9842 0.878989 11.9863ZM24.0931 11.9863C23.8566 11.9905 23.6312 12.0995 23.4665 12.2896C23.3017 12.4796 23.211 12.7351 23.2142 13V19C23.2125 19.1325 23.2344 19.2641 23.2785 19.387C23.3226 19.51 23.3881 19.6219 23.4712 19.7163C23.5543 19.8107 23.6533 19.8856 23.7624 19.9368C23.8716 19.9879 23.9887 20.0142 24.1071 20.0142C24.2254 20.0142 24.3425 19.9879 24.4517 19.9368C24.5608 19.8856 24.6598 19.8107 24.7429 19.7163C24.826 19.6219 24.8915 19.51 24.9356 19.387C24.9797 19.2641 25.0016 19.1325 24.9999 19V13C25.0015 12.8662 24.9792 12.7334 24.9342 12.6095C24.8892 12.4855 24.8224 12.373 24.7379 12.2784C24.6533 12.1839 24.5527 12.1094 24.4419 12.0592C24.3312 12.009 24.2126 11.9842 24.0931 11.9863ZM8.9286 19H16.0714C17.058 19 17.8571 19.895 17.8571 21V23H7.1429V21C7.1429 19.895 7.942 19 8.9286 19Z"
			fill="currentColor"
		/>
	</svg>
{/snippet}

<svelte:head>
	<title>Skyndalex</title>
	<meta property="og:title" content="Skyndalex" />
	<meta property="og:description" content="Guilds selector" />
	<meta property="og:url" content="https://skyndalex.com/" />
	<meta property="og:type" content="website" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>
<!-- TODO: load guilds from cache before promise resolves -->
{#await data.guilds}
	<div class="navbar-skeleton">
		<div class="navbar-skeleton-left">
			<div class="skeleton-icon"></div>
			<div class="skeleton-title"></div>
			<div class="skeleton-version"></div>
			<div class="skeleton-guild-selector"></div>
		</div>
		<div class="navbar-skeleton-right">
			<div class="skeleton-user"></div>
		</div>
	</div>
	<div class="sidebar-skeleton">
		{#each [1, 2, 3] as categoryIndex}
			<div class="skeleton-divider"></div>
			<div class="skeleton-category"></div>
			{#each [1, 2, 3] as itemIndex}
				<div class="skeleton-item"></div>
			{/each}
		{/each}
	</div>
{:then guilds}
	<ManagementNavbar guild={data.guild} user={data.user} {guilds} />
	<Sidebar guildId={data.guild.id} />

	<div class="alerts">
		<Alert type="info">
			You did not join our discord support guild. It is highly recommended to keep up to date with
			the changes in the bot that are currently being intensively carried out
		</Alert>
		<Alert type="warning">
			Dashboard is still under BETA version. Stable release will be out after v1.0.0
		</Alert>
	</div>

	<div class="home-grid">
		<div class="economy-charts">
			<div class="section-title">
				Economy charts
				<div class="underline-vector"></div>
			</div>
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
			<div class="section-title">
				Recent changes
				<div class="underline-vector"></div>
			</div>

			<div class="recent-changes-container">
				<Tab
					tabs={[
						{
							label: 'Dashboard',
							icon: DashboardIcon
						},
						{
							label: 'Bot',
							icon: BotIcon
						}
					]}
					{selectedTab}
					onTabSelect={handleTabSelect}
					style="recent-tabs"
				>
					{#if selectedTab === 'Dashboard'}
						{#if recentChanges.length === 0}
							<div class="no-changes">No recent changes</div>
						{:else}
							{#each recentChanges as change}
								<div class="change-item">
									<img class="change-avatar" src={getAvatarUrl(change.author)} alt="avatar" />
									<div class="change-content">
										<p class="change-header">{change.change}</p>
										<p class="change-footer">
											{change.date} · <span class="view-details-link">View details</span>
										</p>
									</div>
								</div>
							{/each}
						{/if}
					{:else if selectedTab === 'Bot'}
						<div class="no-changes">No recent changes</div>
					{/if}
				</Tab>
			</div>
			<div class="dashboard-log">
				<div class="section-title">
					Dashboard logs
					<div class="underline-vector"></div>
				</div>

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
											<img
												class="user-avatar"
												src={getAvatarUrl(log.author ?? undefined)}
												alt="avatar"
											/>
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
		</div>
	</div>
{/await}

<style>
	:global(.tabs.recent-tabs) {
		--tab-background: rgba(0, 0, 0, 0.1);
		--tab-color: rgba(255, 255, 255, 0.7);
		--tab-hover-color: #e6f0ff;
		--tab-selected-color: #ffffff;
		--tab-selected-background: rgba(0, 0, 0, 0.3);
		--tab-selected-weight: 700;
		--tab-font-size: 20px;
		--tabs-border-color: rgba(255, 255, 255, 0.08);
		--tab-selected-width: auto;
		--tab-selected-height: 60px;
		--tab-selected-border-bottom: 3px solid #3e6bff;
		--tab-width: auto;
		--tab-height: 60px;
		--tab-border-bottom: 3px solid rgba(255, 255, 255, 0.2);
		--tab-selected-padding-right: 20px;
	}
	.home-grid {
		display: grid;
		grid-template-columns: 809px 658px;
		grid-template-rows: auto auto;
		gap: 40px 60px;
		padding: 40px 60px;
		margin-left: 300px;
	}
	.no-changes {
		color: rgba(255, 255, 255, 0.5);
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding: 20px;
		height: 540px;
	}
	:global(.alert) {
		--alert-max-width: 680px;
		--alert-width: 762px;
	}
	.alerts {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		width: max-content;
		margin-top: 100px;
		margin-left: 375px;
		gap: 20px;
	}
	.economy-charts {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		color: #fff;
		text-align: center;
		font:
			700 20px Poppins,
			sans-serif;
	}

	.recent-changes {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		color: #fff;
		text-align: center;
		font:
			700 20px Poppins,
			sans-serif;
	}
	.recent-changes-container {
		margin-top: 30px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		width: 658px;
		max-height: 536px;
		overflow-y: auto;
		scrollbar-width: none;
		scrollbar-color: transparent transparent;
		-ms-overflow-style: none;
		flex-shrink: 0;
		background: rgba(0, 0, 0, 0.29);
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
	.view-details-link {
		color: #275ee7;
		cursor: pointer;
	}
	.dashboard-log-container {
		width: 658px;
		overflow-x: hidden;
		height: 471px;
		overflow-y: auto;
		scrollbar-width: none;
		scrollbar-color: transparent transparent;
		-ms-overflow-style: none;
		margin-top: 25px;
	}
	.dashboard-log {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		color: #fff;
		text-align: center;
		font:
			700 20px Poppins,
			sans-serif;
		grid-column: 1 / 2;
		grid-row: 2 / 3;
		margin-top: 22px;
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
		border: 1px solid rgba(255, 255, 255, 0.2);
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
			400 15px Inter,
			sans-serif;
		margin-top: 0;
	}
	.chart-title {
		color: #3e6bff;
		font-feature-settings:
			'liga' off,
			'clig' off;
		font:
			700 20px Poppins,
			sans-serif;
		margin-top: 0;
		text-wrap: nowrap;
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
			400 13px Poppins,
			sans-serif;
		font-feature-settings:
			'liga' off,
			'clig' off;
	}
	.section-title {
		text-align: left;
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
