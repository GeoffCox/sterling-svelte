<h1>Changelog</h1>

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
    The ColorPicker and associated components were removed. In the future, they will be included in
    a separate package to avoid the tinycolor dependency in this library.
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

<!-- TODO 
 Progress - orientation -> vertical
 Select - needs buttonIcon snippet
 -->
