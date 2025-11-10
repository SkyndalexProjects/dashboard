<script lang="ts">
	import type { APIGuild as BaseAPIGuild, GuildFeature } from 'discord-api-types/v10';
	const { data } = $props();
	interface APIGuild extends BaseAPIGuild {
		isBotAdded: boolean;
	}
	const guilds: APIGuild[] = data.guilds as APIGuild[];
	const adminGuilds = guilds.filter((guild) => (Number(guild.permissions ?? 0) & 0x8) === 0x8);
	const withBotAdded = adminGuilds.filter((guild) => guild.isBotAdded);
	const withoutBotAdded = adminGuilds.filter((guild) => !guild.isBotAdded);

	function handleImageError(event: Event) {
		(event.target as HTMLImageElement).src = '/default_guild_icon.png';
	}

	function renderGuild(guild: APIGuild) {
		return {
			guild,
			iconUrl: guild?.icon
				? `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`
				: '/icons/default_guild_icon.png',
			isCommunity: guild.features?.includes(<GuildFeature>'COMMUNITY')
		};
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
<h1 class="title">Choose guild</h1>

<section class="guilds">
	{#if data}
		<div class="guilds-grid">
            {#each [...withBotAdded, ...withoutBotAdded] as guild, index (guild?.id)}
				{@const { iconUrl, isCommunity } = renderGuild(guild)}
                <div class="guild" style="--animation-order: {index};">
					<img src={iconUrl} alt="<no icon>" onerror={handleImageError} class="guild-icon" />
					<div class="guild-info-headers">
						<span class="guild-name" data-fullname={guild.name}>{guild?.name}</span>

						{#if isCommunity}
							<div class="guild-info-header">
								<svg
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M4.14746 0.0303413C4.70996 -0.166808 5.4 0.661316 6 0.661316C6.6 0.661316 7.31255 -0.127378 7.85258 0.0303413C8.3925 0.188138 8.535 1.32353 9 1.67838C9.465 2.03325 10.5002 1.82043 10.8452 2.30936C11.1899 2.79835 10.6727 3.76033 10.8452 4.35171C11.0177 4.94308 11.9999 5.37686 12 5.99975C12 6.62269 11.04 7.08796 10.8599 7.64782C10.6799 8.20772 11.1899 9.2254 10.8599 9.69068C10.5298 10.1557 9.48007 9.96684 9.01515 10.3216C8.55015 10.6765 8.42235 11.7726 7.85985 11.9697C7.2974 12.1666 6.60725 11.3387 6.0073 11.3387C5.40735 11.3388 4.69473 12.1274 4.15478 11.9697C3.61496 11.8118 3.46486 10.6766 3 10.3216C2.535 9.96676 1.49978 10.1796 1.15478 9.69068C0.809813 9.20175 1.32728 8.23926 1.15478 7.64782C0.982043 7.05652 0 6.62263 0 5.99975C0.000133261 5.37681 0.96015 4.91157 1.14013 4.35171C1.32009 3.79179 0.810158 2.77463 1.14013 2.30936C1.47013 1.84409 2.52749 2.0569 3 1.67838C3.47248 1.29987 3.58502 0.227559 4.14746 0.0303413Z"
										fill="white"
									/>
									<path
										d="M2.2934 5.07081L5.39783 3.12506C5.52739 3.04397 5.68629 3 5.84979 3C6.01329 3 6.17219 3.04397 6.30175 3.12506L9.40989 5.0678C9.52186 5.1377 9.60694 5.23216 9.65511 5.34005C9.70329 5.44795 9.71254 5.56478 9.68179 5.67681C9.65104 5.78884 9.58157 5.89139 9.48155 5.97239C9.38153 6.0534 9.25513 6.10948 9.11722 6.13405L8.99868 6.15513L8.6949 8.62497C8.67654 8.77356 8.59094 8.91131 8.45472 9.01149C8.3185 9.11166 8.14137 9.16713 7.95769 9.16713H7.33162C7.23337 9.16713 7.13914 9.1354 7.06967 9.07891C7.00019 9.02243 6.96116 8.94581 6.96116 8.86593V7.35993C6.96116 7.12028 6.84407 6.89045 6.63565 6.72099C6.42723 6.55153 6.14454 6.45633 5.84979 6.45633C5.55504 6.45633 5.27235 6.55153 5.06393 6.72099C4.85551 6.89045 4.73842 7.12028 4.73842 7.35993V8.86593C4.73842 8.94581 4.69939 9.02243 4.62991 9.07891C4.56044 9.1354 4.46621 9.16713 4.36796 9.16713H3.74189C3.55821 9.16713 3.38108 9.11166 3.24486 9.01149C3.10864 8.91131 3.02305 8.77356 3.00468 8.62497L2.7009 6.15513L2.58236 6.13405C2.44445 6.10948 2.31805 6.0534 2.21803 5.97239C2.11801 5.89139 2.04854 5.78884 2.01779 5.67681C1.98704 5.56478 1.9963 5.44795 2.04447 5.34005C2.09264 5.23216 2.17772 5.1377 2.28969 5.0678L2.2934 5.07081Z"
										fill="black"
										fill-opacity="0.5"
									/>
								</svg>
								Community server
							</div>
						{:else}
							<div class="guild-info-header">🔒 Private server</div>
						{/if}

						<span class="guild-info-header">
							<svg
								width="13"
								height="10"
								viewBox="0 0 13 10"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M4.4697 0.0252844C5.0759 -0.139007 5.81955 0.551096 6.46617 0.551096C7.11278 0.551096 7.8807 -0.106148 8.46268 0.0252844C9.04455 0.156782 9.19812 1.10294 9.69925 1.39865C10.2004 1.69437 11.316 1.51703 11.6878 1.92447C12.0593 2.33196 11.5019 3.13361 11.6878 3.62643C11.8737 4.11923 12.9322 4.48072 12.9323 4.99979C12.9323 5.51891 11.8977 5.90663 11.7036 6.37318C11.5096 6.83977 12.0592 7.68784 11.7036 8.07556C11.3479 8.46309 10.2166 8.3057 9.71558 8.60136C9.21445 8.89708 9.07672 9.81048 8.47052 9.97477C7.86437 10.1389 7.1206 9.4489 6.47403 9.4489C5.82747 9.44904 5.05948 10.1061 4.47759 9.97477C3.89582 9.84314 3.73407 8.89715 3.23308 8.60136C2.73195 8.30564 1.61631 8.48301 1.2445 8.07556C0.87273 7.66812 1.4304 6.86605 1.2445 6.37318C1.05834 5.88043 0 5.51886 0 4.99979C0.000143614 4.48067 1.03475 4.09297 1.22872 3.62643C1.42265 3.15983 0.873102 2.31219 1.22872 1.92447C1.58436 1.53674 2.72386 1.71409 3.23308 1.39865C3.74227 1.08323 3.86356 0.189633 4.4697 0.0252844Z"
									fill="white"
								/>
								<g clip-path="url(#clip0_1571_1248)">
									<path
										d="M6.43412 4.70486C6.83353 4.70486 7.15731 4.30584 7.15731 3.81361C7.15731 3.32139 6.83353 2.92236 6.43412 2.92236C6.03472 2.92236 5.71094 3.32139 5.71094 3.81361C5.71094 4.30584 6.03472 4.70486 6.43412 4.70486Z"
										fill="black"
										fill-opacity="0.49"
									/>
									<path
										d="M7.35362 4.98144L7.18321 4.91895L6.43466 5.84269L5.68612 4.91895L5.51571 4.98144C5.07449 5.14519 4.77832 5.63519 4.77832 6.2027V7.2502H8.09098V6.2027C8.091 5.63519 7.79483 5.14519 7.35362 4.98144Z"
										fill="black"
										fill-opacity="0.49"
									/>
									<path
										d="M7.2895 2.75C7.16691 2.75 7.04942 2.79073 6.94629 2.86347C7.19567 3.06818 7.36049 3.41756 7.36049 3.8137C7.36049 4.04852 7.30254 4.26689 7.2035 4.44852C7.23196 4.45294 7.26059 4.45625 7.2895 4.45625C7.67189 4.45625 7.98225 4.07375 7.98225 3.6025C7.98225 3.13248 7.67189 2.75 7.2895 2.75Z"
										fill="black"
										fill-opacity="0.49"
									/>
									<path
										d="M8.16481 4.70648L7.99948 4.64648L7.75684 4.94554C8.08788 5.22378 8.29364 5.68659 8.29364 6.20274V6.87524H8.86873V5.87274C8.86872 5.33149 8.58574 4.86274 8.16481 4.70648Z"
										fill="black"
										fill-opacity="0.49"
									/>
									<path
										d="M5.92267 2.86347C5.81956 2.79073 5.70206 2.75 5.57947 2.75C5.19709 2.75 4.88672 3.13248 4.88672 3.6025C4.88672 4.07375 5.19709 4.45625 5.57947 4.45625C5.60837 4.45625 5.63702 4.45293 5.66546 4.44852C5.56642 4.2669 5.50848 4.04852 5.50848 3.8137C5.50848 3.41756 5.67329 3.06818 5.92267 2.86347Z"
										fill="black"
										fill-opacity="0.49"
									/>
									<path
										d="M4.86925 4.64648L4.70493 4.70648H4.70391C4.28299 4.86274 4 5.33149 4 5.87274V6.87524H4.57509V6.20274C4.57509 5.68647 4.78096 5.22358 5.11183 4.94545L4.86925 4.64648Z"
										fill="black"
										fill-opacity="0.49"
									/>
								</g>
								<defs>
									<clipPath id="clip0_1571_1248">
										<rect width="4.86857" height="6" fill="white" transform="translate(4 2)" />
									</clipPath>
								</defs>
							</svg>
							{guild.approximate_member_count} members
						</span>

                        <a
                                class="dashboard-link"
                                href={guild.isBotAdded
  ? `/dashboard/guild/${guild.id}/home`
  : `https://discord.com/oauth2/authorize?client_id=1037067718769254453&permissions=8&integration_type=0&scope=bot+applications.commands&guild_id=${guild.id}`}
                                target={guild.isBotAdded ? '_self' : '_blank'}
                                rel={guild.isBotAdded ? '' : 'noopener noreferrer'}
                        >
                            <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clip-path="url(#clip0_1575_1503)">
                                    <path
                                            d="M5.28769 1.15165C6.02508 0.414261 7.02519 0 8.06805 0C10.2396 0 12 1.76041 12 3.93198C12 4.97481 11.5858 5.97492 10.8484 6.71231L9.31065 8.25L8.25 7.18934L9.78772 5.65165C10.2438 5.19557 10.5 4.57698 10.5 3.93198C10.5 2.58883 9.41115 1.5 8.06805 1.5C7.42302 1.5 6.80443 1.75622 6.34835 2.21231L4.81066 3.75L3.75 2.68934L5.28769 1.15165Z"
                                            fill="#3E6BFF"
                                    />
                                    <path
                                            d="M5.65165 9.78772L7.18934 8.25L8.25 9.31065L6.71231 10.8484C5.97492 11.5858 4.97481 12 3.93198 12C1.76041 12 0 10.2396 0 8.06805C0 7.0252 0.41426 6.02508 1.15165 5.28769L2.68934 3.75L3.75 4.81066L2.21231 6.34835C1.75622 6.80443 1.5 7.42302 1.5 8.06805C1.5 9.41115 2.58883 10.5 3.93198 10.5C4.57698 10.5 5.19557 10.2438 5.65165 9.78772Z"
                                            fill="#3E6BFF"
                                    />
                                    <path
                                            d="M4.27941 8.78038L8.77941 4.28039L7.71876 3.21973L3.21875 7.71973L4.27941 8.78038Z"
                                            fill="#3E6BFF"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1575_1503">
                                        <rect width="12" height="12" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {guild.isBotAdded ? 'Get to the dashboard' : 'Invite bot'}
                        </a>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>

<style>
	.guilds {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		text-align: center;
		width: 100%;
		max-width: 1400px;
		padding: 0;
	}
	.title {
		color: #fff;
		display: flex;
		justify-content: center;
		margin-top: 120px;
		text-align: center;
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: clamp(24px, 5vw, 32px);
		font-weight: 700;
	}

    .guild {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 289px;
        min-height: 127px;
        margin-bottom: 50px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        background-color: rgba(0, 0, 0, 0.2);
        animation: fadeInUp 0.4s ease-out forwards;
        animation-delay: calc(var(--animation-order) * 0.05s);
        opacity: 0;
    }

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}


	.guild-name {
		font-family: 'Be Vietnam Pro', sans-serif;
		font-size: 16px;
		font-weight: 1000;
		color: #ffffff;
		max-width: 150px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: inline-block;
		position: relative;
		cursor: default;
		transition: max-width 0.3s ease-out;
	}

	.guild-name:hover {
		max-width: 500px;
		overflow: visible;
		z-index: 10;
	}

	.guild-info-headers {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-left: 15px;
		text-align: left;
		flex: 1;
	}
    .dashboard-link {
        font-size: 14px;
        font-family: 'Be Vietnam Pro', sans-serif;
        font-weight: 600;
        color: #3e6bff;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 5px;
        text-decoration: none;
        cursor: pointer;
    }
    .dashboard-link:hover {
        text-decoration: underline;
    }
	.guild-info-header {
		font-family: '--font-vietnam', sans-serif;
		color: rgba(255, 255, 255, 0.5);
		font-size: 13px;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.guild-icon {
		width: 71px;
		height: 71px;
		object-fit: cover;
		border-radius: 15px;
		margin-left: 20px;
		flex-shrink: 0;
	}

	.guilds-grid {
		margin-left: 100px;
		margin-bottom: 700px;
		display: grid;
		flex-direction: row;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		padding: 0;
		width: 100%;
	}

	@media (max-width: 768px) {
		.guilds-grid {
			grid-template-columns: 1fr;
			flex-direction: row;
			gap: 15px;
		}

		.guild {
			padding: 12px 15px;
		}

		.guild-icon {
			width: 60px;
			height: 60px;
		}
	}

	@media (min-width: 1400px) {
		.guilds-grid {
			grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		}
	}
</style>
