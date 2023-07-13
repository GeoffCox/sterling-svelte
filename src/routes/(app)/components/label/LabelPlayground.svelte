<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';
  import ListItem from '$lib/ListItem.svelte';
  import Select from '$lib/Select.svelte';
  import type { LabelStatus } from '$lib/Label.types';
  import { LABEL_STATUSES } from '$lib';

  let disabled = false;
  let forwardClick = false;
  let text = 'Name';
  let message = '';
  let required = false;
  let status: LabelStatus | 'none' = 'none';
  let useFor = true;
</script>

<Playground noEvents>
  <svelte:fragment slot="component">
    <Label for={useFor ? 'target' : undefined} {forwardClick} {text} {message} {required} {status}>
      <Input id="target" {disabled} composed />
    </Label>
  </svelte:fragment>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={forwardClick}>forwardClick</Checkbox>
    <Label text="text">
      <Input bind:value={text} composed />
    </Label>
    <Label text="message">
      <Input bind:value={message} composed />
    </Label>
    <Checkbox bind:checked={required}>required</Checkbox>
    <Label text="status" for="status-select" forwardClick>
      <Select id="status-select" bind:selectedValue={status} composed>
        {#each LABEL_STATUSES as labelStatus}
          <ListItem value={labelStatus}>{labelStatus}</ListItem>
        {/each}
      </Select>
    </Label>
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Checkbox bind:checked={disabled}>Input child disabled</Checkbox>
    <Checkbox bind:checked={useFor}>use <i>for</i> and <i>id</i> association</Checkbox>
  </svelte:fragment>
</Playground>
