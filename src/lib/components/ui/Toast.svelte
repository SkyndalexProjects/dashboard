<script lang="ts">
	let { status, children } = $props();
	// TODO: delete toast when animation is finished
	// TODO: manual deletion option
	// TODO: showing multiple toasts at once and deleting them automatically/interactively
</script>

{#if status === 'loading'}
	<div class="toast">
		{@render children?.()}
		<div class="toast-progress"></div>
	</div>
{/if}

{#if status === 'success'}
	<div class="toast">
		{@render children?.()}
		<div class="toast-progress-success"></div>
	</div>
{/if}

<style>
	.toast {
		font-family: 'Poppins', Tahoma, Geneva, Verdana, sans-serif;
		position: fixed;
		top: 1rem;
		right: 1rem;
		background-color: #3a3a3a;
		color: white;
		padding: 1rem 1.5rem 1.5rem 1.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
		z-index: 1000;
		min-width: 200px;
		overflow: hidden;
	}
	.toast-progress-success {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 5px;
		background: #4caf50;
		border-radius: 0 0 0.5rem 0.5rem;
		animation: progress-success-reverse 2.5s linear forwards;
	}
	.toast-progress {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 5px;
		background: repeating-linear-gradient(
			90deg,
			#000 0%,
			#444 10%,
			#bbb 20%,
			#fff 30%,
			#bbb 40%,
			#444 50%,
			#000 60%,
			transparent 70%,
			transparent 100%
		);
		background-size: 200% 100%;
		animation: progress-chase 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
		border-radius: 0 0 0.5rem 0.5rem;
		box-shadow: 0 0 8px 2px #fff3;
	}

	@keyframes progress-chase {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
	@keyframes progress-success-reverse {
		from {
			width: 100%;
		}
		to {
			width: 0%;
		}
	}
</style>
