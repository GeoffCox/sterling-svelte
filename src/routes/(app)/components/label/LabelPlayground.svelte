<script lang="ts">
  import Checkbox from '$lib/Checkbox.svelte';
  import Playground from '../Playground.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';
  import Field from '$lib/Field.svelte';

  let disabled = false;
  let labelText = 'This is a label';
</script>

<Playground>
  <div slot="component">
    <Label {disabled}>{labelText}</Label>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Field label="text (default slot)">
      <Input bind:value={labelText} composed />
    </Field>
  </svelte:fragment>
</Playground>
