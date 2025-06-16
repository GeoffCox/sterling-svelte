<div class="topic-page">
  <h1>Changelog</h1>

  <h2>2.0.11</h2>

  <h3>Checkbox</h3>
  <ul>
    <li>Fixed disabled mistakenly bindable. Changed not bindable.</li>
    <li>Added using-keyboard conditional class to Slider.</li>
    <li>Fix display issue in Pagination when item count is zero.</li>
    <li>Deprecated disable on Progress as it is not interactive.</li>
  </ul>

  <h2>2.0.10</h2>

  <h3>Slider</h3>
  <ul>
    <li>Fixed bugs with keyboard arrow keys not properly handling reverse.</li>
  </ul>

  <h2>2.0.9</h2>

  <h3>Slider</h3>
  <ul>
    <li>
      Added reverse property. When true the directon of the slider from min to max is reversed.
    </li>
  </ul>

  <h2>2.0.8</h2>

  <h3>Radio</h3>
  <ul>
    <li>Fixed bug with checked being initially set on hidden input.</li>
  </ul>

  <h2>2.0.7</h2>

  <h3>Slider</h3>
  <ul>
    <li>Removed unnecessary min/max clamping</li>
    <li>Fixed to immediately ensure valid value on component instantiation</li>
  </ul>

  <h3>Tooltip</h3>
  <ul>
    <li>Added missing onOpen event</li>
  </ul>

  <h2>2.0.6</h2>

  <h3>Autocomplete *NEW*</h3>
  <ul>
    <li>Added Autocomplete component</li>
  </ul>

  <h3>Label</h3>
  <ul>
    <li>Added optional form validation to set message and class.</li>
    <li>Added optional form validation to show required indicator.</li>
  </ul>

  <h3>Component Props</h3>

  <ul>
    <li>Exported all component props types to allow for better composition outside the library.</li>
  </ul>

  <h2>2.0.5</h2>

  <h3>TextArea</h3>
  <ul>
    <li>Removed empty string default for value to support undefined.</li>
  </ul>

  <h3>Tooltip</h3>
  <ul>
    <li>Fixed issue with mouse leave debounce.</li>
  </ul>

  <h3>Label</h3>
  <ul>
    <li>Moved tooltip upwards from required indicator to avoid mouse hover conflicts.</li>
    <li>Added sterling-label-tooltip class to requiredReason tooltip to support styling.</li>
  </ul>

  <h2>2.0.4</h2>

  <h3>ColorScheme Action (NEW)</h3>
  <ul>
    <li>Added colorScheme action to support sterling-svelte-themes 2.0.</li>
    <li>Deprecated applyLightDarkMode action.</li>
  </ul>

  <h2>2.0.3</h2>
  <p>
    <b>No breaking changes</b> where props and classes were added, existing ones were not removed.
  </p>

  <h3>Dropdown</h3>
  <ul>
    <li>
      Fixed snippets to account for the value being clickable.
      <ul>
        <li>button -&gt; icon</li>
        <li>buttonIcon -&gt; icon</li>
      </ul>
    </li>
    <li>Added class="icon" to the icon.</li>
    <li>
      Improved classes for content.
      <ul>
        <li>sterling-dropdown-popup-content -&gt; sterling-dropdown-content</li>
      </ul>
    </li>
  </ul>

  <h3>MenuItem</h3>
  <ul>
    <li>
      Added snippet support to text and shortcut props.
      <ul>
        <li>text: string | Snippet</li>
        <li>shortcut: string | Snippet</li>
      </ul>
    </li>
    <li>Ensured each child div is present in MenuItem's default item.</li>
    <li>
      Added class="default-item" to MenuItem's default item.
      <ul>
        <li>sterling-menu-item-display -&gt; default-item</li>
      </ul>
    </li>
  </ul>

  <h3>Pagination *NEW*</h3>
  <ul>
    <li>Added Pagination component</li>
  </ul>

  <h3>Select</h3>
  <ul>
    <li>
      Fixed snippets to account for the value being clickable.
      <ul>
        <li>buttonSnippet -&gt; icon</li>
        <li>valueSnippet -&gt; value</li>
      </ul>
    </li>
    <li>
      Added string support to the value prop.
      <ul>
        <li>value: string | Snippet</li>
      </ul>
    </li>
    <li>
      Improved classes for content.
      <ul>
        <li>sterling-select-popup-content -&gt; sterling-select-content</li>
      </ul>
    </li>
  </ul>

  <h3>Slider</h3>
  <ul>
    <li>Fixed thumb from starting a drag operation when dragged perpendicular to the slider.</li>
  </ul>

  <h3>Tooltip</h3>
  <ul>
    <li>Added sterling-tooltip-callout class to allow styling of the callout.</li>
  </ul>

  <h3>Documentation</h3>
  <ul>
    <li>Better described the HTML structure with classes in anatomy section for each component.</li>
  </ul>
  <h3>Other changes</h3>
  <ul>
    <li>Deprecated idGenerator in favor of $props.id()</li>
    <li>Deprecated the extraClass action in favor of built-in clsx class merging</li>
    <li>Removed some leftover console.log and $inspect calls from debugging</li>
  </ul>

  <h2>2.0.2 (Bad version)</h2>
  <p>The build script failed and a empty version was published.</p>

  <h2>2.0.1</h2>
  <p>2.x release from main branch</p>

  <h2>2.0.0</h2>
  <h3>Breaking changes due to converting to Svelte 5</h3>
  <ul>
    <li>Removed variant prop from all components. Instead, class prop is used.</li>
    <li>Event handlers (e.g. on:select) are now callbacks in props (e.g. onSelect).</li>
    <li>Slots are now snippets. The children snippet prop is used instead of default slot.</li>
    <li>
      Some HTML structure and class names were changed in components based on prop/snippet changes.
    </li>
    <li>
      Context property types are plain values (e.g. string, boolean) rather than stores. Context
      objects are implemented with getters and setters when supporting property change detection is
      needed.
    </li>
    <li>
      Props that were previously <code>boolean</code> are expanded to
      <code>boolean | null | undefined</code>
    </li>
  </ul>
  <h3>Other changes</h3>
  <ul>
    <li>The Sterling theme was moved to a separate package: @geoffcox/sterling-svelte-themes.</li>
    <li>
      The ColorPicker and associated components were removed. In the future, they will be included
      in a separate package to avoid the tinycolor dependency in this library.
    </li>
  </ul>
  <h3>Component specific changes</h3>
  <ul>
    <li>Label: status property removed.</li>
    <li>Label: vertical property removed.</li>
    <li>MenuItemDisplay: removed. Built in to MenuItem as default content.</li>
    <li>Progress: status property removed.</li>
    <li>Switch: offText and offLabel combined into offLabel snippet.</li>
    <li>Switch: onText and onLabel combined into onLabel snippet.</li>
    <li>TreeItem: icon snippet added.</li>
    <li>TreeItemDisplay: removed. Built in to TreeItem as default content.</li>
  </ul>
</div>

<!-- TODO 
 Progress - orientation -> vertical
 Select - needs buttonIcon snippet
 -->

<style>
  .topic-page {
    max-width: 900px;
  }
</style>
