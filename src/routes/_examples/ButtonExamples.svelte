<script lang="ts">
	import { sendNotification } from '../../stores';

	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';
	import SvelteIcon from '../_components/SvelteIcon.svelte';

	import Button from '$lib/buttons/Button.svelte';
	import OutlineButton from '$lib/buttons/OutlineButton.svelte';
	import LinkButton from '$lib/buttons/LinkButton.svelte';
	import GhostButton from '$lib/buttons/GhostButton.svelte';
	import PrimaryButton from '$lib/buttons/PrimaryButton.svelte';
</script>

<div>
	<ExampleSection title="Button">
		<ExampleCard name="default">
			<Button on:click={() => sendNotification('Button clicked')}>Sterling</Button>
		</ExampleCard>
		<ExampleCard name="disabled">
			<Button disabled on:click={() => sendNotification('Button clicked')}>Sterling</Button>
		</ExampleCard>
		<ExampleCard name="with icon">
			<Button on:click={() => sendNotification('Button clicked')}>
				<SvelteIcon />
				<span> Sterling </span>
			</Button>
		</ExampleCard>
	</ExampleSection>
	<ExampleSection title="OutlineButton">
		<ExampleCard name="default">
			<OutlineButton on:click={() => sendNotification('Button clicked')}>Sterling</OutlineButton>
		</ExampleCard>
		<ExampleCard name="disabled">
			<OutlineButton disabled on:click={() => sendNotification('Button clicked')}
				>Sterling</OutlineButton
			>
		</ExampleCard>
		<ExampleCard name="with icon">
			<OutlineButton on:click={() => sendNotification('Button clicked')}>
				<SvelteIcon />
				<span> Sterling </span>
			</OutlineButton>
		</ExampleCard>
	</ExampleSection>
	<ExampleSection title="GhostButton">
		<ExampleCard name="default">
			<GhostButton on:click={() => sendNotification('Button clicked')}>Sterling</GhostButton>
		</ExampleCard>
		<ExampleCard name="disabled">
			<GhostButton disabled on:click={() => sendNotification('Button clicked')}
				>Sterling</GhostButton
			>
		</ExampleCard>
		<ExampleCard name="with icon">
			<GhostButton on:click={() => sendNotification('Button clicked')}>
				<SvelteIcon />
				<span> Sterling </span>
			</GhostButton>
		</ExampleCard>
	</ExampleSection>
	<ExampleSection title="LinkButton">
		<ExampleCard name="default">
			<LinkButton on:click={() => sendNotification('Button clicked')}>Sterling</LinkButton>
		</ExampleCard>
		<ExampleCard name="disabled">
			<LinkButton disabled on:click={() => sendNotification('Button clicked')}>Sterling</LinkButton>
		</ExampleCard>
		<ExampleCard name="with icon">
			<LinkButton on:click={() => sendNotification('Button clicked')}>
				<SvelteIcon />
				<span> Sterling </span>
			</LinkButton>
		</ExampleCard>
	</ExampleSection>
	<ExampleSection title="PrimaryButton">
		<ExampleCard name="default">
			<PrimaryButton on:click={() => sendNotification('Button clicked')}>Sterling</PrimaryButton
			>
		</ExampleCard>
		<ExampleCard name="disabled">
			<PrimaryButton disabled on:click={() => sendNotification('Button clicked')}
				>Sterling</PrimaryButton
			>
		</ExampleCard>
		<ExampleCard name="with icon">
			<PrimaryButton on:click={() => sendNotification('Button clicked')}>
				<SvelteIcon />
				<span> Sterling </span>
			</PrimaryButton>
		</ExampleCard>
	</ExampleSection>
</div>
