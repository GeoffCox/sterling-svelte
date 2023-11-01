<script lang="ts">
  import SvelteIcon from './icons/SvelteIcon.svelte';
</script>

<div class="swatch"><SvelteIcon /></div>

<style>
  .swatch {
    width: 100px;
    height: 100px;
    position: relative;
    display: grid;
    place-content: center;
    place-items: center;
    font-size: 42px;
  }

  .swatch::after {
    background: repeating-linear-gradient(
      var(--stsv-common--disabled__stripe-angle),
      var(--stsv-common--disabled__stripe-color),
      var(--stsv-common--disabled__stripe-color) var(--stsv-common--disabled__stripe-width),
      var(--stsv-common--disabled__stripe-color--alt) var(--stsv-common--disabled__stripe-width),
      var(--stsv-common--disabled__stripe-color--alt)
        calc(2 * var(--stsv-common--disabled__stripe-width))
    );
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    pointer-events: none;
    transition: opacity 250ms;
  }
</style>
