<h1>Architecture</h1>

<h2>Prop forwarding</h2>
<p>
  Components will forward props to either the associated intrinsic HTML element or the root element
  rendered.
</p>
<p>
  For example, the Button component renders a <code>&lt;button/&gt;</code>. The Button component
  forwards HTMLButtonElement props to the button element.
</p>
<p>
  This means you can pass any HTMLButton prop to Button such as <code>type</code>. If you specified
  <code>type=submit</code>
  this would override the Button components default <code>type=button</code> prop.
</p>

<h2>Custom callbacks vs. HTML events</h2>
<p>
  Svelte provide on<i>event</i>. callbacks for HTML element events. These callbacks do not change
  the casing of the HTML event name. For example, the button <code>click</code> event is handled via
  the <code>onclick</code> callback.
</p>
<p>
  In sterling-svelte, any custom callbacks are camel cased on<i>Event</i>. For example, the callback
  for a tree item select events is
  <code>onSelect?: (selectedValue: string | undefined) => void;</code>
</p>

<h2>Floating UI</h2>
<p>
  Components with floating UI like <code>Dropdown</code>, <code>Menu</code>, and <code>Select</code>
  need to ensure that the dropdown UI is not hidden due to a container's overflow setting. Components
  use portaling to render a part of their UI as the last child of the page
  <code>body</code>.
</p>

<h2>Composition</h2>
<p>
  Components support named snippets to fill in or replace content and the <code>children</code> snippet
  for default content..
</p>
<p>
  Some props support either a string or a snippet. For example, Label's <code>text</code> props. If
  a string is passed, it is rendered as the label, otherwise the
  <code>&#123;@render text()&#125;</code> snippet is called.
</p>
<p>
  Components also provide default content when a snippet prop is <code>undefined</code>. For
  example, TreeItem will render the expand/collapse chevron when the <code>icon</code> snippet is specified.
</p>

<h2>Hierarchy communication</h2>
<p>
  In a components like List or Tree, it would be a burden to require callers to pass properties down
  the hierarchy of components. For example, passing Tree's <code>expandedValues</code> property to every
  TreeItem would be tedious. Svelte's context is used to pass contextual data down the hierarchy.
</p>
<p>
  Some component use context. To support context values bound to props or <code>$state</code>, the
  context objects are implemented using getters and setters.
</p>
<p>
  For example, <code>Tree</code> sets a <code>TreeContext</code> context that tells
  <code>TreeItem</code>
  if the tree is disabled, the expanded node values, and the selected value. <code>TreeItem</code>
  sets a <code>TreeItemContext</code> that tells <code>TreeItem</code> children, if the item is disabled
  and the depth of the children.
</p>

<h2>Finding dynamically rendered elements</h2>
<p>
  Components sometimes need to locate elements they didn't render. They do this with <code
    >ParentNode.querySelector</code
  > and find elements by role and data properties.
</p>
<p>
  For example, <code>TreeItem</code> finds previous and next siblings to implement up/down arrow key
  handling. It uses calls like <code>querySelector('[role="treeitem"][data-value]')</code> to locate
  the next sibling.
</p>
