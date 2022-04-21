<script lang="ts">
	import Button from '$lib/Button.svelte';
	import ExampleCard from './_components/ExampleCard.svelte';
	import SvelteIcon from './_components/SvelteIcon.svelte';
	import { notification, sendNotification } from '../stores';
</script>

<div class="app">
	<div class="notification">{$notification}</div>
	<div class="section">
		<h1>Button</h1>
		<div class="grid">
			<ExampleCard name="default">
				<Button on:click={() => sendNotification('Button clicked')}>Sterling</Button>
			</ExampleCard>
			<ExampleCard name="disabled">
				<svelte:fragment>
					<Button disabled on:click={() => sendNotification('Button clicked')}>Sterling</Button>
					<div class="checkered">
						<Button disabled on:click={() => sendNotification('Button clicked')}>Sterling</Button>
					</div>
				</svelte:fragment>
			</ExampleCard>
			<ExampleCard name="horizontal (with icon)">
				<Button on:click={() => sendNotification('Button clicked')}>
					<SvelteIcon />
					<span> Sterling </span>
				</Button>
			</ExampleCard>
			<ExampleCard name="vertical (with icon)">
				<Button vertical on:click={() => sendNotification('Button clicked')}>
					<SvelteIcon />
					<span> Sterling </span>
				</Button>
			</ExampleCard>
			<ExampleCard name="outline">
				<Button look="outline" on:click={() => sendNotification('Button clicked')}>Sterling</Button>
			</ExampleCard>
			<ExampleCard name="ghost">
				<Button look="ghost" on:click={() => sendNotification('Button clicked')}>Sterling</Button>
			</ExampleCard>
			<ExampleCard name="link">
				<Button look="link" on:click={() => sendNotification('Button clicked')}>Sterling</Button>
			</ExampleCard>
		</div>
	</div>
</div>

<style>
	.section {
		padding: 0 25px;
	}
	.notification {
		width: 100%;
		background: aliceblue;
		color: steelblue;
		font-size: 0.9rem;
		text-align: center;
		padding: 5px;
		height: 0.9rem;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, 300px);
		grid-template-rows: 150px;
		gap: 1em;
		place-items: stretch;
		place-content: stretch;
	}

	.grid h2 {
		font-size: 1rem;
	}

	.checkered {
		background-color: #bfbfbf;
		opacity: 1;
		background-image: repeating-linear-gradient(
				45deg,
				rgba(227, 227, 227, 1) 25%,
				transparent 25%,
				transparent 75%,
				rgba(227, 227, 227, 1) 75%,
				rgba(227, 227, 227, 1)
			),
			repeating-linear-gradient(
				45deg,
				rgba(227, 227, 227, 1) 25%,
				#bfbfbf 25%,
				#bfbfbf 75%,
				rgba(227, 227, 227, 1) 75%,
				rgba(227, 227, 227, 1)
			);
		background-position: 0 0, 10px 10px;
		background-size: 20px 20px;
		padding: 20px;
	}
</style>
