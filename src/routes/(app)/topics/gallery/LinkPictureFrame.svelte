<script lang="ts">
  import Link from '$lib/Link.svelte';
  import PictureFrame from './PictureFrame.svelte';
</script>

<PictureFrame name="Link">
  <div class="layout">
    <Link href="#">Link</Link>
    <Link href="#" variant="ghost">Ghost</Link>
    <Link href="#" variant="undecorated">Undecorated</Link>
  </div>
</PictureFrame>

<style>
  .layout {
    align-content: flex-start;
    align-items: center;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: repeat(auto);
    row-gap: 0.5em;
  }
</style>
