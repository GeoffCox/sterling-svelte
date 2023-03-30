<script lang="ts">
  import { page } from '$app/stores';
  import { applyLightTheme, type ButtonShape, type ButtonVariant } from '$lib';
  import Button from '$lib/Button.svelte';

  const shape = ($page.url.searchParams.get('shape') as ButtonShape) || undefined;
  const variant = ($page.url.searchParams.get('variant') as ButtonVariant) || undefined;
</script>

<div class="container" data-testid="container">
  <div use:applyLightTheme>
    <Button data-testid="target" {shape} {variant}>sterling-svelte</Button>
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
