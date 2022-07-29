<script lang="ts">
	export let name: string;
</script>

<div class="example">
	<div class="component">
		<div class="name">{name}</div>
		<slot name="component" />
	</div>
	<div class="options">
		<slot name="options" />
	</div>
</div>

<style>
	.example {
		background-color: var(--BaseLayer__background-color);
		color: var(--BaseLayer__color);
		border: 1px dashed lightgray;
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 15px;
	}

	.name {
		font-weight: 600;
	}

	.component {
		padding: 5px 0;
		align-self: center;
		display: flex;
		flex-direction: column;
		row-gap: 5px;
		align-items: center;
	}

	.options {
		background-color: var(--BaseLayer__background-color--2);
		color: var(--BaseLayer__color--2);
		margin: 20px;
	}
</style>
