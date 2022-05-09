<script lang="ts">
    export let level : number = 0;
</script>

<div class={`base-layer-${level}`}>
	<slot />
</div>

<style>
	.base-layer-0 {
		background-color: var(--BaseLayer__background-color, white);
		border-color: var(--BaseLayer__border-color, black);
		color: var(--BaseLayer__color, black);
	}

    .base-layer-1 {
		background-color: var(--BaseLayer__background-color--1, white);
		border-color: var(--BaseLayer__border-color--1, black);
		color: var(--BaseLayer__color--1, black);
	}

    .base-layer-2 {
		background-color: var(--BaseLayer__background-color--2, white);
		border-color: var(--BaseLayer__border-color--2, black);
		color: var(--BaseLayer__color--2, black);
	}

    .base-layer-3 {
		background-color: var(--BaseLayer__background-color--3, white);
		border-color: var(--BaseLayer__border-color--3, black);
		color: var(--BaseLayer__color--3, black);
	}
</style>
