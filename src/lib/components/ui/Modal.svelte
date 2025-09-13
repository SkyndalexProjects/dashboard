<script lang="ts">
	let { showModal = $bindable(), header, children } = $props();
	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (showModal) dialog?.showModal();
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div>
		<!-- svelte-ignore a11y_autofocus -->
		<button autofocus onclick={() => dialog?.close()}> X </button>

		{@render header?.()}
		{@render children?.()}
	</div>
</dialog>

<style>
	dialog {
		border-radius: 0.2em;
		border: none;
		padding: 0;
		background-color: rgb(0, 0, 0, 0.2);
		z-index: 10000;
	}
	dialog::backdrop {
		backdrop-filter: blur(15px);
		background-color: rgba(0, 0, 0, 0.4);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
		all: unset;
		color: white;
		cursor: pointer;
	}
</style>
