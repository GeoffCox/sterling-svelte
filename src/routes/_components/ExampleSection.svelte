<script lang="ts">
	export let title: string;
</script>

<div class="section">
	<h1>{title}</h1>
	<div class="grid">
		<slot />
	</div>
</div>

<style>
	h1 {
		font-size: 1.1rem;
	}
	.section {
		padding: 0 25px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 500px));
		grid-template-rows: auto;
		gap: 1em;
		place-items: stretch;
		place-content: stretch;
	}
</style>
