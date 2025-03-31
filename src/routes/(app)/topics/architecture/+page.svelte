<script>
  import { preBlocks } from './preBlocks';
</script>

<div class="topic-page">
  <h1>Architecture</h1>

  <h2>Prop forwarding</h2>
  <p>
    Components will forward props to either the associated intrinsic HTML element or the root
    element rendered.
  </p>
  <p>
    For example, the Button component renders a &lt;button/&gt;. The Button component forwards
    HTMLButtonElement props to the button element.
  </p>
  <p>
    This means you can pass any HTMLButtonProp to Button. If you specified type=submit this would
    override the Button components default type=button prop.
  </p>

  <h2>Custom callbacks vs. HTML events</h2>
  <p>
    Svelte provide on<i>event</i> callbacks for HTML element events. These callbacks do not change the
    casing of the HTML event name. For example, the button click event is handled via the onclick callback.
  </p>
  <p>
    In sterling-svelte, any custom callbacks are camel cased on<i>Event</i>. For example, the
    callback for a tree item select events is
  </p>
  <pre>{preBlocks.callback}</pre>

  <h2>Floating UI</h2>
  <p>
    Components with floating UI like Dropdown, Menu, and Select need to ensure that the dropdown UI
    is not hidden due to a container's overflow setting. Components use portaling to render a part
    of their UI as the last child of &lt;body&gt;.
  </p>

  <h2>Composition</h2>
  <p>
    Components support named snippets to fill in or replace content. The children snippet is used
    for default content.
  </p>
  <p>
    Some props support either string or Snippet. For example, Label's text prop. If a string is
    passed, it is rendered as the label; otherwise <code>&#123;@render text()&#125;</code> is called.
  </p>
  <p>
    Components also provide default content when a snippet prop is undefined. For example, TreeItem
    will render the expand/collapse chevron.
  </p>

  <h2>Cross-compoonent communication</h2>
  <p>
    In a components like List or Tree, it would be a burden to require callers to pass properties
    down the hierarchy of components (aka prop drilling). For example, passing Tree's expandedValues
    property to every TreeItem would be tedious. Svelte's context is used to pass contextual data
    down the hierarchy.
  </p>
  <p>
    For example, Tree sets a TreeContext context that let TreeItem know if the Tree is disabled, the
    expanded node values, and the selected value. TreeItem sets a TreeItemContext that tells
    TreeItem children, if the parent is disabled and the depth of the parent.
  </p>

  <h2>Finding dynamically rendered elements</h2>
  <p>
    Components sometimes need to locate elements they didn't render. They do this with querySelector
    and find elements by class, role or data attributes.
  </p>
  <p>
    For example, TreeItem finds previous and next siblings to implement up/down arrow key handling.
    It uses calls like <code>querySelector('[role="treeitem"][data-value]')</code> to locate the next
    sibling.
  </p>

  <h2 id="ArchitectureThemeReady">Theme Ready</h2>

  <p>
    Each sterling-svelte component renders HTML elements with classes and data attributes to allow
    theming and styling.
  </p>

  <ul>
    <li>
      A sterling-<i>component</i> class is added to each root element. For example, Button renders
      <code>&lt;button class="sterling-button"&gt;</code>.
    </li>
    <li>
      Marker classes are added to child HTML elements. For example, Switch add 'off-label',
      'toggle', 'thumb', and 'on-label' classes to the different child elements.
    </li>
    <li>
      Classes are added based on state. For example, Tab add the 'selected' class whenever it is
      selected.
    </li>
    <li>
      Data attributes are added based on state. For example, ListItem add the 'data-value='
      attribute with their value.
    </li>
  </ul>
</div>

<style>
  .topic-page {
    max-width: 900px;
  }
</style>
