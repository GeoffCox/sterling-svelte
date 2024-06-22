<script lang="ts">
  export let name;
</script>

<div class="example">
  <div class="name">{name}</div>
  <div class="content">
    <slot />
  </div>
</div>

<style>
  .example {
    border-bottom: 1px solid var(--stsv-common__background-color--secondary);
    padding: 1em;
  }

  .name {
    font-size: 0.8em;
    font-variant: small-caps;
    margin-bottom: 0.5em;
  }

  .content {
    display: flex;
    column-gap: 1em;
    align-items: center;
  }
</style>
