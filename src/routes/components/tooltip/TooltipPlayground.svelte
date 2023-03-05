<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';
  import Tooltip from '$lib/Tooltip.svelte';
  import type { TooltipAutoShow, TooltipPlacement } from '$lib/Tooltip.types';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import Slider from '$lib/Slider.svelte';

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
    <Select bind:selectedValue={autoShowOption}>
      <ListItem value="click">click</ListItem>
      <ListItem value="hover">hover</ListItem>
    </Select>
    <Select bind:selectedValue={placement}>
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
    <Input bind:value={tipText}>tip (text)</Input>
    <div class="delay-slider">
      <Slider bind:value={hoverDelayMilliseconds} min={0} max={3000}
        ><span slot="label">hoverDelayMilliseconds {hoverDelayMilliseconds}ms</span></Slider
      >
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
