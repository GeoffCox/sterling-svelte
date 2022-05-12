<script lang="ts">
	import Button from '$lib/buttons/Button.svelte';
	import LinkButton from '$lib/buttons/LinkButton.svelte';
	import ExampleCard from './_components/ExampleCard.svelte';
	import SvelteIcon from './_components/SvelteIcon.svelte';
	import { notification, sendNotification } from '../stores';
	import { currentTheme } from './_components/useCurrentTheme';
	import OutlineButton from '$lib/buttons/OutlineButton.svelte';
	import PrimaryButton from '$lib/buttons/PrimaryButton.svelte';
	import GhostButton from '$lib/buttons/GhostButton.svelte';
	import BaseLayer from '$lib/BaseLayer.svelte';
	import TextInput from '$lib/inputs/TextInput.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';
import Radio from '$lib/inputs/Radio.svelte';

	let darkMode = false;

	const toggleDarkMode = () => {
		darkMode = !darkMode;
	};

	const inputOnChange = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		sendNotification(`TextInput on:change ${target.value}`);
	};

	const inputOnInput = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		sendNotification(`TextInput on:input ${target.value}`);
	};

	let radioDefaultValue = 2;
</script>

<div class="app" use:currentTheme={{ darkMode }} class:darkMode>
	<BaseLayer>
		<div>
			<label
				>Dark Mode
				<input type="checkbox" checked={darkMode} on:click={toggleDarkMode} />
			</label>
		</div>
		<div class="notification">{$notification}</div>
		<div class="section">
			<h1>BaseLayer</h1>
			<div class="grid">
				<ExampleCard name="">
					<BaseLayer>
						<div class="baselayer-example">
							<div>level 0</div>
							<BaseLayer level={1}>
								<div class="baselayer-example-1">
									<div>level 1</div>
									<BaseLayer level={2}>
										<div class="baselayer-example-2">
											<div>level 2</div>
											<BaseLayer level={3}>
												<div class="baselayer-example-3">
													<div>level 3</div>
												</div>
											</BaseLayer>
										</div>
									</BaseLayer>
								</div>
							</BaseLayer>
						</div>
					</BaseLayer>
				</ExampleCard>
			</div>
		</div>
		<div class="section">
			<h1>Radio</h1>
			<div class="grid">
				<ExampleCard name="default">
					<Radio name="radioDefault" value={1}/>
					<Radio name="radioDefault" value={2} />
					<Radio name="radioDefault" value={3} />
					<Radio name="radioDefault" value={4} />
				</ExampleCard>
				<ExampleCard name="disabled">
					<Radio disabled name="radioDisabled" value={1}/>
					<Radio disabled name="radioDisabled" value={2} checked />
					<Radio disabled name="radioDisabled" value={3} />
					<Radio disabled name="radioDisabled" value={4} />
				</ExampleCard>
				<ExampleCard name="before">
					<Radio name="radioBefore" value={1}>
						<svelte:fragment slot="before">Sterling 1</svelte:fragment>
					</Radio>
					<Radio name="radioBefore" value={2}>
						<svelte:fragment slot="before">Sterling 2</svelte:fragment>
					</Radio>
					<Radio name="radioBefore" value={3}>
						<svelte:fragment slot="before">Sterling 3</svelte:fragment>
					</Radio>
					<Radio name="radioBefore" value={4}>
						<svelte:fragment slot="before">Sterling 4</svelte:fragment>
					</Radio>
				</ExampleCard>
				<ExampleCard name="after">
					<Radio name="radioAfter" value={1}>
						<svelte:fragment slot="after">Sterling 1</svelte:fragment>
					</Radio>
					<Radio name="radioAfter" value={2}>
						<svelte:fragment slot="after">Sterling 2</svelte:fragment>
					</Radio>
					<Radio name="radioAfter" value={3}>
						<svelte:fragment slot="after">Sterling 3</svelte:fragment>
					</Radio>
					<Radio name="radioAfter" value={4}>
						<svelte:fragment slot="after">Sterling 4</svelte:fragment>
					</Radio>
				</ExampleCard>
			</div>
		</div>
		<div class="section">
			<h1>Button</h1>
			<div class="grid">
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
			</div>
		</div>
		<div class="section">
			<h1>Ghost Button</h1>
			<div class="grid">
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
			</div>
		</div>
		<div class="section">
			<h1>Link Button</h1>
			<div class="grid">
				<ExampleCard name="default">
					<LinkButton on:click={() => sendNotification('Button clicked')}>Sterling</LinkButton>
				</ExampleCard>
				<ExampleCard name="disabled">
					<LinkButton disabled on:click={() => sendNotification('Button clicked')}
						>Sterling</LinkButton
					>
				</ExampleCard>
				<ExampleCard name="with icon">
					<LinkButton on:click={() => sendNotification('Button clicked')}>
						<SvelteIcon />
						<span> Sterling </span>
					</LinkButton>
				</ExampleCard>
			</div>
		</div>
		<div class="section">
			<h1>TextInput</h1>
			<div class="grid">
				<ExampleCard name="default">
					<TextInput value="Sterling" on:input={inputOnInput} on:change={inputOnChange} />
					<TextInput placeholder="Sterling" />
				</ExampleCard>
				<ExampleCard name="disabled">
					<TextInput disabled value="Sterling" />
					<TextInput disabled placeholder="Sterling" />
				</ExampleCard>
			</div>
		</div>
		<div class="section">
			<h1>Checkbox</h1>
			<div class="grid">
				<ExampleCard name="default">
					<Checkbox />
				</ExampleCard>
				<ExampleCard name="disabled">
					<Checkbox disabled />
					<Checkbox checked disabled />
				</ExampleCard>
				<ExampleCard name="before">
					<Checkbox>
						<svelte:fragment slot="before">Sterling</svelte:fragment>
					</Checkbox>
				</ExampleCard>
				<ExampleCard name="after">
					<Checkbox>
						<svelte:fragment slot="after">Sterling</svelte:fragment>
					</Checkbox>
				</ExampleCard>
			</div>
		</div>
	</BaseLayer>
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
		grid-template-rows: auto;
		gap: 1em;
		place-items: stretch;
		place-content: stretch;
	}

	h1 {
		font-size: 1.1rem;
	}
	.baselayer-example {
		box-sizing: border-box;
		border: 3px solid;
		padding: 20px;
		margin: 0;
	}

	.baselayer-example-1 {
		box-sizing: border-box;
		border: 3px solid;
		padding: 20px;
		margin: 0;
	}

	.baselayer-example-2 {
		box-sizing: border-box;
		border: 3px solid;
		padding: 20px;
		margin: 0;
	}

	.baselayer-example-3 {
		box-sizing: border-box;
		border: 3px solid;
		padding: 20px;
		margin: 0;
	}
</style>
