<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';

  let disabled = false;
  let labelText = 'This is a label';
</script>

<Playground>
  <div slot="component">
    <Label {disabled}>{labelText}</Label>
  </div>
  <div slot="options">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Input bind:value={labelText}><span slot="label">LABEL TEXT</span></Input>
  </div>
</Playground>
