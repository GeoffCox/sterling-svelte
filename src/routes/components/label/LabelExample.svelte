<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Example from '../Example.svelte';
  import Label from '$lib/display/Label.svelte';
  import Input from '$lib/inputs/Input.svelte';

  let disabled = false;
  let labelText = 'This is a label';
</script>

<Example>
  <div slot="component">
    <Label {disabled}>{labelText}</Label>
  </div>
  <div slot="options">
    <Checkbox bind:checked={disabled}>
      <svelte:fragment slot="label">disabled</svelte:fragment>
    </Checkbox>
    <Input bind:value={labelText}><span slot="label">LABEL TEXT</span></Input>
  </div>
</Example>
