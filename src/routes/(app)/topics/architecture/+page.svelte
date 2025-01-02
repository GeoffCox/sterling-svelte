<h1>Architecture</h1>

<p>
  <b>Important!</b> There are many changes to sterling-svelte as part of moving to Svelte 5. See the
  <a href="/topics/changelog">changelog</a> for the specifics.
</p>

<h2>Fully headless library (no default styling)</h2>
<p>
  sterling-svelte is a fully headless component library. You can use the Sterling theme through the
  @geoffcox/sterling-svelte-theme package or write your own.
</p>
<p>
  While Svelte allows for encapsulating style within a component and preventing component styles
  from leaking outside the components scope, it can hinder style customization in component
  libraries. Each sterling-svelte component is written to output HTML structure, CSS classes, and
  data attributes to let you easily style any component.
</p>

<h2>HTML props are forwarded</h2>
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

<h2>HTML events are distinguished from custom callbacks</h2>
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

<h2>Visual layers are created through portaling</h2>
<p>
  Components with floating UI like <code>Dropdown</code>, <code>Menu</code>, and <code>Select</code>
  need to ensure that the dropdown UI is not hidden due to a container's overflow setting. Components
  use portaling to render a part of their UI as the last child of the page
  <code>body</code>.
</p>

<h2>Composition is done with snippets</h2>
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

<h2>Context communicates across hierarchy</h2>
<p>
  When a component has a slot containing descendants, it cannot set properties, subscribe to events,
  or get a reference to a descendant. This creates a difficult boundary to communication between
  components.
</p>
<p>
  In these cases, components will use Svelte context to pass data and callbacks to descendants. This
  provides the bonus that different kinds of descendants can be substituted given they use context.
</p>
<p>
  For example, <code>Tree</code> sets a <code>TreeContext</code> context that tells
  <code>TreeItem</code>
  if the tree is disabled, the expanded node values, and the selected value. <code>TreeItem</code>
  sets a <code>TreeItemContext</code> that tells <code>TreeItem</code> children, if the item is disabled
  and the depth of the children.
</p>

<h2>Locates elements using role and data-props</h2>
<p>
  Slots don't allow components to know what type of elements are filling the slot. Other times there
  may be sibling or parent elements a component doesn't know about because they are not within the
  component's HTML. Components sometimes need to locate elements in order to implement proper
  behavior. They do this with <code>ParentNode.querySelector</code> and find elements by role and data
  properties.
</p>
<p>
  For example, <code>TreeItem</code> finds previous and next siblings to implement up/down arrow key
  handling. It uses calls like <code>querySelector('[role="treeitem"][data-value]')</code> to locate
  the next sibling.
</p>
<p>
  This means that some components will have specific roles and data properties in order to
  participate in the behavior of their parent component.
</p>
