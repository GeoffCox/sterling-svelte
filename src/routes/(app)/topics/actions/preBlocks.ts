// Svelte has a bug where it will think some Svelte code within string literals is code

import { trapKeyboardFocus } from '$lib';

// when placed within a .svelte file.  They are placed here as a workaround.
export const preBlocks = {
  clickOutside: `<script lang="ts">
      import { clickOutside, type ClickOutsideEvent } from '@geoffcox/sterling-svelte';

      const onClickOutside = (event: ClickOutsideEvent) => {
        // do something here
      };
    </script>

<div use:clickOutside on:click_outside={onClickOutside}>
  <!-- content here -->
</div>
`,
  extraClass: `<script lang="ts">
  import { extraClass } from '@geoffcox/sterling-svelte';

  let {children, class: _class}
</script>

<button class="sterling-button" use:extraClass={extraClass: _class}>
  {#if children}
    {children}
  {/endif}
</button>
`,
  forwardEvents: `<script lang="ts">
  import { forwardEvents } from '@geoffcox/sterling-svelte';

  let targetRef: HTMLDivElement;

  const onClick = () => {
    // do something here
  };
</script>

<div bind:this={targetRef} on:click={onClick}>sterling-svelte</div>
<button use:forwardEvents={ target: targetRef, events: ['click']}>Click Me<button>
`,
  portal: `<script lang="ts">
  import { portal } from '@geoffcox/sterling-svelte';
</script>

<div use:portal={{ target: document.body }}>
  <!-- content here -->
</div>
`,
  trapKeyboardFocus: `<script lang="ts">
  import { trapKeyboardFocus } from '@geoffcox/sterling-svelte';
</script>

<div use:trapKeyboardFocus>
  <!-- content with focusable children here -->
</div>
`
};
