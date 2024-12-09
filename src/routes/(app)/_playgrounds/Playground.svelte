<script lang="ts">
  import { onMount, type Snippet } from 'svelte';

  type Props = {
    code?: string;
    component: Snippet;
    props?: Snippet;
    tweaks?: Snippet;
  };

  let { code, component, props, tweaks }: Props = $props();

  let mounted = $state(false);

  onMount(() => {
    mounted = true;

    return () => {
      mounted = false;
    };
  });
</script>

<div class="example">
  {#if mounted}
    <div class="configuration">
      {#if props}
        <div class="section-name">Props</div>
        <div class="props">
          {@render props()}
        </div>
      {/if}
      {#if tweaks}
        <div class="section-name">Tweaks</div>
        <div class="tweaks">
          {@render tweaks()}
        </div>
      {/if}
    </div>
    <div class="component">
      {@render component()}
    </div>
  {/if}
  {#if code}
    <div class="code">
      <div class="section-name">Code</div>
      <pre>{code}</pre>
    </div>
  {/if}
</div>

<style>
  .example {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    align-items: flex-start;
    justify-items: flex-start;
    column-gap: 2em;
    border-bottom: 1px dashed var(--stsv-common__border-color);
    border-top: 1px dashed var(--stsv-common__border-color);
  }

  .section-name {
    font-weight: bold;
  }

  .component {
    padding: 1em;
    width: max-content;
  }

  .configuration {
    border-right: 1px dashed var(--stsv-common__border-color);
    padding: 1em;
  }

  .code {
    justify-self: stretch;
    grid-column-start: 1;
    grid-column-end: 4;
    padding: 1em;
    border-top: 1px dashed var(--stsv-common__border-color);
  }

  .props,
  .tweaks {
    margin: 0.5em 0.5em 1em 0.5em;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: 1em;
    place-items: flex-start;
    place-content: flex-start;
  }
</style>
