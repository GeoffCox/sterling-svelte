<script lang="ts">
  import { portal } from './actions/portal';

  export let target: HTMLElement = document.body;
</script>

<div class="portal" use:portal={{ target }}>
  <slot {...$$restProps} />
</div>

<style>
  .portal {
    position: relative;
    overflow: visible;
  }
</style>
