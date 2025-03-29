<svelte:options runes={true} />

<script lang="ts">
  import Input from '$lib/Input.svelte';
  import Label from '$lib/Label.svelte';

  type Props = {
    labelText?: string;
    class?: string;
    sterlingClasses?: string[];
  };

  let {
    class: _class = $bindable(''),
    labelText = 'class',
    sterlingClasses = []
  }: Props = $props();

  const addVariant = (value: string) => {
    _class += ` ${value}`;
  };

  const clear = () => {
    _class = '';
  };
</script>

<Label text={labelText}>
  <Input id="class-input" bind:value={_class} />
</Label>
{#if sterlingClasses.length > 0}
  <div class="sterling-classes">Sterling theme: {sterlingClasses.join(' ')}</div>
{/if}

<style>
  .sterling-classes {
    font-size: 0.8em;
    max-width: 350px;
    color: var(--stsv-common__color--secondary);
  }
</style>
