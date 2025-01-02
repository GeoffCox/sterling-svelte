<h1>Changelog</h1>

<h2>2.0.0</h2>
<h3>Breaking changes due to converting to Svelte 5</h3>
<ul>
  <li>Removed variant prop. Used built-in class prop from HTML attributes.</li>
  <li>Events (e.g. on:select) are now callbacks in props (e.g. onSelect).</li>
  <li>Slots are now snippets.</li>
  <li>
    Text properties previous used as defaults when slots were not filled, are now properties that
    can be a snippet or string.
  </li>
  <li>The children snippet prop is used instead of default slot.</li>
  <li>
    Rendered HTML structure and class names were changed in components due to snippet and props
    changes.
  </li>
  <li>
    Some status properties such as info, warning, and error were removed in favor of class styles.
  </li>
  <li>
    Context property types are plain values rather than stores. Context objects are implemented with
    getters and setters when binding to props or <code>$state</code> is needed.
  </li>
</ul>
<h3>Other changes due to converting to Svelte 5</h3>
<ul>
  <li>Runes ($state, $derived, $effect) are used within components.</li>
  <li>
    Props that were previously <code>boolean</code> are expanded to
    <code>boolean | null | undefined</code>
  </li>
  <li>
    Context types no longer use stores. Instead, they container plain types backed by getter/setter
    functions that manage $state.
  </li>
</ul>
<h3>Other changes</h3>
<ul>
  <li>The Sterling theme was moved to a separate package.</li>
</ul>
