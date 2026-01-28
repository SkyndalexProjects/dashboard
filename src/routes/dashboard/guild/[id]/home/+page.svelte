<script lang="ts">
	import Alert from '$lib/components/ui/Alert.svelte';
	import { LineChart, Axis, Layer, Spline } from 'layerchart';
	import { curveCatmullRom } from 'd3-shape';
	import { linear } from 'svelte/easing';
	import Tab from '$lib/components/ui/Tab.svelte';

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
	let logRows = [
		{
			id: 1,
			user: 'NovaStar',
			avatar: 'https://i.pravatar.cc/64?img=12',
			role: 'Owner',
			action: 'Created custom bot',
			date: '2025-03-26 21:37'
		},
		{
			id: 2,
			user: 'Echo_427',
			avatar: 'https://i.pravatar.cc/64?img=23',
			role: 'Admin',
			action: 'Added role: Moderator',
			date: '2025-03-25 18:12'
		},
		{
			id: 3,
			user: 'PixelRift',
			avatar: 'https://i.pravatar.cc/64?img=45',
			role: 'Moderator',
			action: 'Pinned announcement',
			date: '2025-03-24 14:05'
		},
		{
			id: 4,
			user: 'Koru3000',
			avatar: 'https://i.pravatar.cc/64?img=56',
			role: 'Member',
			action: 'Joined voice channel',
			date: '2025-03-23 09:47'
		},
		{
			id: 5,
			user: 'LunaByte',
			avatar: 'https://i.pravatar.cc/64?img=34',
			role: 'Admin',
			action: 'Updated bot settings',
			date: '2025-03-22 22:30'
		},
		{
			id: 6,
			user: 'OrbitNine',
			avatar: 'https://i.pravatar.cc/64?img=67',
			role: 'Member',
			action: 'Changed nickname',
			date: '2025-03-21 16:11'
		},
		{
			id: 7,
			user: 'RiftWalker',
			avatar: 'https://i.pravatar.cc/64?img=78',
			role: 'Moderator',
			action: 'Removed message',
			date: '2025-03-20 12:02'
		},
		{
			id: 8,
			user: 'ZenithQ',
			avatar: 'https://i.pravatar.cc/64?img=8',
			role: 'Member',
			action: 'Reacted to message',
			date: '2025-03-19 08:55'
		},
		{
			id: 9,
			user: 'Glitchy',
			avatar: 'https://i.pravatar.cc/64?img=90',
			role: 'Admin',
			action: 'Banned user',
			date: '2025-03-18 20:40'
		},
		{
			id: 10,
			user: 'Seraphix',
			avatar: 'https://i.pravatar.cc/64?img=5',
			role: 'Owner',
			action: 'Purchased premium',
			date: '2025-03-17 11:23'
		}
	];
	let changeRows = [
		{
			change: 'Added new economy features',
			date: '2025-03-26',
			user: 'NovaStar',
			avatar: 'https://i.pravatar.cc/64?img=12',
			role: 'Owner'
		},
		{
			change: 'Improved AI image generation',
			date: '2025-03-24',
			user: 'PixelRift',
			avatar: 'https://i.pravatar.cc/64?img=45',
			role: 'Moderator'
		},
		{
			change: 'Fixed radio streaming bug',
			date: '2025-03-22',
			user: 'LunaByte',
			avatar: 'https://i.pravatar.cc/64?img=34',
			role: 'Admin'
		},
		{
			change: 'Updated dashboard UI',
			date: '2025-03-20',
			user: 'RiftWalker',
			avatar: 'https://i.pravatar.cc/64?img=78',
			role: 'Moderator'
		},
		{
			change: 'Enhanced security protocols',
			date: '2025-03-18',
			user: 'Seraphix',
			avatar: 'https://i.pravatar.cc/64?img=5',
			role: 'Owner'
		}
	];
	let selectedTab = $state('Dashboard');
	function handleTabSelect(tab: string) {
		selectedTab = tab;
	}
</script>

{#snippet DashboardIcon()}
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_1614_1593)">
			<path
				d="M12.6875 1.16666C12.8036 1.16666 12.9148 1.22812 12.9969 1.33752C13.0789 1.44692 13.125 1.59529 13.125 1.75V12.25C13.125 12.4047 13.0789 12.5531 12.9969 12.6625C12.9148 12.7719 12.8036 12.8334 12.6875 12.8334H1.3125C1.19647 12.8334 1.08519 12.7719 1.00314 12.6625C0.921094 12.5531 0.875 12.4047 0.875 12.25V1.75C0.875 1.59529 0.921094 1.44692 1.00314 1.33752C1.08519 1.22812 1.19647 1.16666 1.3125 1.16666H12.6875ZM1.3125 0C0.964404 0 0.630566 0.184374 0.384422 0.512563C0.138281 0.84075 0 1.28587 0 1.75V12.25C0 12.7141 0.138281 13.1593 0.384422 13.4874C0.630566 13.8156 0.964404 14 1.3125 14H12.6875C13.0356 14 13.3694 13.8156 13.6156 13.4874C13.8617 13.1593 14 12.7141 14 12.25V1.75C14 1.28587 13.8617 0.84075 13.6156 0.512563C13.3694 0.184374 13.0356 0 12.6875 0H1.3125Z"
				fill="white"
				fill-opacity="0.5"
			/>
			<path
				d="M4.375 7C4.375 6.84527 4.42109 6.69693 4.50314 6.5875C4.58519 6.47814 4.69647 6.41665 4.8125 6.41665H10.9375C11.0536 6.41665 11.1648 6.47814 11.2469 6.5875C11.3289 6.69693 11.375 6.84527 11.375 7C11.375 7.15473 11.3289 7.30307 11.2469 7.4125C11.1648 7.52186 11.0536 7.58335 10.9375 7.58335H4.8125C4.69647 7.58335 4.58519 7.52186 4.50314 7.4125C4.42109 7.30307 4.375 7.15473 4.375 7ZM4.375 4.08334C4.375 3.92862 4.42109 3.78025 4.50314 3.67086C4.58519 3.56146 4.69647 3.5 4.8125 3.5H10.9375C11.0536 3.5 11.1648 3.56146 11.2469 3.67086C11.3289 3.78025 11.375 3.92862 11.375 4.08334C11.375 4.23804 11.3289 4.38642 11.2469 4.49581C11.1648 4.60521 11.0536 4.66666 10.9375 4.66666H4.8125C4.69647 4.66666 4.58519 4.60521 4.50314 4.49581C4.42109 4.38642 4.375 4.23804 4.375 4.08334ZM4.375 9.91665C4.375 9.76198 4.42109 9.61358 4.50314 9.50421C4.58519 9.39478 4.69647 9.33335 4.8125 9.33335H10.9375C11.0536 9.33335 11.1648 9.39478 11.2469 9.50421C11.3289 9.61358 11.375 9.76198 11.375 9.91665C11.375 10.0714 11.3289 10.2198 11.2469 10.3291C11.1648 10.4386 11.0536 10.5 10.9375 10.5H4.8125C4.69647 10.5 4.58519 10.4386 4.50314 10.3291C4.42109 10.2198 4.375 10.0714 4.375 9.91665ZM3.5 4.08334C3.5 4.23804 3.45391 4.38642 3.37186 4.49581C3.28981 4.60521 3.17853 4.66666 3.0625 4.66666C2.94647 4.66666 2.83519 4.60521 2.75314 4.49581C2.67109 4.38642 2.625 4.23804 2.625 4.08334C2.625 3.92862 2.67109 3.78025 2.75314 3.67086C2.83519 3.56146 2.94647 3.5 3.0625 3.5C3.17853 3.5 3.28981 3.56146 3.37186 3.67086C3.45391 3.78025 3.5 3.92862 3.5 4.08334ZM3.5 7C3.5 7.15473 3.45391 7.30307 3.37186 7.4125C3.28981 7.52186 3.17853 7.58335 3.0625 7.58335C2.94647 7.58335 2.83519 7.52186 2.75314 7.4125C2.67109 7.30307 2.625 7.15473 2.625 7C2.625 6.84527 2.67109 6.69693 2.75314 6.5875C2.83519 6.47814 2.94647 6.41665 3.0625 6.41665C3.17853 6.41665 3.28981 6.47814 3.37186 6.5875C3.45391 6.69693 3.5 6.84527 3.5 7ZM3.5 9.91665C3.5 10.0714 3.45391 10.2198 3.37186 10.3291C3.28981 10.4386 3.17853 10.5 3.0625 10.5C2.94647 10.5 2.83519 10.4386 2.75314 10.3291C2.67109 10.2198 2.625 10.0714 2.625 9.91665C2.625 9.76198 2.67109 9.61358 2.75314 9.50421C2.83519 9.39478 2.94647 9.33335 3.0625 9.33335C3.17853 9.33335 3.28981 9.39478 3.37186 9.50421C3.45391 9.61358 3.5 9.76198 3.5 9.91665Z"
				fill="white"
				fill-opacity="0.5"
			/>
		</g>
		<defs>
			<clipPath id="clip0_1614_1593">
				<rect width="14" height="14" fill="white" />
			</clipPath>
		</defs>
	</svg>
{/snippet}

{#snippet BotIcon()}
	<svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M10.1776 0C9.79196 0 9.42215 0.151714 9.14949 0.421766C8.87682 0.691819 8.72364 1.05809 8.72364 1.44C8.72384 1.69258 8.79112 1.94066 8.91872 2.15935C9.04632 2.37804 9.22975 2.55965 9.45061 2.68594V4.32H5.81579C4.20992 4.32 2.90793 5.60952 2.90793 7.2V18H17.4472V7.2C17.4472 5.60952 16.1452 4.32 14.5394 4.32H10.9045V2.68453C11.1252 2.55836 11.3085 2.37698 11.4361 2.15856C11.5637 1.94013 11.631 1.69234 11.6315 1.44C11.6315 1.05809 11.4783 0.691819 11.2057 0.421766C10.933 0.151714 10.5632 0 10.1776 0ZM7.26971 7.92C8.07301 7.92 8.72364 8.5644 8.72364 9.36C8.72364 10.1556 8.07301 10.8 7.26971 10.8C6.46642 10.8 5.81579 10.1556 5.81579 9.36C5.81579 8.5644 6.46642 7.92 7.26971 7.92ZM13.0854 7.92C13.8887 7.92 14.5394 8.5644 14.5394 9.36C14.5394 10.1556 13.8887 10.8 13.0854 10.8C12.2821 10.8 11.6315 10.1556 11.6315 9.36C11.6315 8.5644 12.2821 7.92 13.0854 7.92ZM0.715678 8.63016C0.523123 8.63314 0.339629 8.71166 0.205467 8.84849C0.0713045 8.98532 -0.00256423 9.16928 7.27021e-05 9.36V13.68C-0.00128966 13.7754 0.0165073 13.8701 0.0524293 13.9587C0.0883513 14.0472 0.141682 14.1278 0.209322 14.1957C0.276962 14.2637 0.357562 14.3176 0.446439 14.3545C0.535316 14.3913 0.630696 14.4103 0.727037 14.4103C0.823378 14.4103 0.918758 14.3913 1.00763 14.3545C1.09651 14.3176 1.17711 14.2637 1.24475 14.1957C1.31239 14.1278 1.36572 14.0472 1.40164 13.9587C1.43757 13.8701 1.45536 13.7754 1.454 13.68V9.36C1.45533 9.26367 1.43713 9.16806 1.40048 9.07882C1.36383 8.98958 1.30948 8.90854 1.24063 8.84048C1.17178 8.77243 1.08985 8.71875 0.999679 8.68262C0.909509 8.64649 0.812935 8.62865 0.715678 8.63016ZM19.6167 8.63016C19.4242 8.63314 19.2407 8.71166 19.1065 8.84849C18.9724 8.98532 18.8985 9.16928 18.9011 9.36V13.68C18.8998 13.7754 18.9176 13.8701 18.9535 13.9587C18.9894 14.0472 19.0427 14.1278 19.1104 14.1957C19.178 14.2637 19.2586 14.3176 19.3475 14.3545C19.4364 14.3913 19.5318 14.4103 19.6281 14.4103C19.7244 14.4103 19.8198 14.3913 19.9087 14.3545C19.9976 14.3176 20.0782 14.2637 20.1458 14.1957C20.2135 14.1278 20.2668 14.0472 20.3027 13.9587C20.3386 13.8701 20.3564 13.7754 20.3551 13.68V9.36C20.3564 9.26367 20.3382 9.16806 20.3016 9.07882C20.2649 8.98958 20.2105 8.90854 20.1417 8.84048C20.0728 8.77243 19.9909 8.71875 19.9007 8.68262C19.8106 8.64649 19.714 8.62865 19.6167 8.63016ZM7.26971 13.68H13.0854C13.8887 13.68 14.5394 14.3244 14.5394 15.12V16.56H5.81579V15.12C5.81579 14.3244 6.46642 13.68 7.26971 13.68Z"
			fill="white"
			fill-opacity="0.5"
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

<main class="content">
	<div class="alerts">
		<Alert type="info">
			<span class="information"> Information </span> We recommend to join our support server for the
			important news or changelog
			<div class="join-guild-button">
				Join guild <svg
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="arrow"
				>
					<path
						d="M9.16107 10.6065L11.3972 10.6065V-7.91234e-05L0.790606 -7.84491e-05L0.790605 2.23605L7.57965 2.23605L-0.000106161 9.81581L1.58132 11.3972L9.16108 3.81747L9.16107 10.6065Z"
						fill="white"
					/>
				</svg>
			</div>
		</Alert>
		<Alert type="warning">
			<span class="warning"> Warning </span> It is a Alpha version of the dashboard. Many elements are
			just placeholders and a lot of things just doesn't work
		</Alert>
	</div>

	<div class="home-grid">
		<div class="charts-column">
			<div class="section-title-container">
				<div class="section-title">Economy charts</div>
				<div class="underline-vector economy-charts"></div>
			</div>

			<div class="chart-container">
				<svg
					width="673"
					height="1"
					viewBox="0 0 770 1"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="chart-divider"
				>
					<line y1="0.5" x2="770" y2="0.5" stroke="#E5E5EF" class="chart-line" />
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
						{ data: revenueData, key: 'Revenue', color: '#27E761' },
						{ data: lossData, key: 'Loss', color: '#D83C3C' }
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

			<div class="chart-container second-container">
				<svg
					width="673"
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
						{ data: revenueData, key: 'Revenue', color: '#27E761' },
						{ data: lossData, key: 'Loss', color: '#D83C3C' }
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

		<div class="info-column">
			<div class="info-section">
				<div class="section-title-container info-title">
					<div class="section-title">Recent changes</div>
					<div class="underline-vector"></div>
				</div>

				<div class="container">
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
							{#if changeRows.length === 0}
								<div class="no-changes">No recent changes</div>
							{:else}
								{#each changeRows as row, i}
									<div class="info-row">
										<div class="user-info">
											<img src={row.avatar} alt="avatar" class="user-avatar" />
											<div>
												<div class="username">{row.user}</div>
												<div class="date">{row.date}</div>
											</div>
										</div>
										<div class="role changelog">{row.role}</div>
										<div class="action-info">
											<div class="action">{row.change}</div>
											<a href="#" class="view-details">View details</a>
										</div>
									</div>
								{/each}
							{/if}
						{:else if selectedTab === 'Bot'}
							<div class="no-changes">No recent changes</div>
						{/if}
					</Tab>
				</div>
			</div>

			<div class="info-section">
				<div class="section-title-container info-title recent-logs">
					<div class="section-title">Recent logs</div>
					<div class="underline-vector"></div>
				</div>
				<div class="logsContainer">
					<div class="info-row header-row">
						<div class="id">ID</div>
						<div class="header-title user-header">
							<svg
								width="10"
								height="10"
								viewBox="0 0 10 10"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_1612_1398)">
									<path
										d="M9.42334 9.93384C9.42334 7.48793 7.44054 5.50513 4.99463 5.50513C2.54872 5.50513 0.565918 7.48793 0.565918 9.93384H9.42334Z"
										fill="white"
										fill-opacity="0.5"
									/>
									<path
										d="M4.99494 4.75575C6.29304 4.75575 7.34535 3.70344 7.34535 2.40534C7.34535 1.10725 6.29304 0.0549316 4.99494 0.0549316C3.69685 0.0549316 2.64453 1.10725 2.64453 2.40534C2.64453 3.70344 3.69685 4.75575 4.99494 4.75575Z"
										fill="white"
										fill-opacity="0.5"
									/>
								</g>
								<defs>
									<clipPath id="clip0_1612_1398">
										<rect width="10" height="10" fill="white" />
									</clipPath>
								</defs>
							</svg>
							User
						</div>
						<div class="header-title action-header">
							<svg
								width="16"
								height="16"
								viewBox="0 0 15 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M0.707031 14.707L2.61612 12.7979M2.61612 12.7979C5.16158 15.399 7.07067 14.0707 8.34339 12.7979L8.97976 12.1616L3.25249 6.4343L2.61612 7.07067C1.34339 8.34339 0.0706675 10.1969 2.61612 12.7979ZM12.7979 2.61612L14.707 0.707031M12.7979 2.61612C15.3773 5.16158 14.0707 7.07067 12.7979 8.34339L12.1616 8.97976L6.4343 3.25249L7.07067 2.61612C8.34339 1.34339 10.2186 0.0706675 12.7979 2.61612ZM5.79794 7.07067L7.70703 5.16158M8.34339 9.61612L10.2525 7.70703"
									stroke="white"
									stroke-opacity="0.48"
									stroke-width="2"
								/>
							</svg>
							Action
						</div>
					</div>
					{#each logRows as row, i}
						<div class="info-row" id={'row-' + row.id}>
							<div class="id">{i + 1}</div>
							<div class="user-info">
								<img src={row.avatar} alt="avatar" class="user-avatar" />
								<div>
									<div class="username">{row.user}</div>
									<div class="date">{row.date}</div>
								</div>
							</div>
							<div class="role">{row.role}</div>
							<div class="action-info">
								<div class="action">{row.action}</div>
								<a href="#" class="view-details">View details</a>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	:global(.alert) {
		--alert-max-width: 680px;
		--alert-width: 762px;
	}
	.home-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: start;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		gap: 2rem;
	}

	:global(.tabs.recent-tabs) {
		--tab-background: rgba(0, 0, 0, 0.4);
		--tab-color: rgba(255, 253, 253, 0.5);
		--tab-hover-color: #e6f0ff;
		--tab-selected-color: rgba(255, 253, 253, 0.5);
		--tab-font-weight: 600;
		--tab-selected-background: rgba(0, 0, 0, 0.6);
		--tab-selected-weight: 700;
		--tab-font-family: Poppins, sans-serif;
		--tab-selected-font-family: Poppins, sans-serif;
		--tab-font-size: 13px;
		--tabs-border-color: rgba(255, 255, 255, 0.08);
		--tab-selected-width: 150px;
		--tab-selected-height: 60px;
		--tab-selected-border-bottom: transparent;
		--tab-width: 315px;
		--tab-height: 60px;
		--tab-selected-padding-right: 20px;
		--tab-padding-right: 20px;
		--tab-border-radius: 0 15px 15px 0;
		--tab-selected-border-radius: 15px 0px 0px 15px;
	}
	.charts-column {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 725px;
		overflow-x: hidden;
	}
	.chart-line {
		width: 120px;
		max-width: 120px;
	}
	.container {
		-webkit-overflow-scrolling: touch;
		overflow-x: auto;
	}

	.section-title-container.info-title.recent-logs {
		padding-top: 40px;
		margin-top: 60px;
	}
	.info-column {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-top: 0;
		width: 100%;
		max-width: 100%;
		overflow-x: hidden;
		box-sizing: border-box;
		-webkit-overflow-scrolling: touch;
	}

	.info-section {
		border-radius: 20px;
		min-height: 200px;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		overflow-x: hidden;
	}
	.info-section:first-child {
		margin-top: 0;
	}
	.section-title-container {
		display: inline-block;
		margin-bottom: 1.5rem;
		padding-left: 0;
		margin-left: 0;
	}

	.information {
		color: #3e6bff;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}
	.warning {
		color: #f1ab15;
		text-align: center;
		font-family: Poppins, sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}
	.alerts {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
	}
	.join-guild-button {
		display: inline-flex;
		padding: 6px 12px;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.19);
		background: rgba(0, 0, 0, 0.1);
		color: #fff;
		text-align: center;
		font-family: Poppins, sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-left: 10px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		box-sizing: border-box;
	}
	.join-guild-button:hover {
		background: rgba(62, 107, 255, 0.47);
	}
	.arrow {
		padding-left: 10px;
	}
	.section-title {
		color: #fff;
		text-align: left;
		font:
			700 20px Poppins,
			sans-serif;
		text-wrap: nowrap;
	}
	.chart-container {
		box-shadow: 0 2px 6px 0 rgba(13, 10, 44, 0.08);
		background: rgba(0, 0, 0, 0.4);
		border-radius: 20px;
		width: 100%;
		max-width: 100%;
		height: 472px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		overflow: hidden;
	}
	.chart-container.second-container {
		margin-top: 100px;
	}
	.loss,
	.revenue {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		flex-shrink: 0;
		padding: 8px 12px 12px 9px;
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
	.lines-info {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 12px;
		margin-top: -70px;
		margin-right: 50px;
	}
	.headers {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin-left: 20px;
	}
	.chart-divider {
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 100px;
		margin-left: 60px;
		width: 550px;
	}
	.chart-category-title {
		color: #9291a5;
		font-feature-settings:
			'liga' off,
			'clig' off;
		font-family: Poppins, sans-serif;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 20px;
		margin-top: 25px;
	}
	.chart-title {
		color: #3e6bff;
		font-feature-settings:
			'liga' off,
			'clig' off;
		font-family: Poppins, sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: 28px;
		margin-top: -5px;
	}
	:global(.lc-tooltip-context) {
		all: unset;
		position: absolute;
		margin-top: -90px;
		margin-left: -10px;
		width: 650px;
	}
	:global(.lc-text, .lc-axis-tick-label, .lc-text-tspan) {
		all: unset;
		color: #615e83;
		text-align: right;
		font-feature-settings:
			'liga' off,
			'clig' off;
		font-family: Poppins, sans-serif;
		font-size: 10px;
		font-style: normal;
		font-weight: 400;
		line-height: 18px;
	}
	.logsContainer {
		color: #d1d5db;
		margin-left: -20px;
		padding: 1rem;
		border-radius: 12px;
		max-height: 400px;
		overflow-y: auto;
		overflow-x: auto;
		width: 100%;
		max-width: 650px;
		-webkit-overflow-scrolling: touch;
	}
	.logsContainer::-webkit-scrollbar {
		width: 0;
		display: none;
	}
	.logsContainer {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.date {
		text-wrap: nowrap;
		color: rgba(255, 255, 255, 0.2);
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 10px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	.user-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;
	}
	.info-row {
		display: grid;
		grid-template-columns: 40px minmax(150px, 200px) 80px minmax(200px, 250px);
		gap: 10px;
		align-items: center;
		background: rgba(0, 0, 0, 0.4);
		margin-top: 3px;
		border-radius: 10px;
		width: max-content;
		min-width: 550px;
		height: 71px;
		padding: 0 20px;
		box-sizing: border-box;
		transition: 0.3s;
		-webkit-overflow-scrolling: touch;
	}
	.info-row:hover {
		background: rgba(62, 107, 255, 0.21);
	}
	.user-avatar {
		width: 20px;
		height: 20px;
		border-radius: 50px;
		flex-shrink: 0;
	}
	.username {
		color: #fff;
		font-family: Poppins, sans-serif;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	.action-info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 5px;
		color: #fff;
		font-family: Poppins, sans-serif;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-wrap: nowrap;
	}
	.view-details {
		color: #275ee7;
		text-decoration: none;
		font-family: Poppins, sans-serif;
		font-size: 10px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-align: left;
	}
	.id {
		color: rgba(255, 253, 253, 0.5);
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: rgba(0, 0, 0, 0.4);
		font-family: Poppins, sans-serif;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	.role {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-family: Poppins, sans-serif;
		font-size: 10px;
		font-weight: 500;
		border-radius: 5px;
		background: rgba(0, 0, 0, 0.21);
		width: 65px;
		height: 22px;
		margin-left: -70px;
		padding: 5px;
		flex-shrink: 0;
	}
	.role.changelog {
		margin-left: 70px;
		padding: 5px;
	}
	.header-row {
		display: grid;
		grid-template-columns: 40px minmax(230px, 288px) minmax(180px, 230px);
		gap: 10px;
		align-items: center;
		background: rgba(0, 0, 0, 0.4);
		font-weight: 600;
		color: rgba(255, 255, 255, 0.7);
		margin-bottom: 10px;
		width: 100%;
		min-width: 550px;
		max-width: 100%;
		height: 46px;
		padding: 0 20px;
		border-radius: 10px;
		box-sizing: border-box;
	}

	.header-title {
		display: flex;
		align-items: center;
		gap: 6px;
		color: rgba(255, 253, 253, 0.5);
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: rgba(0, 0, 0, 0.4);
		font-family: Poppins, sans-serif;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	.underline-vector.economy-charts {
		max-width: 170px;
	}
	@media (max-width: 1400px) {
		.logsContainer {
			padding: 0.5rem;
			max-width: max-content;
			box-sizing: border-box;
		}
		.home-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.header-row {
			gap: 8px;
			padding: 0 10px;
			font-size: 11px;
		}
		.headers {
			display: block;
			box-sizing: border-box;
		}
		.charts-column {
			max-width: 100%;
		}

		.info-column {
			margin-top: 0;
		}
		.chart-divider {
			width: 0;
		}
		.lines-info {
			display: block;
			box-sizing: border-box;
			margin-top: 30px;
			margin-left: 40px;
		}
		.section-title-container.info-title {
			margin-top: 0;
			padding-top: 0;
		}

		.section-title-container.info-title.recent-logs {
			padding-top: 20px;
			margin-top: 40px;
		}
	}
	@media (max-width: 768px) {
		.logsContainer {
			padding: 0.5rem;
			max-width: max-content;
			box-sizing: border-box;
		}

		.information {
			font-size: 14px;
		}
		.warning {
			font-size: 14px;
		}
		.header-row {
			gap: 8px;
			padding: 0 10px;
			font-size: 11px;
		}
		.headers {
			display: block;
			box-sizing: border-box;
		}
		.lines-info {
			display: block;
			box-sizing: border-box;
			margin-top: 30px;
			margin-left: 40px;
		}

		.user-avatar {
			width: 16px;
			height: 16px;
		}

		.role {
			width: 55px;
			font-size: 9px;
		}
		.chart-divider {
			width: 0;
		}
		.section-title-container.info-title.recent-logs {
			padding-top: 40px;
			margin-top: -10px;
		}
	}
	@media (max-width: 1600px) and (min-width: 1367px) {
		.home-grid {
			gap: 1.5rem;
		}

		.charts-column {
			max-width: 650px;
		}

		.chart-container {
			height: 420px;
		}

		.chart-divider {
			width: 0;
		}

		.lines-info {
			margin-right: 30px;
		}

		.logsContainer {
			max-width: 580px;
		}

		.info-row {
			min-width: 500px;
			grid-template-columns: 35px minmax(140px, 180px) 75px minmax(180px, 220px);
		}

		.header-row {
			min-width: 500px;
			grid-template-columns: 35px minmax(200px, 250px) minmax(160px, 200px);
		}

		.username {
			font-size: 11px;
		}

		.action-info {
			font-size: 12px;
		}

		.role {
			margin-left: -60px;
		}
	}

	@media (max-width: 1366px) and (min-width: 1200px) {
		.home-grid {
			gap: 1.25rem;
		}

		.charts-column {
			max-width: 600px;
		}

		.chart-container {
			height: 400px;
		}

		.chart-divider {
			width: 0;
		}

		.chart-category-title {
			font-size: 13px;
		}

		.chart-title {
			font-size: 15px;
		}

		.lines-info {
			margin-right: 25px;
			margin-top: -60px;
		}

		.loss,
		.revenue {
			font-size: 12px;
			padding: 6px 10px 10px 8px;
		}

		.logsContainer {
			max-width: 550px;
		}

		.info-row {
			min-width: 480px;
			height: 65px;
			grid-template-columns: 35px minmax(130px, 170px) 70px minmax(170px, 200px);
			gap: 8px;
		}

		.header-row {
			min-width: 480px;
			height: 42px;
			grid-template-columns: 35px minmax(190px, 240px) minmax(150px, 190px);
		}

		.username {
			font-size: 11px;
		}

		.date {
			font-size: 9px;
		}

		.action-info {
			font-size: 11px;
		}

		.view-details {
			font-size: 9px;
		}

		.role {
			width: 60px;
			font-size: 9px;
			margin-left: -55px;
		}

		.role.changelog {
			margin-left: 60px;
		}
	}
</style>
