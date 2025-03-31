<div class="topic-page">
  <h1>Changelog</h1>

  <h2>2.0.1</h2>
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
  <h3>Slider</h3>
  <ul>
    <li>Fixed thumb from starting a drag operation when dragged perpendicular to the slider.</li>
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
  <h3>Tooltip</h3>
  <ul>
    <li>Added sterling-tooltip-callout class to allow styling of the callout.</li>
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
