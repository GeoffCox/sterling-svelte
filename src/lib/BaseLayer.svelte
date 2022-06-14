<script lang="ts">
	export let level: number = 0;
</script>

<div class={`base-layer-${level}`}>
	<slot />
</div>

<style>
	.base-layer-0 {
		background-color: var(--BaseLayer__background-color);
		color: var(--BaseLayer__color);
	}

	.base-layer-1 {
		background-color: var(--BaseLayer__background-color--1);
		color: var(--BaseLayer__color--1);
	}

	.base-layer-2 {
		background-color: var(--BaseLayer__background-color--2);
		color: var(--BaseLayer__color--2);
	}

	.base-layer-3 {
		background-color: var(--BaseLayer__background-color--3);
		color: var(--BaseLayer__color--3);
	}
</style>
