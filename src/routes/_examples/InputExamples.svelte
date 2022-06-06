<script lang="ts">
	import { sendNotification } from '../../stores';

	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';

	import Input from '$lib/inputs/Input.svelte';

	const inputOnChange = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		sendNotification(`Input on:change ${target.value}`);
	};

	const inputOnInput = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		sendNotification(`TextInput on:input ${target.value}`);
	};
</script>

<div>
	<ExampleSection title="Input">
		<ExampleCard name="default">
			<Input value="Sterling" on:input={inputOnInput} on:change={inputOnChange} />
			<Input placeholder="Sterling" />
		</ExampleCard>
		<ExampleCard name="disabled">
			<Input disabled value="Sterling" />
			<Input disabled placeholder="Sterling" />
		</ExampleCard>
	</ExampleSection>
</div>
