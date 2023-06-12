<script lang="ts">
  import { neutralColors } from '$lib';
</script>

<div class="colors">
  {#each Object.keys(neutralColors) as key}
    <div class="color">
      <div
        class="swatch"
        style="background-color: {neutralColors[key]}"
        title={`${neutralColors[key]}`}
      />
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
    border: 1px dashed var(--stsv-common__border-color);
    height: 1em;
    margin-bottom: 0.25em;
    width: 1em;
  }

  .name {
    margin-left: 0.5em;
  }
</style>
