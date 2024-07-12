<script lang="ts">
  export let name: string | undefined = undefined;
</script>

<!-- 
    @component Frame
    A picture frame.
 -->
<div class="frame">
  <div class="matting">
    <div class="backing">
      <div class="picture">
        <slot />
      </div>
    </div>
    {#if name}
      <div class="name">{name}</div>
    {/if}
  </div>
</div>

<style>
  .frame {
    display: block;
    border: 0.25em solid var(--stsv-common__color);
    background: var(--stsv-common__background-color--secondary);
    filter: drop-shadow(3px 4px 4px rgba(0, 0, 0, 0.5));
    overflow: hidden;
    box-sizing: border-box;
  }

  .matting {
    background: var(--stsv-common__background-color);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    padding: 0.75em;
    padding-bottom: 0.5em;
    box-shadow: inset 1px 1px 2px var(--stsv-common__color--secondary);
    overflow: hidden;
    place-items: center;
    place-content: center;
    box-sizing: border-box;
  }

  .backing {
    background: var(--stsv-common__background-color);
    box-shadow: var(--stsv-common__box-shadow--inset);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    overflow: hidden;
    padding: 0.5em;
    place-items: center;
    place-content: center;
  }

  .picture {
    overflow: hidden;
    padding: 0.25em;
  }

  .name {
    font-size: 0.7em;
    color: var(--stsv-common__color);
    margin-top: 0.5em;
    font-family: 'Source Code Pro', monospace;
    align-self: flex-end;
  }
</style>
