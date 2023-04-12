<script lang="ts">
  import Button from '$lib/Button.svelte';
  import { createProject } from '../../../../../archive/src/stackblitz/createProject';
  import { exampleSvelte } from './buttonExample';
</script>

<Button on:click={() => createProject(exampleSvelte)}>Stackblitz</Button>
