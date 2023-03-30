<script lang="ts">
  import Playground from '../Playground.svelte';

  import MenuSeparator from '$lib/MenuSeparator.svelte';
</script>

<Playground>
  <svelte:fragment slot="component">
    <div class="area">
      <MenuSeparator />
    </div>
  </svelte:fragment>>
</Playground>

<style>
  .area {
    width: 150px;
    height: 20px;
    display: grid;
    align-items: center;
    justify-items: stretch;
  }
</style>
