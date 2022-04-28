<script lang="ts">
	import Button from '$lib/Button.svelte';
	import LinkButton from '$lib/LinkButton.svelte';
	import ExampleCard from './_components/ExampleCard.svelte';
	import SvelteIcon from './_components/SvelteIcon.svelte';
	import { notification, sendNotification } from '../stores';
	import { buttonTheme } from '$lib/useButtonTheme';
	import { currentTheme } from './_components/useCurrentTheme';
	import OutlineButton from '$lib/OutlineButton.svelte';
	import PrimaryButton from '$lib/PrimaryButton.svelte';
	import GhostButton from '$lib/GhostButton.svelte';

	let darkMode = false;

	const toggleDarkMode = () => {
		darkMode = !darkMode;
	};

	$: {
		console.log(darkMode);
	}
</script>

<div class="app" use:currentTheme={{ darkMode }} class:darkMode>
	<div>
		<label
			>Dark Mode
			<input type="checkbox" checked={darkMode} on:click={toggleDarkMode} />
		</label>
	</div>
	<div class="notification">{$notification}</div>
	<div use:buttonTheme>
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
				<ExampleCard name="with icon">
					<Button on:click={() => sendNotification('Button clicked')}>
						<SvelteIcon />
						<span> Sterling </span>
					</Button>
				</ExampleCard>
			</div>
		</div>
		<div class="section">
			<h1>Outline Button</h1>
			<div class="grid">
				<ExampleCard name="default">
					<OutlineButton on:click={() => sendNotification('Button clicked')}>Sterling</OutlineButton
					>
				</ExampleCard>
				<ExampleCard name="disabled">
					<svelte:fragment>
						<OutlineButton disabled on:click={() => sendNotification('Button clicked')}
							>Sterling</OutlineButton
						>
						<div class="checkered">
							<OutlineButton disabled on:click={() => sendNotification('Button clicked')}
								>Sterling</OutlineButton
							>
						</div>
					</svelte:fragment>
				</ExampleCard>
				<ExampleCard name="with icon">
					<OutlineButton on:click={() => sendNotification('Button clicked')}>
						<SvelteIcon />
						<span> Sterling </span>
					</OutlineButton>
				</ExampleCard>
			</div>
		</div>
		<div class="section">
			<h1>Ghost Button</h1>
			<div class="grid">
				<ExampleCard name="default">
					<GhostButton on:click={() => sendNotification('Button clicked')}>Sterling</GhostButton>
				</ExampleCard>
				<ExampleCard name="disabled">
					<svelte:fragment>
						<GhostButton disabled on:click={() => sendNotification('Button clicked')}
							>Sterling</GhostButton
						>
						<div class="checkered">
							<GhostButton disabled on:click={() => sendNotification('Button clicked')}
								>Sterling</GhostButton
							>
						</div>
					</svelte:fragment>
				</ExampleCard>
				<ExampleCard name="with icon">
					<GhostButton on:click={() => sendNotification('Button clicked')}>
						<SvelteIcon />
						<span> Sterling </span>
					</GhostButton>
				</ExampleCard>
			</div>
		</div>
		<div class="section">
			<h1>Primary Button</h1>
			<div class="grid">
				<ExampleCard name="default">
					<PrimaryButton on:click={() => sendNotification('Button clicked')}>Sterling</PrimaryButton
					>
				</ExampleCard>
				<ExampleCard name="disabled">
					<svelte:fragment>
						<PrimaryButton disabled on:click={() => sendNotification('Button clicked')}
							>Sterling</PrimaryButton
						>
						<div class="checkered">
							<PrimaryButton disabled on:click={() => sendNotification('Button clicked')}
								>Sterling</PrimaryButton
							>
						</div>
					</svelte:fragment>
				</ExampleCard>
				<ExampleCard name="with icon">
					<PrimaryButton on:click={() => sendNotification('Button clicked')}>
						<SvelteIcon />
						<span> Sterling </span>
					</PrimaryButton>
				</ExampleCard>
			</div>
		</div>
		<div class="section">
			<h1>Link Button</h1>
			<div class="grid">
				<ExampleCard name="default">
					<LinkButton on:click={() => sendNotification('Button clicked')}>Sterling</LinkButton>
				</ExampleCard>
				<ExampleCard name="disabled">
					<svelte:fragment>
						<LinkButton disabled on:click={() => sendNotification('Button clicked')}
							>Sterling</LinkButton
						>
						<div class="checkered">
							<LinkButton disabled on:click={() => sendNotification('Button clicked')}
								>Sterling</LinkButton
							>
						</div>
					</svelte:fragment>
				</ExampleCard>
				<ExampleCard name="with icon">
					<LinkButton on:click={() => sendNotification('Button clicked')}>
						<SvelteIcon />
						<span> Sterling </span>
					</LinkButton>
				</ExampleCard>
			</div>
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
		position: sticky;
		top: 0;
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
		background-color: #ebebeb;
		opacity: 1;
		background-image: repeating-linear-gradient(
				45deg,
				#ffffff 25%,
				transparent 25%,
				transparent 75%,
				#ffffff 75%,
				#ffffff
			),
			repeating-linear-gradient(45deg, #ffffff 25%, #ebebeb 25%, #ebebeb 75%, #ffffff 75%, #ffffff);
		background-position: 0 0, 11px 11px;
		background-size: 22px 22px;

		padding: 20px;
	}

	.darkMode .checkered {
		background-color: #444;
		opacity: 1;
		background-image: repeating-linear-gradient(
				45deg,
				#222 25%,
				transparent 25%,
				transparent 75%,
				#222 75%,
				#222
			),
			repeating-linear-gradient(45deg, #222 25%, #444 25%, #444 75%, #222 75%, #222);
		background-position: 0 0, 11px 11px;
		background-size: 22px 22px;

		padding: 20px;
	}
</style>
