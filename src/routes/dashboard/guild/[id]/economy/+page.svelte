<script lang="ts">
	import geti18ncontext from '$lib/i18n';
	import Switch from '$lib/components/ui/Switch.svelte';
	import Tab from '$lib/components/ui/Tab.svelte';
	import RangeBox from '$lib/components/ui/RangeBox.svelte';
	const i18n = geti18ncontext();
	const { data } = $props();

	let clearMoneyOnLeave = $state(false);
	let enableRobSystem = $state(false);
	let isWallet = $state(false);
	let selectedTab = $state('Work');
	let logRows = [
		{
			id: 1,
			user: 'NovaStar',
			avatar: 'https://i.pravatar.cc/64?img=12',
			role: 'Owner',
			action:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nibh sit amet quam laoreet volutpat. Nam quam ante, posuere id tortor vel, placerat imperdiet tortor. ',
			date: '2025-03-26 21:37'
		},
		{
			id: 2,
			user: 'Echo_427',
			avatar: 'https://i.pravatar.cc/64?img=23',
			role: 'Admin',
			action:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nibh sit amet quam laoreet volutpat. Nam quam ante, posuere id tortor vel, placerat imperdiet tortor. ',
			date: '2025-03-25 18:12'
		},
		{
			id: 3,
			user: 'PixelRift',
			avatar: 'https://i.pravatar.cc/64?img=45',
			role: 'Moderator',
			action:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nibh sit amet quam laoreet volutpat. Nam quam ante, posuere id tortor vel, placerat imperdiet tortor. ',
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
	function handleTabSelect(tab: string) {
		selectedTab = tab;
	}

	let searchQuery = $state('');

	function filterLogs() {
		const query = searchQuery.toLowerCase();
		return logRows.filter(
			(row) =>
				row.user.toLowerCase().includes(query) ||
				row.role.toLowerCase().includes(query) ||
				row.action.toLowerCase().includes(query) ||
				row.date.includes(query)
		);
	}

	let filteredLogRows = $derived(filterLogs());
	let isSearchActive = $state(false);

	function toggleSearch() {
		isSearchActive = !isSearchActive;
		if (!isSearchActive) {
			searchQuery = '';
		}
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
	<div class="section-title-container">
		<div class="section-title">General economy settings</div>
		<div class="underline-vector"></div>
	</div>

	<div class="boxes-grid">
		<div class="setting-box symbol-box">
			<h3 class="box-title">Symbol Setting</h3>
			<input type="text" class="symbol-input" placeholder="$" maxlength="5" />
		</div>

		<div class="setting-box starting-point-box">
			<h3 class="box-title">Starting Point</h3>
			<div class="starting-point-switch">
				<span class:active={!isWallet}>Bank</span>
				<Switch bind:active={isWallet} />
				<span class:active={isWallet}>Wallet</span>
			</div>

			<input type="number" class="amount-input" placeholder="$" min="0" />
		</div>

		<div class="setting-box additional-box">
			<h3 class="box-title">Additional Settings</h3>
			<div class="switch-row">
				<Switch bind:active={clearMoneyOnLeave} />
				<span class="switch-label">Clear money after leaving the guild</span>
			</div>
			<div class="switch-row">
				<Switch bind:active={enableRobSystem} />
				<span class="switch-label">Enable rob system</span>
			</div>
		</div>
	</div>

	<div class="section-title-container">
		<div class="section-title commands-settings">Commands settings</div>
		<div class="underline-vector"></div>
	</div>

	<div class="commands-list">
		<Tab
			tabs={[
				{ label: 'Work' },
				{ label: 'Crime' },
				{ label: 'Slut' },
				{ label: 'Rob' },
				{ label: 'Roulette' },
				{ label: 'Blackjack' },
				{ label: 'Slot machine' }
			]}
			{selectedTab}
			onTabSelect={handleTabSelect}
			style={'command-tabs'}
		></Tab>
	</div>
	<div class="command-settings-list">
		<div class="settings-boxes">
			<div class="settings-box">
				<div class="inputs-wrapper">
					<div class="inputs-row">
						<div class="cooldown input">
							<span class="input-label">Cooldown</span>
							<input type="text" class="command-setting-input" placeholder="$" maxlength="5" />
						</div>
						<div class="chance input">
							<span class="input-label">Chance of winning</span>
							<input type="text" class="command-setting-input" placeholder="$" maxlength="5" />
						</div>
					</div>
				</div>
			</div>

			<div class="settings-box payout">
				Payout

				<span class="payout range-boxes">
					<RangeBox label="min" value="" placeholder="" />
					<RangeBox label="max" value="" placeholder="" />
				</span>
			</div>
		</div>

		<div class="logsContainer">
			<div class="search-container">
				<button class="search-bar" onclick={toggleSearch}>
					<svg
						width="12"
						height="11"
						viewBox="0 0 12 11"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_3053_1241)">
							<path
								d="M7.96247 0C5.73279 0.000214843 3.92577 1.76709 3.92555 3.94719C3.92564 4.90801 4.27735 5.78796 4.86086 6.47239L4.03271 7.28214C4.02941 7.28536 4.02888 7.28905 4.02576 7.2923C3.61705 7.10334 3.11658 7.16384 2.77941 7.49348L1.07201 9.16227C0.642664 9.5821 0.642664 10.2647 1.07201 10.6845C1.50217 11.1051 2.1987 11.1051 2.62886 10.6845L4.33628 9.01575C4.67433 8.68521 4.73603 8.19597 4.54168 7.79619C4.54491 7.7932 4.54854 7.79273 4.55172 7.78962L5.37987 6.97987C6.07985 7.55039 6.97981 7.89427 7.96247 7.89435C10.1921 7.89414 11.9991 6.12727 11.9994 3.94721C11.9991 1.76709 10.1921 0.000214843 7.96247 0ZM7.96247 6.45901C6.54486 6.45836 5.3942 5.33327 5.39352 3.94721C5.39418 2.5611 6.54484 1.43597 7.96247 1.43535C9.38007 1.43597 10.5307 2.56108 10.5314 3.94721C10.5307 5.33327 9.38007 6.45836 7.96247 6.45901Z"
								fill="white"
							/>
						</g>
						<defs>
							<clipPath id="clip0_3053_1241">
								<rect width="12" height="11" fill="white" />
							</clipPath>
						</defs>
					</svg>

					{isSearchActive ? 'Close' : 'Search replies'}
				</button>
				{#if isSearchActive}
					<input
						type="text"
						class="search-input"
						placeholder="Search by user, role or date..."
						bind:value={searchQuery}
					/>
				{/if}
			</div>

			<div class="info-row header-row">
				<div class="id">#</div>
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
					Added by
				</div>
				<div class="header-title action-header">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
					>
						<path
							d="M0.707031 14.7071L2.61612 12.798M2.61612 12.798C5.16158 15.3991 7.07067 14.0707 8.34339 12.798L8.97976 12.1616L3.25249 6.43436L2.61612 7.07073C1.34339 8.34346 0.0706675 10.1969 2.61612 12.798ZM12.7979 2.61618L14.707 0.707092M12.7979 2.61618C15.3773 5.16164 14.0707 7.07073 12.7979 8.34346L12.1616 8.97982L6.4343 3.25255L7.07067 2.61618C8.34339 1.34346 10.2186 0.0707285 12.7979 2.61618ZM5.79794 7.07073L7.70703 5.16164M8.34339 9.61618L10.2525 7.70709"
							stroke="white"
							stroke-opacity="0.48"
							stroke-width="2"
						/>
					</svg>
					Reply
				</div>
				<div class="header-title action-header">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
					>
						<path
							d="M0.707031 14.7071L2.61612 12.798M2.61612 12.798C5.16158 15.3991 7.07067 14.0707 8.34339 12.798L8.97976 12.1616L3.25249 6.43436L2.61612 7.07073C1.34339 8.34346 0.0706675 10.1969 2.61612 12.798ZM12.7979 2.61618L14.707 0.707092M12.7979 2.61618C15.3773 5.16164 14.0707 7.07073 12.7979 8.34346L12.1616 8.97982L6.4343 3.25255L7.07067 2.61618C8.34339 1.34346 10.2186 0.0707285 12.7979 2.61618ZM5.79794 7.07073L7.70703 5.16164M8.34339 9.61618L10.2525 7.70709"
							stroke="white"
							stroke-opacity="0.48"
							stroke-width="2"
						/>
					</svg>
					Actions
				</div>
			</div>
			{#each filteredLogRows as row, i}
				<div class="info-row" id={'row-' + row.id}>
					<div class="id">{i + 1}</div>
					<div class="user-info">
						<img src={row.avatar} alt="avatar" class="user-avatar" />
						<div>
							<div class="username">{row.user}</div>
							<div class="date">{row.date}</div>
						</div>
					</div>
					<div class="action-info">
						<div class="action">{row.action}</div>
					</div>
					<div class="actions">
						<div class="delete">
							<svg
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10.7308 1.89474L8.19231 0H4.80769L2.26923 1.89474H1V10.7368C1 11.4316 1.76154 12 2.69231 12H10.3077C11.2385 12 12 11.4316 12 10.7368V1.89474H10.7308Z"
									fill="#4D4D4D"
								/>
								<path
									d="M6.69444 11H6.30556C5.99444 11 5.72222 10.7773 5.72222 10.5227V4.47727C5.72222 4.22273 5.99444 4 6.30556 4H6.69444C7.00556 4 7.27778 4.22273 7.27778 4.47727V10.5227C7.27778 10.7773 7.00556 11 6.69444 11ZM9.41667 11C9.10556 11 8.83333 10.7773 8.83333 10.5227V4.47727C8.83333 4.22273 9.10556 4 9.41667 4C9.72778 4 10 4.22273 10 4.47727V10.5227C10 10.7773 9.72778 11 9.41667 11ZM3.58333 11C3.27222 11 3 10.7773 3 10.5227V4.47727C3 4.22273 3.27222 4 3.58333 4C3.89444 4 4.16667 4.22273 4.16667 4.47727V10.5227C4.16667 10.7773 3.89444 11 3.58333 11Z"
									fill="white"
									fill-opacity="0.8"
								/>
								<path
									d="M0.8 1H11.2C11.64 1 12 1.225 12 1.5V2H0V1.5C0 1.225 0.36 1 0.8 1Z"
									fill="white"
									fill-opacity="0.8"
								/>
							</svg>
						</div>
						<div class="edit">
							<svg
								width="11"
								height="12"
								viewBox="0 0 11 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M9.08944 4.89303L10.2456 3.63185C10.5957 3.24914 10.7734 3.05743 10.8661 2.85098C10.9536 2.65714 11 2.44375 11 2.22741C11 2.01107 10.9536 1.79768 10.8661 1.60384C10.7734 1.39739 10.5957 1.20568 10.2456 0.822972C9.89537 0.440263 9.72027 0.248558 9.52973 0.146034C9.35206 0.0499702 9.15638 0 8.95812 0C8.75985 0 8.56417 0.0499702 8.3865 0.146034C8.19854 0.248558 8.02086 0.440263 7.67068 0.822972L6.4991 2.10031C7.12222 3.2636 8.01572 4.22696 9.08944 4.89303ZM5.56442 3.12133L1.14082 7.94557C0.867883 8.24472 0.731398 8.39359 0.641278 8.57757C0.551158 8.76015 0.512556 8.9673 0.437885 9.38161L0.041345 11.5423C-0.00242773 11.7755 -0.0230292 11.892 0.0387676 11.9588C0.0979896 12.0255 0.206129 12.0016 0.419843 11.9552L2.39993 11.5227C2.78101 11.4405 2.96898 11.3991 3.13892 11.3008C3.30629 11.2025 3.44275 11.0536 3.71569 10.7552L8.15218 5.91687C7.10936 5.20557 6.22617 4.25103 5.56442 3.12204"
									fill="white"
									fill-opacity="0.8"
								/>
							</svg>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/await}

<style>
	.section-title-container {
		display: inline-block;
		margin-bottom: 1.5rem;
		padding-left: 0;
		margin-left: 0;
	}
	:global(.tabs.command-tabs) {
		--tab-color: rgba(255, 253, 253, 0.5);
		--tab-hover-color: #e6f0ff;
		--tab-selected-color: rgba(255, 253, 253, 0.4);
		--tab-font-weight: 600;
		--tab-selected-background: rgba(0, 0, 0, 0.6);
		--tab-selected-weight: 700;
		--tab-font-family: Poppins, sans-serif;
		--tab-selected-font-family: Poppins, sans-serif;
		--tab-font-size: 13px;
		--tabs-border-color: rgba(255, 255, 255, 0.08);
		--tab-selected-height: 46px;
		--tab-selected-border-bottom: transparent;
		--tab-width: auto;
		--tab-height: 46px;
		--tab-selected-padding-right: 20px;
		--tab-padding-right: 20px;
		--tab-border-radius: 10px;
		--tab-selected-border-radius: 10px;
		gap: 5px;
	}
	.settings-box.payout {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		color: #fff;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	.payout.range-boxes {
		display: flex;
		flex-direction: row;
		gap: 20px;
	}
	.cooldown.input,
	.chance.input {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
		text-wrap: nowrap;
		color: #fff;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.section-title {
		color: #fff;
		text-align: left;
		font:
			700 20px Poppins,
			sans-serif;
		text-wrap: nowrap;
	}
	.section-title.commands-settings {
		margin-top: 40px;
	}
	.commands-list {
		margin-top: 40px;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.4);
		width: 1345px;
		height: 46px;
	}
	.command-settings-list {
		margin-top: 10px;
		width: 1345px;
		height: 501px;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.4);
	}
	.command-setting-input {
		width: 100px;
		height: 35px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.19);
		background: rgba(1, 1, 1, 0.2);
		color: #fff;
		font-family: Poppins, sans-serif;
		font-size: 13px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}
	.boxes-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		width: 100%;
	}

	@media (max-width: 1200px) {
		.boxes-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.boxes-grid {
			grid-template-columns: 1fr;
		}
	}

	.setting-box {
		min-height: 188px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: linear-gradient(110deg, rgba(0, 0, 0, 0.28) 1.21%, rgba(0, 0, 0, 0.4) 99.64%);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
	}
	.settings-box {
		width: 337px;
		height: 134px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		gap: 42px;
		padding-left: 20px;
		padding-top: 20px;
	}
	.settings-boxes {
		display: flex;
		flex-direction: column;
		padding-top: 30px;
		padding-left: 30px;
		gap: 40px;
	}
	.inputs-wrapper {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
	}
	.inputs-row {
		display: flex;
		gap: 42px;
	}
	.symbol-box,
	.starting-point-box {
		max-width: 286px;
	}
	.starting-point-switch {
		display: flex;
		align-items: center;
		gap: 10px;
		color: rgba(255, 255, 255, 0.3);
		font-family: Poppins, sans-serif;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	.additional-box {
		max-width: 386px;
	}

	.actions {
		display: inline-flex;
		flex-direction: row;
		gap: 15px;
		justify-content: flex-end;
	}
	.delete {
		fill: rgba(74, 70, 70, 0.4);

		width: 29px;
		height: 29px;
	}
	.edit {
		width: 29px;
		height: 29px;
		fill: rgba(74, 70, 70, 0.4);

		stroke-width: 1px;
		stroke: rgba(0, 0, 0, 0.2);
	}
	@media (max-width: 768px) {
		.symbol-box,
		.starting-point-box,
		.additional-box {
			max-width: 100%;
		}
	}

	.box-title {
		color: #fff;
		font:
			600 16px Poppins,
			sans-serif;
		margin: 0 0 0.5rem 0;
	}

	.symbol-input,
	.amount-input {
		background: rgba(1, 1, 1, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 10px;
		color: #fff;
		color: rgba(255, 255, 255, 0.5);
		font-family: 'Be Vietnam Pro', sans-serif;
		padding-left: 10px;
		font-size: 20px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		outline: none;
		transition: border-color 0.15s ease;
		margin-top: auto;
		width: 209px;
		height: 42px;
	}

	.symbol-input:focus,
	.amount-input:focus {
		border-color: rgba(46, 109, 226, 0.8);
	}

	.symbol-input::placeholder,
	.amount-input::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	.amount-input {
		-moz-appearance: textfield;
		appearance: textfield;
	}

	.switch-row {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 10px;
	}

	.switch-label {
		text-align: left;
		color: rgba(255, 255, 255, 0.3);
		font-family: Poppins, sans-serif;
		font-size: 14px;
		font-weight: 400;
		line-height: 1;
	}
	.logsContainer {
		color: #d1d5db;
		border-radius: 12px;
		max-height: 380px;
		overflow-y: auto;
		overflow-x: auto;
		width: 100%;
		max-width: 830px;
		-webkit-overflow-scrolling: touch;
		margin-left: 500px;
		margin-top: -350px;
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
		grid-template-columns: 40px minmax(100px, 150px) 220px minmax(200px, 250px) 1fr;
		gap: 10px;
		align-items: center;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 10px;
		width: max-content;
		min-width: 830px;
		height: 71px;
		box-sizing: border-box;
		transition: 0.3s;
		padding: 0 20px;
		-webkit-overflow-scrolling: touch;
		margin-top: 10px;
	}
	.info-row.header-row {
		display: grid;
		grid-template-columns: 40px minmax(150px, 200px) 390px minmax(200px, 250px) 1fr;
		margin-top: 40px;
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
		font-size: 10px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		text-wrap: wrap;
		width: 375px;
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
	.header-row {
		display: grid;
		grid-template-columns: 40px minmax(230px, 288px) minmax(180px, 230px) 1fr;
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
	.search-bar {
		display: inline-flex;
		padding: 12px 20px 12px 11px;
		align-items: center;
		gap: 11px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.21);
		background: rgba(0, 0, 0, 0.21);
		box-shadow: 0 4px 16px 3px rgba(0, 0, 0, 0.25);
		color: #fff;
		text-align: center;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		cursor: pointer;
		transition: background 0.2s ease;
	}
	.search-bar:hover {
		background: rgba(0, 0, 0, 0.35);
	}
	.search-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;
		margin-bottom: 10px;
	}
	.search-input {
		flex: 1;
		max-width: 400px;
		height: 42px;
		padding: 0 15px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.21);
		background: rgba(0, 0, 0, 0.21);
		color: #fff;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		outline: none;
		transition: border-color 0.15s ease;
	}
	.search-input:focus {
		border-color: rgba(46, 109, 226, 0.8);
	}
	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}
</style>
