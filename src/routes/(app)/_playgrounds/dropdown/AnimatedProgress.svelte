<script lang="ts">
  import Progress from '$lib/Progress.svelte';

  export let value = 50;
  export let animate = false;
  export let reverse = false;
  export let speed = 75;

  let cleanupAnimation = () => {};

  const stopAnimation = () => {
    cleanupAnimation();
    cleanupAnimation = () => {};
  };

  const startAnimation = (speed: number) => {
    stopAnimation();
    const duration = 5 * (101 - speed);
    const interval = setInterval(() => {
      if (reverse) {
        value--;
      } else {
        value++;
      }
      if (value < 0) {
        value = 100;
      } else if (value > 100) {
        value = 0;
      }
    }, duration);
    cleanupAnimation = () => clearInterval(interval);
  };

  $: {
    if (animate) {
      startAnimation(speed);
    } else {
      stopAnimation();
    }
  }
</script>

<Progress bind:value />
