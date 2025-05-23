<script>
  import { base } from '$app/paths';
  import { Button, Link } from '$lib';
  import DisabledSwatch from '../../_shared/DisabledSwatch.svelte';
  import Swatch from '../../_shared/Swatch.svelte';
</script>

<div class="topic-page">
  <h1>Sterling Theme</h1>

  The Sterling theme provides modern, elegant, and accessible styles supporting light and dark mode
  automatically.

  <p>
    The <Link href="https://www.npmjs.com/package/@geoffcox/sterling-svelte-themes" target="_blank"
      >@geoffcox/sterling-svelte-themes</Link
    >
    package provides the Sterling theme.
  </p>
  <h2>Installation</h2>
  <p>
    See the the steps in the
    <Link href={`${base}/topics/install`}>Installation</Link> documentation for adding the Sterling Theme.
    Also read the
    <Link href={`${base}/topics/architecture#ArchitectureThemeReady`}>Theme Ready</Link> section in the
    Architecture topic to understand how sterling-svelte components make styling easier.
  </p>

  <h2>Light and Dark Modes</h2>

  <p>
    CSS variables now use the light-dark() function to select different colors depending on the
    color-scheme set at the document root.
  </p>
  <p>
    To manually switch between light or dark modes, the colorScheme action is provided to make it
    easy.
  </p>

  <h2>Variations</h2>

  <p>
    Some component CSS have special classes to provide for visual variations. For example, Button
    has:
  </p>

  <ul>
    <li><b>Shapes:&nbsp;</b><code>capsule</code>, <code>circular</code>, <code>square</code></li>
    <li><b>Emphasis:&nbsp;</b><code>secondary</code>, <code>tool</code></li>
    <li>
      <b>Colors:&nbsp;</b><code>blue</code>, <code>green</code>, <code>orange</code>,
      <code>red</code>
    </li>
  </ul>

  <p>You can mix and match classes.</p>
  <div>
    <Button class="capsule green">capsule green</Button>
    <Button class="secondary square">secondary square</Button>
    <Button class="circular tool red">circular tool red</Button>
  </div>

  <h2>CSS Variables</h2>

  <p>
    The Sterling theme uses CSS variables to provide consistent styling and easy customization. The
    CSS variables are available to use or override in your own components.
  </p>
  <ul>
    <li>CSS variables are prefixed with <code>--stsv-</code></li>
    <li>
      Names follow the <Link href="https://getbem.com/introduction/" target="_blank"
        >Block**Element**Modifier (BEM)</Link
      >
      convention. For example, Button CSS uses these variables:
      <pre>--stsv-button__background-color
--stsv-button__border-color--hover
--stsv-common__outline-color</pre>
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

  <h3>Button - Colors</h3>
  <Swatch
    backgroundColor="--stsv-button__background-color--blue"
    borderColor="--stsv-button__border-color--blue"
    color="--stsv-button__color--blue"
  />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--blue-hover"
    borderColor="--stsv-button__border-color--blue-hover"
    color="--stsv-button__color--blue-hover"
  />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--blue-focus"
    borderColor="--stsv-button__border-color--blue-focus"
    color="--stsv-button__color--blue-focus"
  />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--blue-active"
    borderColor="--stsv-button__border-color--blue-active"
    color="--stsv-button__color--blue-active"
  />
  <br />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--green"
    borderColor="--stsv-button__border-color--green"
    color="--stsv-button__color--green"
  />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--green-hover"
    borderColor="--stsv-button__border-color--green-hover"
    color="--stsv-button__color--green-hover"
  />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--green-focus"
    borderColor="--stsv-button__border-color--green-focus"
    color="--stsv-button__color--green-focus"
  />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--green-active"
    borderColor="--stsv-button__border-color--green-active"
    color="--stsv-button__color--green-active"
  />
  <br />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--orange"
    borderColor="--stsv-button__border-color--orange"
    color="--stsv-button__color--orange"
  />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--orange-hover"
    borderColor="--stsv-button__border-color--orange-hover"
    color="--stsv-button__color--orange-hover"
  />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--orange-focus"
    borderColor="--stsv-button__border-color--orange-focus"
    color="--stsv-button__color--orange-focus"
  />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--orange-active"
    borderColor="--stsv-button__border-color--orange-active"
    color="--stsv-button__color--orange-active"
  />
  <br />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--red"
    borderColor="--stsv-button__border-color--red"
    color="--stsv-button__color--red"
  />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--red-hover"
    borderColor="--stsv-button__border-color--red-hover"
    color="--stsv-button__color--red-hover"
  />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--red-focus"
    borderColor="--stsv-button__border-color--red-focus"
    color="--stsv-button__color--red-focus"
  />
  <br />
  <Swatch
    backgroundColor="--stsv-button__background-color--red-active"
    borderColor="--stsv-button__border-color--red-active"
    color="--stsv-button__color--red-active"
  />
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
</div>

<style>
  .topic-page {
    max-width: 900px;
  }
</style>
