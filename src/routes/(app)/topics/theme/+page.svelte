<script>
  import DisabledSwatch from '../../_shared/DisabledSwatch.svelte';
  import Swatch from '../../_shared/Swatch.svelte';
</script>

<h1>Sterling Theme</h1>

<p>
  While sterling-svelte components do not apply any default style, a set of CSS styles defined is
  provided for you to use if you like.
</p>

<p>You can choose to import all the component styles:</p>

<pre>{`
import '@geoffcox/sterling-svelte-themes/sterling.css'
`}</pre>

<p>or pick the individual component styles:</p>

<pre>{`
import '@geoffcox/sterling-svelte-themes/sterling/light-mode.css'
import '@geoffcox/sterling-svelte-themes/sterling/dark-mode.css'
import '@geoffcox/sterling-svelte-themes/sterling/Button.css'
import '@geoffcox/sterling-svelte-themes/sterling/Checkbox.css'
`}</pre>

<h2>Component classes</h2>

<p>
  Components render HTML structure and class names to support styling and themes. They can be
  considered an API contract for the CSS styles. Any changes are considered breaking changes.
</p>

<ul>
  <li>
    Each component's root element has a <code>sterling-<component></component></code> class name.
    For example, <code>Button</code> has <code>sterling-button</code>.
  </li>
  <li>
    Components use the natural state pseudo-selectors whenever they exist for the HTML element being
    rendered. For example, <code>Button</code> styles use <code>:hover</code>, <code>:active</code>,
    and <code>:disabled</code> selectors.
  </li>
  <li>
    When components have state that isn't represented by built-in pseudo-selectors, they apply class
    names (e.g. <code>.checked</code>, <code>.open</code>, <code>.disabled</code>,
    <code>.vertical</code>).
  </li>
  <li>
    Components also apply class names to help identify child elements (e.g. <code>.item</code>,
    <code>.container</code>, <code>.fill</code>, <code>.thumb</code>).
  </li>
</ul>

<h2>CSS variables</h2>

<ul>
  <li>The sterling theme uses css variables starting with <code>--stsv-</code> to switch modes.</li>
  <li>
    Each CSS variable follows the <a href="https://getbem.com/introduction/"
      >Block**Element**Modifier (BEM)</a
    >
    naming convention. For example, <code>--stsv-button__background-color</code>,
    <code>--stsv-button__border-color</code>, and <code>--stsv-button__color</code>.
  </li>
  <li>
    There are fewer than 100 CSS variables defined to handle common, button, input, and status
    colors.
  </li>
</ul>

<h2>Light and dark modes</h2>

<p>The sterling theme supports light and dark mode by changing CSS variable values.</p>

<ul>
  <li>
    The <code>applyLightDarkMode</code> action applies <code>.light-mode</code> or
    <code>.dark-mode</code> class name and the theme will apply styles based on selecting these. This
    action can automatically switch modes based on the browser and user preferences.
  </li>
  <li>
    When light/dark mode changes, the variables are updated to show the theme without re-rendering
    the button.
  </li>
</ul>

<h2>Variants</h2>

<p>
  Each component has a <code>variant</code> string property. The variant value appended to the component's
  root element class property. This allows callers to vary the style.
</p>

<p>
  You can apply multiple variants. For example <code>Button</code> can have <code>circular</code>
  and <code>tool</code> applied. The variants are listed in each component's documentation.
</p>

<h2>Custom Theming</h2>

<p>
  You can define CSS in your application using any CSS framework you like (e.g. LESS, SASS,
  Tailwind, Bootstrap). Then you can include it after the sterling theme, or replace the sterling
  theme.
</p>

<p>
  To figure out what selectors to put in your CSS, you can look at the component source, inspect the
  component's HTML, or use the sterling theme CSS as an example.
</p>

<p>
  For example, the base Button styles <a
    href="https://github.com/GeoffCox/sterling-svelte/blob/main/src/lib/css/Button.base.css">here</a
  > demonstrate setting the default and state styles.
</p>

<ul>
  <li><code>.sterling-button</code></li>
  <li><code>.sterling-button:hover</code></li>
  <li><code>.sterling-button:active</code></li>
  <li><code>.sterling-button:focus-visible</code></li>
  <li><code>.sterling-button:disabled</code></li>
</ul>

<p>
  The <code>.sterling-button:disabled::after</code> style shows the disabled diagonal stripe (i.e. no
  step) pattern over the button.
</p>

<h2>Theme Values</h2>

<h3>Common</h3>

<p>The common variables are used for body text and containers (e.g. lists, trees).</p>

<Swatch
  backgroundColor="--stsv-common__background-color"
  borderColor="--stsv-common__border-color"
  color="--stsv-common__color"
/>
<br />

<h3>Common - Outline</h3>

<p>Outline colors are used across components to indicate keyboard focus.</p>

<Swatch borderColor="--stsv-common__outline-color" />
<br />

<h3>Common - Disabled</h3>

<p>Components indicate disabled state as an overlay with a diagonal striped pattern.</p>

<br />
<DisabledSwatch />
<br />

<p>The pattern is taken from the diagonal "NO STEP" pattern on aircraft.</p>
<p>The stripes are white and black with low opacity and work well across light and dark themes.</p>

<blockquote>
  Traditionally, disabled state is indicated using dimmed colors of the component often centering
  around a midline gray. This tends to damage contrast when the background, border, and foreground
  colors are near the disabled colors.
</blockquote>

<br />

<h3>Common - Secondary, Subtle, and Faint</h3>

<p>
  Secondary, subtle, and faint colors are used for less important text, placeholders, visually
  separate regions, and decorations.
</p>

<br />
<Swatch
  backgroundColor="--stsv-common__background-color--secondary"
  color="--stsv-common__color--secondary"
/>
<br />
<Swatch
  backgroundColor="--stsv-common__background-color--subtle"
  color="--stsv-common__color--subtle"
/>
<br />
<Swatch
  backgroundColor="--stsv-common__background-color--faint"
  color="--stsv-common__color--faint"
/>
<br />

<h3>Button</h3>

<p>These are used for clickable buttons that take action.</p>

<Swatch
  backgroundColor="--stsv-button__background-color"
  borderColor="--stsv-button__border-color"
  color="--stsv-button__color"
/>
<br />

<h3>Button - Hover</h3>

<Swatch
  backgroundColor="--stsv-button__background-color--hover"
  borderColor="--stsv-button__border-color--hover"
  color="--stsv-button__color--hover"
/>
<br />

<h3>Button - Focus</h3>

<Swatch
  backgroundColor="--stsv-button__background-color--focus"
  borderColor="--stsv-button__border-color--focus"
  color="--stsv-button__color--focus"
/>
<br />

<h3>Button - Active</h3>

<Swatch
  backgroundColor="--stsv-button__background-color--active"
  borderColor="--stsv-button__border-color--active"
  color="--stsv-button__color--active"
/>
<br />

<h3>Input</h3>

<p>These are used with interactive form controls (e.g. checkbox, text input, radio).</p>

<Swatch
  backgroundColor="--stsv-input__background-color"
  borderColor="--stsv-input__border-color"
  color="--stsv-input__color"
/>
<br />

<h3>Input - Hover</h3>

<Swatch
  backgroundColor="--stsv-input__background-color--hover"
  borderColor="--stsv-input__border-color--hover"
  color="--stsv-input__color--hover"
/>
<br />

<h3>Input - Focus</h3>

<Swatch
  backgroundColor="--stsv-input__background-color--focus"
  borderColor="--stsv-input__border-color--focus"
  color="--stsv-input__color--focus"
/>

<h3>Input - Selected</h3>

<Swatch
  backgroundColor="--stsv-input__background-color--selected"
  borderColor="--stsv-input__border-color--selected"
  color="--stsv-input__color--selected"
/>

<h3>Status Colors</h3>

<p>Several colors are used to create an association with a status.</p>

<Swatch
  backgroundColor="--stsv-status--info__background-color"
  borderColor="--stsv-status--info__border-color"
  color="--stsv-status--info__color"
/>
<br />
<Swatch
  backgroundColor="--stsv-status--success__background-color"
  borderColor="--stsv-status--success__border-color"
  color="--stsv-status--success__color"
/>
<br />
<Swatch
  backgroundColor="--stsv-status--warning__background-color"
  borderColor="--stsv-status--warning__border-color"
  color="--stsv-status--warning__color"
/>
<br />
<Swatch
  backgroundColor="--stsv-status--danger__background-color"
  borderColor="--stsv-status--danger__border-color"
  color="--stsv-status--danger__color"
/>
<br />

<h2>Sterling Theme Colorful CSS Vars</h2>

<p>Many components support a <code>colorful</code> variant to apply accent colors.</p>

<h3>Common</h3>

<Swatch
  backgroundColor="--stsv-common--colorful__background-color"
  borderColor="--stsv-common--colorful__border-color"
  color="--stsv-common--colorful__color"
/>
<br />

<h3>Common - Secondary, Subtle, and Faint</h3>

<Swatch
  backgroundColor="--stsv-common--colorful__background-color--secondary"
  color="--stsv-common--colorful__color--secondary"
/>
<br />
<Swatch
  backgroundColor="--stsv-common--colorful__background-color--subtle"
  color="--stsv-common--colorful__color--subtle"
/>
<br />
<Swatch
  backgroundColor="--stsv-common--colorful__background-color--faint"
  color="--stsv-common--colorful__color--faint"
/>

<h3>Button</h3>

<Swatch
  backgroundColor="--stsv-button--colorful__background-color"
  borderColor="--stsv-button--colorful__border-color"
  color="--stsv-button--colorful__color"
/>
<br />

<h3>Button - Hover</h3>

<Swatch
  backgroundColor="--stsv-button--colorful__background-color--hover"
  borderColor="--stsv-button--colorful__border-color--hover"
  color="--stsv-button--colorful__color--hover"
/>
<br />

<h3>Button - Focus</h3>

<Swatch
  backgroundColor="--stsv-button--colorful__background-color--focus"
  borderColor="--stsv-button--colorful__border-color--focus"
  color="--stsv-button--colorful__color--focus"
/>
<br />

<h3>Button - Active</h3>

<Swatch
  backgroundColor="--stsv-button--colorful__background-color--active"
  borderColor="--stsv-button--colorful__border-color--active"
  color="--stsv-button--colorful__color--active"
/>

<h3>Input</h3>

<Swatch
  backgroundColor="--stsv-input--colorful__background-color"
  borderColor="--stsv-input--colorful__border-color"
  color="--stsv-input--colorful__color"
/>
<br />

<h3>Input - Hover</h3>

<Swatch
  backgroundColor="--stsv-input--colorful__background-color--hover"
  borderColor="--stsv-input--colorful__border-color--hover"
  color="--stsv-input--colorful__color--hover"
/>
<br />

<h3>Input - Focus</h3>

<Swatch
  backgroundColor="--stsv-input--colorful__background-color--focus"
  borderColor="--stsv-input--colorful__border-color--focus"
  color="--stsv-input--colorful__color--focus"
/>

<h3>Input - Selected</h3>

<Swatch
  backgroundColor="--stsv-input--colorful__background-color--selected"
  borderColor="--stsv-input--colorful__border-color--selected"
  color="--stsv-input--colorful__color--selected"
/>
