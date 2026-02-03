<script lang="ts">
	let {
		placeholder = '',
		label,
		value = $bindable()
	}: { placeholder?: string; label: string; value: string } = $props();
</script>

<div class="range-box">
	<input bind:value {placeholder} class="input" type="text" />

	<div class="divider"></div>

	<span class="label">{label}</span>
</div>

<style>
	.range-box {
		display: inline-flex;
		height: 43px;
		width: 120px;
		justify-content: flex-end;
		align-items: center;
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 5px;
	}

	.input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: white;
		max-width: 70px;
		font-size: 18px;
	}

	.divider {
		width: 5px;
		height: 100%;
		background: #2a2a2a;
	}

	.label {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		width: 50px;
		height: 42px;
		text-align: center;
		color: #cfcfcf;
		font-size: 18px;
		text-transform: lowercase;
		background: rgba(0, 0, 0, 0.2);
		border-left: 1px solid rgba(255, 255, 255, 0.2);
		padding: 0 10px;
	}

	.input::placeholder {
		color: #666;
	}
</style>
