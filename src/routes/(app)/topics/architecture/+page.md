# Architecture

## Headless by default

Svelte allows for encapsulating style within a component and preventing component style from leaking outside the components scope. This is a great feature when building Svelte applications. However, a good component library must support deep style customization.

Component library styles need to be globally overridable and support per-instance customization. For example, you might want to make most buttons be a relaxing blue, but have a delete button glow red and have a shimmering border. For these reasons, sterling-svelte components do not apply any style by default.

A separate set of `sterling` CSS styles is provided. See the Sterling Theme topic for details.

## Forwards HTML element props

Components will forward props to the intrinsic HTML element it renders.

For example, the Button component renders a `<button/>`.
The Button component forwards HTMLButtonElement props to the button element.

This means you can pass any HTMLButton prop to Button such as `type`.
If you specified `type=submit` this would override the Button components default `type=button` prop.

## Raises HTML events

Components will bubble the intrinsic events for the HTML element it renders.

Taking Button as an example again, it will bubble events from `<button/>` such as click, focus and blur, keydown and keyup, and others. This means you can subscribe to these HTMLButtonElement events just like you would for `<button />`; |

## Prefers intrinsic HTML elements

Whenever a component is providing a thin wrapper around an HTML element,
it will typically render that element at the root element.

Some HTML elements cannot be restyled, but they do provide value being rendered by the component.
For example, `Checkbox` renders a hidden `input type=checkbox` that helps with focus and keyboard input.

Some HTML elements are too difficult to style without undue duplication of data or rendering.
For example `select` is hard to style and the items in the dropdown cannot be styled.
If the `Select` component rendered the `select` element, it would have to duplicate all the items in the `select`
and in its own dropdown.

Components also apply the appropriate ARIA role or leverage the default ARIA role of their intrinsic element.

## Floats UI above the page using portals

Components that have dropdowns like `Dropdown`, `Menu`, and `Select` need to ensure that the dropdown UI is not
hidden due to a container's overflow setting. To achieve this, components will portal a part of their UI to
render it as a direct child of the `body`. The element will be inserted at the end of the list of children so that
it renders above other non-floating components.

## Supports composition with slots

Components declare a default `<slot />` element to allow callers to insert or replace content.
The default slot is typically used to fill in the children of the component element.

For example, `Button` has this anatomy

```svelte
<button>
  <slot {shape} {variant} />
</button>
```

This means any content you place as children, appear within the `Button`.

```svelte
<Button>
  <img src="./house.png" />
  <span class="home">Where the hear is</span>
</Button>
```

Components also provide named slots to insert or replace content.
Sometimes a component has to choose between two things that could be the default slot and make one of them a named slot.

For example, `TreeItem` contains both its item (usually an expand/collapse chevron and a text label) and its children.
This component provides a named item slot for the item and the default slot for its children.

```svelte
<div>
  <!-- item -->
  <slot name="item" />
  <!-- children -->
  <slot />
</div>
```

Components will provide default content for many slots.
This content will render if the slot is not filled by the caller.

For example, `TreeItem` renders a `TreeItemDisplay` for the item slot when the item slot is not filled.
The `TreeItemDisplay` has a default slot for the content appearing after the expand/collapse chevron.
`TreeItem` sets the `TreeItemDisplay` default slot to the `value` property unless the caller has filled the `label` slot.

```svelte
<slot name="item">
  <TreeItemDisplay>
    <svelte:fragment>
      <slot name="label">{value}</slot>
    </svelte:fragment>
  </TreeItemDisplay>
</slot>
```

## Communicates across hierarchy with context

When a component has a slot containing descendants, it cannot set properties, subscribe to events, or get a reference to
a descendant. This creates a difficult boundary to communication between components.

In these cases, components will use Svelte context to pass data and callbacks to descendants.
This provides the bonus that different kinds of descendants can be substituted given they use context.

For example, `Tree` sets a `TreeContext` context that tells `TreeItem` if the tree is disabled, the expanded node values,
and the selected value. `TreeItem` sets a `TreeItemContext` that tells `TreeItem` children, if the item is disabled and
the depth of the children.

## Locates elements using role and data-props

Slots don't allow components to know what type of elements are filling the slot.
Other times there may be sibling or parent elements a component doesn't know about because they are not within
the component's HTML.
Components sometimes need to locate elements in order to implement proper behavior.
They do this with `ParentNode.querySelector` and find elements by role and data properties.

For example, `TreeItem` finds previous and next siblings to implement up/down arrow key handling.
It uses calls like `querySelector('[role="treeitem"][data-value]')` to locate the next sibling.

This means that some components will have specific roles and data properties in order to participate in the behavior
of their parent component.
