<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Example from '../Example.svelte';
  import Label from '$lib/display/Label.svelte';

  let disabled = false;
</script>

<Example>
  <div slot="component">
    <Label {disabled}>This is a label</Label>
  </div>
  <div slot="options">
    <Checkbox bind:checked={disabled}>
      <svelte:fragment slot="label">disabled</svelte:fragment>
    </Checkbox>
  </div>
</Example>
