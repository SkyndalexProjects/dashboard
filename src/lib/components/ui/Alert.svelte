<script lang="ts">
	const { children, type, style = '' } = $props();
</script>

<div class="alert-wrapper {type}">
	<div class="alert-content {style}">
		{#if type === 'warning'}
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="icon"
			>
				<g clip-path="url(#clip0_1611_1245)">
					<path
						d="M20 10C20 15.5225 15.5225 20 10 20C4.4775 20 0 15.5225 0 10C0 4.4775 4.4775 0 10 0C15.5225 0 20 4.4775 20 10Z"
						fill="#F1AB15"
					/>
					<path
						d="M9.46124 9.27141H11.3074V14.6155H9.46124V9.27141ZM11.5382 6.59934C11.5382 7.2693 11.0208 7.81392 10.3843 7.81392C9.74785 7.81392 9.23047 7.2693 9.23047 6.59934C9.23047 5.92938 9.74785 5.38477 10.3843 5.38477C11.0208 5.38477 11.5382 5.92938 11.5382 6.59934Z"
						fill="white"
					/>
				</g>
				<defs>
					<clipPath id="clip0_1611_1245">
						<rect width="20" height="20" fill="white" />
					</clipPath>
				</defs>
			</svg>
		{:else if type === 'info'}
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="icon"
			>
				<g clip-path="url(#clip0_1330_1011)">
					<path
						d="M20 10C20 15.5225 15.5225 20 10 20C4.4775 20 0 15.5225 0 10C0 4.4775 4.4775 0 10 0C15.5225 0 20 4.4775 20 10Z"
						fill="#3E6BFF"
					/>
					<path
						d="M9.46124 9.27141H11.3074V14.6155H9.46124V9.27141ZM11.5382 6.59934C11.5382 7.2693 11.0208 7.81392 10.3843 7.81392C9.74785 7.81392 9.23047 7.2693 9.23047 6.59934C9.23047 5.92938 9.74785 5.38477 10.3843 5.38477C11.0208 5.38477 11.5382 5.92938 11.5382 6.59934Z"
						fill="white"
					/>
				</g>
				<defs>
					<clipPath id="clip0_1330_1011">
						<rect width="20" height="20" fill="white" />
					</clipPath>
				</defs>
			</svg>
		{/if}

		<div class="content">
			{@render children()}
		</div>
	</div>
</div>

<style>
	.icon {
		padding-left: 15px;
		flex-shrink: 0;
	}
	.alert-wrapper {
		display: flex;
		width: 100%;
		min-height: 60px;
		border-left: 10px solid #f1ab15;
		border-radius: 5px;
		overflow: hidden;
	}

	.alert-wrapper.warning {
		border-left-color: #f1ab15;
	}

	.alert-wrapper.info {
		border-left-color: #275ee7;
	}

	.alert-content {
		display: flex;
		align-items: center;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		gap: 15px;
		text-align: left;
		color: rgba(255, 255, 255, 0.5);
		font-family: Poppins, sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding: 20px 20px 20px 0;
		animation: slideFromLeft 0.5s ease-out;
	}

	@media (max-width: 768px) {
		.alert-wrapper {
			min-height: auto;
		}
		.alert-content {
			font-size: 14px;
			padding: 15px 15px 15px 0;
		}
	}

	@keyframes slideFromLeft {
		from {
			transform: translateX(-100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	.content {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>
