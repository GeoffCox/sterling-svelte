<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/Button.svelte';

  const _class = ($page.url.searchParams.get('class') as string) || undefined;
</script>

<div class="container" data-testid="container">
  <div>
    <Button data-testid="target" class={_class}>sterling-svelte</Button>
  </div>
</div>

<style>
  .container {
    font-family: sans-serif;
    font-size: 1em;
    padding: 1em;
    width: fit-content;
    height: fit-content;
  }
</style>
