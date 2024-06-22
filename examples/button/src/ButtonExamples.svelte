<script lang="ts">
  import '@geoffcox/sterling-svelte/css/sterling.css';
  import { Button } from '@geoffcox/sterling-svelte';
  import SvelteIcon from './SvelteIcon.svelte';
  import Example from './Example.svelte';
</script>

<div class="button-examples">
  <h1>sterling-svelte / Button</h1>
  <Example name="Default">
    <Button>Button</Button>
    <Button><SvelteIcon /></Button>
    <Button><SvelteIcon /> Button</Button>
  </Example>
  <Example name="Disabled">
    <Button disabled>Button</Button>
    <Button disabled><SvelteIcon /></Button>
    <Button disabled><SvelteIcon /> Button</Button>
  </Example>
  <Example name="Secondary">
    <Button variant="secondary">Button</Button>
    <Button variant="secondary"><SvelteIcon /></Button>
    <Button variant="secondary"><SvelteIcon /> Button</Button>
  </Example>
  <Example name="Tool">
    <Button variant="tool">Button</Button>
    <Button variant="tool"><SvelteIcon /></Button>
    <Button variant="tool"><SvelteIcon /> Button</Button>
  </Example>
  <Example name="Circular">
    <Button variant="circular">Button</Button>
    <Button variant="circular"><SvelteIcon /></Button>
    <Button variant="circular"><SvelteIcon /> Button</Button>
  </Example>
  <Example name="Capsule">
    <Button variant="capsule">Button</Button>
    <Button variant="capsule"><SvelteIcon /></Button>
    <Button variant="capsule"><SvelteIcon /> Button</Button>
  </Example>
  <Example name="Square">
    <Button variant="square">Button</Button>
    <Button variant="square"><SvelteIcon /></Button>
    <Button variant="square"><SvelteIcon /> Button</Button>
  </Example>
  <Example name="Colorful">
    <Button variant="colorful">Button</Button>
    <Button variant="colorful"><SvelteIcon /></Button>
    <Button variant="colorful"><SvelteIcon /> Button</Button>
  </Example>
</div>
