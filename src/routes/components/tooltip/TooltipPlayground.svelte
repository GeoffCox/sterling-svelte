<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import Tooltip from '$lib/Tooltip.svelte';
  import type { TooltipShowOn } from '$lib/Tooltip.types';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';
  import Field from '$lib/Field.svelte';
  import { FLOATING_PLACEMENTS, TOOLTIP_SHOW_ONS, type FloatingPlacement } from '$lib';

  let disabled = false;
  let showOn: TooltipShowOn = 'hover';
  let hoverDelayMilliseconds = 1000;
  let placement: FloatingPlacement = 'top';
  let open = false;
  let tipText = 'Tooltip';
</script>

<Playground>
  <div slot="component">
    <Tooltip bind:open {disabled} {showOn} {hoverDelayMilliseconds} {placement}>
      <div>Sterling</div>
      <div class="tip" slot="tip">{tipText}</div>
    </Tooltip>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={open}>open</Checkbox>
    <Field label="autoShow">
      <Select bind:selectedValue={showOn} composed>
        {#each TOOLTIP_SHOW_ONS as tooltipShowOn}
          <ListItem value={tooltipShowOn}>{tooltipShowOn}</ListItem>
        {/each}
      </Select>
    </Field>
    <Field label="placement">
      <Select bind:selectedValue={placement} composed>
        {#each FLOATING_PLACEMENTS as floatingPlacement}
          <ListItem value={floatingPlacement}>{floatingPlacement}</ListItem>
        {/each}
      </Select>
    </Field>
    <Field label="tip (text)">
      <Input bind:value={tipText} composed />
    </Field>
    <div class="delay-slider">
      <Field label={`hoverDelayMilliseconds: ${hoverDelayMilliseconds}ms`}>
        <Slider bind:value={hoverDelayMilliseconds} min={0} max={3000} />
      </Field>
    </div>
  </svelte:fragment>
</Playground>

<style>
  .delay-slider {
    width: 300px;
  }

  .tip {
    font-size: 0.8em;
    padding: 0.75em 1.5em;
  }
</style>
