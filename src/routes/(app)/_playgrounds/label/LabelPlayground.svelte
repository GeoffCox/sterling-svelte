<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import type { LabelStatus } from '$lib/Label.types';
  import { LABEL_STATUSES } from '$lib';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled: boolean | undefined | null = false;
  let forwardClick: boolean | undefined | null = false;
  let text = 'sterling-svelte';
  let message = '';
  let required: boolean | undefined | null = false;
  let requiredReason = '';
  let status: LabelStatus | 'none' = 'none';
  let useFor: boolean | undefined | null = true;
  let variant = 'vertical';

  $: code = getPlaygroundCode({
    forwardClick,
    message,
    required,
    requiredReason,
    status,
    text,
    useFor,
    variant
  });
</script>

<Playground {code}>
  <svelte:fragment slot="component">
    <Label
      for={useFor ? 'target' : undefined}
      {forwardClick}
      {message}
      {required}
      {requiredReason}
      {text}
      class={variant}
    >
      <Input id="target" {disabled} class={variant.includes('boxed') ? 'composed' : undefined} />
    </Label>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={forwardClick}>forwardClick</Checkbox>
    <Label text="text">
      <Input bind:value={text} />
    </Label>
    <Label text="message">
      <Input bind:value={message} />
    </Label>
    <Checkbox bind:checked={required}>required</Checkbox>
    <Label text="requiredReason">
      <Input bind:value={requiredReason} />
    </Label>
    <VariantInput
      bind:variant
      availableVariants={['boxed', 'colorful', 'vertical', 'info', 'warning', 'danger', 'success']}
    />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={disabled}>Input child disabled</Checkbox>
    <Checkbox bind:checked={useFor}>use <i>for</i> and <i>id</i> association</Checkbox>
  </svelte:fragment>
</Playground>
