<script lang="ts">
	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';
	
	import List from '$lib/lists/List.svelte';

	const items =  Array(500).fill(1).map((x,i)=>i+1);
</script>

<div>
	<ExampleSection title="List">
		<ExampleCard name="default">
			<div class="vertical">
				<List items={items} let:item={item}>
					<div class="list-item">Item {item}</div>
				</List>
			</div>
		</ExampleCard>
		<ExampleCard name="tab key for item selection">
			<div class="vertical">
				<List items={items} let:item={item} selectionKeys="tab">
					<div class="list-item">Item {item}</div>
				</List>
			</div>
		</ExampleCard>
		<ExampleCard name="horizontal">
			<div class="horizontal">
				<List items={items} let:item={item} horizontal>
					<div class="list-item">Item {item}</div>
				</List>
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
