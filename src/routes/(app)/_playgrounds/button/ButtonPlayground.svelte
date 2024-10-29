<script lang="ts">
  import SvelteIcon from '../../_shared/icons/SvelteIcon.svelte';
  import Playground from '../Playground.svelte';

  import Button from '$lib/Button.svelte';
  import Checkbox from '$lib/Checkbox.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let disabled = false;
  let _class: string = '';
  let text = 'sterling-svelte';
  let withIcon = true;

  $: code = getPlaygroundCode({ disabled, text, _class, withIcon });
</script>

<Playground {code}>
  <div class="component" slot="component">
    <Button {disabled} class={_class} onclick={() => console.log('Button on:click')}>
      {#if withIcon}
        <SvelteIcon />
      {/if}
      {text}
    </Button>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <VariantInput
      bind:class={_class}
      availableVariants={['capsule', 'circular ', 'colorful', 'secondary', 'square', 'tool']}
    />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Label text="(button content)">
      <Input bind:value={text} />
    </Label>
    <Checkbox bind:checked={withIcon}>with icon</Checkbox>
  </svelte:fragment>
</Playground>

<style>
  .component {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    padding: 0;
  }
</style>
