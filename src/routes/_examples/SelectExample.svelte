<script lang="ts">
	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';

	import Select from '$lib/inputs/Select.svelte';
	import { sendNotification } from '../../stores';

	const items = [
		'Alabama',
		'Alaska',
		'Arizona',
		'Arkansas',
		'California',
		'Colorado',
		'Connecticut',
		'Delaware',
		'Florida',
		'Georgia',
		'Hawaii',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Maryland',
		'Massachusetts',
		'Michigan',
		'Minnesota',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Jersey',
		'New Mexico',
		'New York',
		'North Carolina',
		'North Dakota',
		'Ohio',
		'Oklahoma',
		'Oregon',
		'Pennsylvania',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'Utah',
		'Vermont',
		'Virginia',
		'Washington',
		'West Virginia',
		'Wisconsin',
		'Wyoming'
	];

	let disabled = true;
</script>

<div>
	<ExampleSection title="Select">
		<ExampleCard name="default">
			<Select
				{items}
				let:item
				on:itemSelected={(event) => {
					sendNotification(
						`Select: on:select [${event.detail.index}] ${items[event.detail.index]}`
					);
				}}
				on:pendingItemSelected={(event) => {
					sendNotification(
						`Select: on:pendingSelect [${event.detail.index}] ${items[event.detail.index]}`
					);
				}}
			/>
		</ExampleCard>
		<ExampleCard name="disabled">
			<Select {items} disabled let:item>
				<div class="item">{item}</div>
			</Select>
		</ExampleCard>
		<ExampleCard name="custom popup size">
			<Select {items} let:item popupWidth="50ch" popupHeight="7rem">
				<div class="item">{item}</div>
			</Select>
		</ExampleCard>
	</ExampleSection>
</div>

<style>
	.item {
		padding: 0.5em 15px 0.5em 10px;
	}
</style>
