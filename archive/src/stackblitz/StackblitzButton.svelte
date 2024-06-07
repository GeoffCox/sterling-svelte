<script lang="ts">
  import Button from '$lib/Button.svelte';
  import { embedProject } from './createProject';
  import { example } from './buttonExample';
</script>

<div>
  <div id="SterlingButtonExample" />
  <Button on:click={() => embedProject('SterlingButtonExample', example)}>Stackblitz</Button>
</div>
