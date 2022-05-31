<script lang="ts">
	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';

	import Select from '$lib/inputs/Select.svelte';
	import { sendNotification } from '../../stores';

	const items = Array(500)
		.fill(1)
		.map((x, i) => i + 1);

	let disabled = true;
</script>

<div>
	<ExampleSection title="List">
		<ExampleCard name="default">
			<div class="vertical">
				<Select
					{items}
					let:item
					on:itemSelected={(event) => {
						sendNotification(`List item selected [${event.detail.index}] 'Item ${event.detail.item}'`);
					}}
				>
					<div class="list-item">Item {item}</div>
				</Select>
			</div>
		</ExampleCard>
	</ExampleSection>
</div>

<style>
	.vertical {
		height: 410px;
		display: flex;
		flex-direction: column;
		justify-items: stretch;
	}

	.horizontal {
		width: 410px;
		display: flex;
		flex-direction: row;
		justify-items: stretch;
	}

	.list-item {
		padding: 5px 15px 5px 10px;
	}
</style>
