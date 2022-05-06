<script lang="ts">
    export let level : number = 0;
</script>

<div class={`base-layer${level}`}>
	<slot />
</div>

<style>
	.base-layer0 {
		background-color: var(--Theme__base__background-color, #fff);
		border-color: var(--Theme__base__border-color, #222);
		color: var(--Theme__base__color, #222);
	}

    .base-layer1 {
		background-color: var(--Theme__base__background-color, #fff);
		border-color: var(--Theme__base__border-color, #222);
		color: var(--Theme__base__color, #222);
	}

    .base-layer2 {
		background-color: var(--Theme__base__background-color, #fff);
		border-color: var(--Theme__base__border-color, #222);
		color: var(--Theme__base__color, #222);
	}

    .base-layer3 {
		background-color: var(--Theme__base__background-color, #fff);
		border-color: var(--Theme__base__border-color, #222);
		color: var(--Theme__base__color, #222);
	}
</style>
