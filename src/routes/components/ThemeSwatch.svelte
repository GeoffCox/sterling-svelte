<script lang="ts">
	export let name: string;
</script>

<div class="theme-swatch">
	<div class="swatch" style="background-color: var({name})" />
	<div class="name">{name}</div>
</div>

<style>
	.theme-swatch {
		display: flex;
		align-items: center;
		align-content: center;
	}

	.swatch {
		width: 1em;
		height: 1em;
		margin-bottom: 0.25em;
		border: 1px dashed var(--Common__border-color);
	}

	.name {
		margin-left: 0.5em;
		line-height: 1em;
	}
</style>
