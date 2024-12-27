<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Switch from '$lib/Switch.svelte';
  import ChillIcon from './ChillIcon.svelte';
  import HeatIcon from './HeatIcon.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let checked: boolean | null | undefined = false;
  let disabled: boolean | null | undefined = false;
  let offText: string | undefined = 'Off';
  let onText: string | undefined = 'On';
  let customLabels: boolean | null | undefined = false;
  let variant = '';
  let vertical: boolean | null | undefined = false;

  const onSwitchChange = (e: Event) => {
    const switchEvent = e as any;
    console.log(`change: ${switchEvent.currentTarget?.checked}`);
  };

  $: code = getPlaygroundCode({
    checked,
    disabled,
    offLabelText: offText,
    onLabelText: onText,
    customLabels,
    _class: variant,
    vertical
  });
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
    <div slot="component">
      <Switch
        bind:checked
        class={variant}
        {disabled}
        offLabel={customLabels ? ColdLabel : offText}
        onLabel={customLabels ? HotLabel : onText}
        {vertical}
        onchange={onSwitchChange}
      />
    </div>
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
    <VariantInput bind:class={variant} availableVariants={['colorful']} />
    <Checkbox bind:checked={vertical}>vertical</Checkbox>
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={customLabels}>off&off label snippets</Checkbox>
  {/snippet}
</Playground>
