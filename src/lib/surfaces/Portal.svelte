<script lang="ts">
  import { portal } from '../portal';

  export let target: HTMLElement = document.body;
  export let condition: boolean = true;
</script>

<div class="portal" use:portal={{ target, condition }}>
  <slot {...$$restProps} />
</div>

<style>
  .portal {
    position: relative;
    overflow: visible;
  }
</style>
