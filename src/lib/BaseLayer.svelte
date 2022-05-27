<script lang="ts">
    export let level : number = 0;
</script>

<div class={`base-layer-${level}`}>
	<slot />
</div>

<style>
	.base-layer-0 {
		background-color: var(--BaseLayer__background-color, white);
		color: var(--BaseLayer__color, black);
	}

    .base-layer-1 {
		background-color: var(--BaseLayer__background-color--1, white);
		color: var(--BaseLayer__color--1, black);
	}

    .base-layer-2 {
		background-color: var(--BaseLayer__background-color--2, white);
		color: var(--BaseLayer__color--2, black);
	}

    .base-layer-3 {
		background-color: var(--BaseLayer__background-color--3, white);
		color: var(--BaseLayer__color--3, black);
	}
</style>
