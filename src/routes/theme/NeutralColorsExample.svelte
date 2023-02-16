<script lang="ts">
  import { neutrals } from '$lib';
</script>

<div class="colors">
  {#each Object.keys(neutrals) as key}
    <div class="color">
      <div class="swatch" style="background-color: {neutrals[key]}" title={`${neutrals[key]}`} />
      <div class="name">{key}</div>
    </div>
  {/each}
</div>

<style>
  .colors {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    gap: 0.5em;
    align-items: center;
    width: max-content;
  }

  .color {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .swatch {
    border: 1px dashed var(--stsv-Common__border-color);
    height: 1em;
    margin-bottom: 0.25em;
    width: 1em;
  }

  .name {
    margin-left: 0.5em;
  }
</style>
