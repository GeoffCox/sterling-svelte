<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Switch from '$lib/Switch.svelte';
  import ChillIcon from './ChillIcon.svelte';
  import HeatIcon from './HeatIcon.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let checked: boolean | null | undefined = $state(false);
  let disabled: boolean | null | undefined = $state(false);
  let offText: string | undefined = $state('Off');
  let onText: string | undefined = $state('On');
  let customLabels: boolean | null | undefined = $state(false);
  let variant = $state('');
  let vertical: boolean | null | undefined = $state(false);

  const onSwitchChange = (e: Event) => {
    const switchEvent = e as any;
    console.log(`change: ${switchEvent.currentTarget?.checked}`);
  };

  let code = $derived(
    getPlaygroundCode({
      checked,
      _class: variant,
      disabled,
      offLabelText: offText,
      onLabelText: onText,
      customLabels,
      vertical
    })
  );
</script>

{#snippet ColdLabel({
  checked,
  disabled,
  inputId
}: {
  checked: boolean | null | undefined;
  disabled: boolean | null | undefined;
  inputId: string;
})}
  <label for={inputId}>
    <ChillIcon checked={!checked} disabled={!!disabled} width="1.5em" height="1.5em" />
  </label>
{/snippet}

{#snippet HotLabel({
  checked,
  disabled,
  inputId
}: {
  checked: boolean | null | undefined;
  disabled: boolean | null | undefined;
  inputId: string;
})}
  <label for={inputId}>
    <HeatIcon checked={!!checked} disabled={!!disabled} width="1.5em" height="1.5em" />
  </label>
{/snippet}

<Playground {code}>
  {#snippet component()}
    <Switch
      bind:checked
      class={variant}
      {disabled}
      offLabel={customLabels ? ColdLabel : offText}
      onLabel={customLabels ? HotLabel : onText}
      {vertical}
      onchange={onSwitchChange}
    />
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked>checked</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label text="offLabelText">
      <Input bind:value={offText} />
    </Label>
    <Label text="onLabelText">
      <Input bind:value={onText} />
    </Label>
    <VariantInput bind:class={variant} />
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={customLabels}>off&off label snippets</Checkbox>
  {/snippet}
</Playground>
