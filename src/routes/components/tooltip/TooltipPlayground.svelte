<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import Tooltip from '$lib/Tooltip.svelte';
  import type { TooltipAutoShow, TooltipPlacement } from '$lib/Tooltip.types';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';
  import Field from '$lib/Field.svelte';

  let autoShow = true;
  let autoShowOption: TooltipAutoShow = 'hover';
  let hoverDelayMilliseconds = 1000;
  let placement: TooltipPlacement = 'top';
  let open = false;
  let tipText = 'Tooltip';
</script>

<Playground>
  <div slot="component">
    <Tooltip
      bind:open
      autoShow={autoShow ? autoShowOption : undefined}
      {hoverDelayMilliseconds}
      {placement}
    >
      <div>Sterling</div>
      <div class="tip" slot="tip">{tipText}</div>
    </Tooltip>
  </div>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={autoShow}>autoShow</Checkbox>
    <Checkbox bind:checked={open}>open</Checkbox>
    <Field label="autoShow">
      <Select bind:selectedValue={autoShowOption} composed>
        <ListItem value="click">click</ListItem>
        <ListItem value="hover">hover</ListItem>
      </Select>
    </Field>
    <Field label="placement">
      <Select bind:selectedValue={placement} composed>
        <ListItem value="top">top</ListItem>
        <ListItem value="right">right</ListItem>
        <ListItem value="bottom">bottom</ListItem>
        <ListItem value="left">left</ListItem>
        <ListItem value="top-start">top-start</ListItem>
        <ListItem value="right-start">right-start</ListItem>
        <ListItem value="bottom-start">bottom-start</ListItem>
        <ListItem value="left-start">left-start</ListItem>
        <ListItem value="top-end">top-end</ListItem>
        <ListItem value="right-end">right-end</ListItem>
        <ListItem value="bottom-end">bottom-end</ListItem>
        <ListItem value="left-end">left-end</ListItem>
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
