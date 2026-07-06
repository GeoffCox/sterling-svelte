<svelte:options runes={true} />

<script lang="ts">
  import { POPOVER2_PLACEMENTS, type Popover2Placement } from '$lib';
  import Checkbox from '$lib/Checkbox.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';
  import Tooltip2 from '$lib/Tooltip2.svelte';
  import VariantInput from '../../_shared/ClassInput.svelte';
  import Playground from '../Playground.svelte';
  import { getPlaygroundCode } from './getPlaygroundCode';

  let _class = $state('');
  let disabled = $state(false);
  let hoverDelayMilliseconds = $state(1000);
  let open = $state(true);
  let placement: Popover2Placement = $state('top-center');
  let text = $state('sterling-svelte');

  let code = $derived(
    getPlaygroundCode({
      _class,
      disabled,
      hoverDelayMilliseconds,
      placement,
      text
    })
  );
</script>

<Playground {code}>
  {#snippet component()}
    <div class="container">
      <Tooltip2
        class={_class}
        {disabled}
        {hoverDelayMilliseconds}
        onOpen={(value) => console.log(`<Tooltip> onOpen value:${value}`)}
        bind:open
        {placement}
      >
        <div class="reference">The reference anchor for positioning the Tooltip.</div>
        {#snippet tip()}
          <div class="tip-text">{text}</div>
        {/snippet}
      </Tooltip2>
    </div>
  {/snippet}
  {#snippet props()}
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Label class="slider-label" text={`hoverDelayMilliseconds`}>
      <div class="slider">
        <Slider bind:value={hoverDelayMilliseconds} min={0} max={3000} precision={0} />
        <div>{hoverDelayMilliseconds}</div>
      </div>
    </Label>
    <Checkbox bind:checked={open}>open</Checkbox>
    <Label text="placement">
      <Select bind:selectedValue={placement}>
        {#each POPOVER2_PLACEMENTS as placementItem}
          <ListItem value={placementItem}>{placementItem}</ListItem>
        {/each}
      </Select>
    </Label>

    <VariantInput labelText="class" bind:class={_class} />
  {/snippet}
  {#snippet snippets()}
    <Label text="children">
      <Input bind:value={text} />
    </Label>
  {/snippet}
</Playground>

<style>
  .container {
    padding: 2em;
  }

  .tip-text {
    padding: 0.75em 1.5em;
  }

  :global(.sterling-label.slider-label) {
    align-items: start;
  }

  .slider {
    display: grid;
    grid-template-rows: auto auto;
    justify-items: center;
    font-size: 0.8em;
  }

  .slider :global(.sterling-slider) {
    width: 200px;
  }

  .reference {
    padding: 1em;
    background-color: var(--stsv-common__background-color--secondary);
    width: 300px;
    height: 150px;
    display: grid;
    place-items: center;
    align-items: center;
    text-align: center;
  }
</style>
