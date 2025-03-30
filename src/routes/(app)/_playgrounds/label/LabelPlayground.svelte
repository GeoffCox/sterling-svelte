<svelte:options runes={true} />

<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let disabled: boolean | undefined | null = $state(false);
  let forwardClick: boolean | undefined | null = $state(false);
  let message = $state('');
  let required: boolean | undefined | null = $state(false);
  let requiredReason = $state('');
  let requiredIndicator = $state('*');
  let text = $state('sterling-svelte');
  let useFor: boolean | undefined | null = $state(true);

  let code = $derived(
    getPlaygroundCode({
      forwardClick,
      message,
      required,
      requiredReason,
      text,
      useFor,
      variant: _class
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <Label
      for={useFor ? 'target' : undefined}
      {forwardClick}
      {message}
      {required}
      {requiredReason}
      {text}
      {requiredIndicator}
      class={_class}
    >
      <Input id="target" {disabled} class={_class.includes('boxed') ? 'composed' : undefined} />
    </Label>
  {/snippet}
  {#snippet props()}
    <VariantInput
      bind:class={_class}
      sterlingClasses={['boxed', 'vertical', 'info', 'success', 'warning', 'error']}
    />
    <Checkbox bind:checked={forwardClick}>forwardClick</Checkbox>
    <Checkbox bind:checked={required}>required</Checkbox>
    <Label text="text">
      <Input bind:value={text} />
    </Label>
  {/snippet}
  {#snippet snippets()}
    <Label text="message">
      <Input bind:value={message} />
    </Label>
    <Label text="requiredReason">
      <Input bind:value={requiredReason} />
    </Label>
    <Label text="requiredIndicator">
      <Input bind:value={requiredIndicator} />
    </Label>
  {/snippet}
  {#snippet tweaks()}
    <Checkbox bind:checked={disabled}>Input child disabled</Checkbox>
    <Checkbox bind:checked={useFor}>use <i>for</i> and <i>id</i> association</Checkbox>
  {/snippet}
</Playground>
