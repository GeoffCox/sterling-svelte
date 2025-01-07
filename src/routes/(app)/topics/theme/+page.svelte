<script>
  import { base } from '$app/paths';
  import { Button, Link } from '$lib';
  import DisabledSwatch from '../../_shared/DisabledSwatch.svelte';
  import Swatch from '../../_shared/Swatch.svelte';
</script>

<h1>Sterling Theme</h1>

The Sterling theme provides modern, elegant, and accessible styles with light and dark mode
variations.

<p>
  The <Link href="https://www.npmjs.com/package/@geoffcox/sterling-svelte-themes" target="_blank"
    >@geoffcox/sterling-svelte-themes</Link
  >
  package provides the Sterling theme.
</p>
<p>
  You can follow the steps in the
  <Link href={`${base}/topics/install`}>Installation</Link> documentation for adding the Sterling Theme.
  Also read the
  <Link href={`${base}/topics/architecture#ArchitectureThemeReady`}>Architecture - Theme Ready</Link
  > to understand how sterling-svelte components make styling easier.
</p>

<h2>CSS Variables</h2>
<ul>
  <li>CSS variables are prefixed with <code>--stsv-</code></li>
  <li>
    Naming follows the <Link href="https://getbem.com/introduction/" target="_blank"
      >Block**Element**Modifier (BEM)</Link
    >
    convention. For example, Button CSS uses these variables:
    <pre>--stsv-button__background-color
--stsv-button__border-color--hover
--stsv-common__outlinecolor</pre>
  </li>
  <li>
    The variables are grouped:
    <ul>
      <li>common - application wide</li>
      <li>button - for buttons and clickable components</li>
      <li>input - for inputs, radios, checkboxes and other form components</li>
    </ul>
  </li>
</ul>

<h2>Light and Dark Modes</h2>

<p>
  CSS variables are set to different values based on the <code>light-mode</code> class or
  <code>dark-mode</code> class being set on a div, the body element, or html element.
</p>

<h2>Variations</h2>

<p>
  Some component CSS have special classes to provide for visual variations. For example, Button has
  several:
</p>

<ul>
  <li><code>capsule</code>, <code>circular</code>, <code>square</code> - shapes</li>
  <li><code>secondary</code>, <code>tool</code> - usage/location</li>
  <li><code>blue</code>, <code>green</code>, <code>orange</code>, <code>red</code> - colors</li>
</ul>

<p>You can mix and match classes.</p>
<div>
  <Button class="capsule green">capsule green</Button>
  <Button class="secondary square">secondary square</Button>
  <Button class="circular tool red">circular tool red</Button>
</div>

<h2>Values</h2>

<h3>Common</h3>

<Swatch
  backgroundColor="--stsv-common__background-color"
  borderColor="--stsv-common__border-color"
  color="--stsv-common__color"
/>

<h3>Common - Outline</h3>
<Swatch borderColor="--stsv-common__outline-color" />

<h3>Common - Disabled</h3>
<DisabledSwatch />

<h3>Common - Reduced Emphasis</h3>

<Swatch
  backgroundColor="--stsv-common__background-color--secondary"
  color="--stsv-common__color--secondary"
/>
<br />
<Swatch
  backgroundColor="--stsv-common__background-color--subtle"
  color="--stsv-common__color--subtle"
/>
<Swatch
  backgroundColor="--stsv-common__background-color--faint"
  color="--stsv-common__color--faint"
/>
<br />

<h3>Common - Status</h3>

<Swatch
  backgroundColor="--stsv-common__background-color--info"
  borderColor="--stsv-common__border-color--info"
  color="--stsv-common__color--info"
/>
<br />
<Swatch
  backgroundColor="--stsv-common__background-color--success"
  borderColor="--stsv-common__border-color--success"
  color="--stsv-common__color--success"
/>
<br />
<Swatch
  backgroundColor="--stsv-common__background-color--warning"
  borderColor="--stsv-common__border-color--warning"
  color="--stsv-common__color--warning"
/>
<br />
<Swatch
  backgroundColor="--stsv-common__background-color--error"
  borderColor="--stsv-common__border-color--error"
  color="--stsv-common__color--error"
/>
<br />

<h3>Button</h3>

<Swatch
  backgroundColor="--stsv-button__background-color"
  borderColor="--stsv-button__border-color"
  color="--stsv-button__color"
/>
<br />
<Swatch
  backgroundColor="--stsv-button__background-color--hover"
  borderColor="--stsv-button__border-color--hover"
  color="--stsv-button__color--hover"
/>
<br />
<Swatch
  backgroundColor="--stsv-button__background-color--focus"
  borderColor="--stsv-button__border-color--focus"
  color="--stsv-button__color--focus"
/>
<br />
<Swatch
  backgroundColor="--stsv-button__background-color--active"
  borderColor="--stsv-button__border-color--active"
  color="--stsv-button__color--active"
/>
<br />
<h3>Input</h3>
<Swatch
  backgroundColor="--stsv-input__background-color"
  borderColor="--stsv-input__border-color"
  color="--stsv-input__color"
/>
<br />
<Swatch
  backgroundColor="--stsv-input__background-color--hover"
  borderColor="--stsv-input__border-color--hover"
  color="--stsv-input__color--hover"
/>
<br />
<Swatch
  backgroundColor="--stsv-input__background-color--focus"
  borderColor="--stsv-input__border-color--focus"
  color="--stsv-input__color--focus"
/>
<br />
<Swatch
  backgroundColor="--stsv-input__background-color--selected"
  borderColor="--stsv-input__border-color--selected"
  color="--stsv-input__color--selected"
/>
