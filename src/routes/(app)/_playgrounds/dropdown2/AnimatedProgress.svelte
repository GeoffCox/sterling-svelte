<svelte:options runes={true} />

<script lang="ts">
  import Progress from '$lib/Progress.svelte';

  type Props = {
    value?: number;
    animate?: boolean;
    reverse?: boolean;
    speed?: number;
  };

  let { value = $bindable(50), animate = false, reverse = false, speed = 75 }: Props = $props();

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

  $effect(() => {
    if (animate) {
      startAnimation(speed);
    } else {
      stopAnimation();
    }
  });
</script>

<Progress bind:value />
