<script lang="ts">
	let { active = $bindable(false) }: { active: boolean } = $props();
</script>

<button
	onclick={() => (active = !active)}
	class="switch"
	data-checked={active}
	aria-label={active ? 'Switch on' : 'Switch off'}
	role="switch"
	aria-checked={active}
>
	<span class="thumb"></span>
</button>

<style>
	.switch {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 38px;
		height: 21px;
		padding: 2px;
		border-radius: 10px;
		background: rgba(46, 109, 226, 0.58);
		border: none;
		cursor: pointer;
		transition:
			background 0.15s ease,
			box-shadow 0.15s ease;
		flex-shrink: 0;
	}

	.switch[data-checked='true'] {
		background: rgba(46, 109, 226, 0.8);
	}

	.switch:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.switch:focus-visible {
		outline: 2px solid #2e6de2;
		outline-offset: 2px;
	}

	.thumb {
		width: 17px;
		height: 17px;
		background: #fff;
		border-radius: 50%;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
		transition: transform 0.15s ease;
		transform: translateX(0);
	}

	.switch[data-checked='true'] .thumb {
		transform: translateX(17px);
	}
</style>
