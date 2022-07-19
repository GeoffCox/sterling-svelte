<script lang="ts">
	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';

	import Slider from '$lib/inputs/Slider.svelte';

	let valueX = -20;
	let value1 = 35;
	let value2 = 80;
	let value3 = 80;
	let value4 = -20;
	let value5 = 0;
</script>

<div>
	<ExampleSection title="Slider">
		<ExampleCard name="default">
			<div class="horizontal-container">
				<Slider bind:value={value1} />
				{value1}
			</div>
		</ExampleCard>
		<ExampleCard name="disabled">
			<div class="horizontal-container">
				<Slider value={55} disabled />
				{55}
			</div>
		</ExampleCard>
		<ExampleCard name="range from 75 to 150">
			<div class="horizontal-container">
				<Slider bind:value={value2} min={75} max={150} />
				{value2}
			</div>
		</ExampleCard>
		<ExampleCard name="range from -30 to -15">
			<div class="horizontal-container">
				<Slider bind:value={value3} min={-30} max={-15} />
				{value3}
			</div>
		</ExampleCard>
		<ExampleCard name="step by 7">
			<div class="horizontal-container">
				<Slider bind:value={value4} step={7} max={77} />
				{value4}
			</div>
		</ExampleCard>
		<ExampleCard name="precision 2">
			<div class="horizontal-container">
				<Slider bind:value={value5} precision={2} />
				{value5}
			</div>
		</ExampleCard>
	</ExampleSection>
	<ExampleSection title="Slider (vertical)">
		<ExampleCard name="default">
			<div class="vertical-container">
				<Slider bind:value={value1} vertical />
				{value1}
			</div>
		</ExampleCard>
		<ExampleCard name="disabled">
			<div class="vertical-container">
				<Slider value={55} disabled vertical />
				{55}
			</div>
		</ExampleCard>
		<ExampleCard name="range from 75 to 150">
			<div class="vertical-container">
				<Slider bind:value={value2} min={75} max={150} vertical />
				{value2}
			</div>
		</ExampleCard>
		<ExampleCard name="range from -30 to -15">
			<div class="vertical-container">
				<Slider bind:value={value3} min={-30} max={-15} vertical />
				{value3}
			</div>
		</ExampleCard>
		<ExampleCard name="step by 7">
			<div class="vertical-container">
				<Slider bind:value={value4} step={7} max={77} vertical />
				{value4}
			</div>
		</ExampleCard>
		<ExampleCard name="precision 2">
			<div class="vertical-container">
				<Slider bind:value={value5} precision={2} vertical />
				{value5}
			</div>
		</ExampleCard>
	</ExampleSection>
</div>

<style>
	.horizontal-container {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		width: 450px;
		height: 100px;
		padding: 0;
	}

	.vertical-container {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		height: 450px;
		width: 10px;
		padding: 0;
	}
</style>
