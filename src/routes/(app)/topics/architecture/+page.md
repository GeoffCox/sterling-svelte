# Component Architecture

## Styleless by default

Svelte allows for encapsulating style within a component and preventing component style from leaking outside the components scope. This is a great feature when building Svelte applications. However, a good component library must support deep style customization.

Component library styles need to be globally overridable and support per-instance customization. For example, you might want to make most buttons be a relaxing blue, but have a delete button glow red and have a shimmering border.

For these reasons, sterling-svelte components do not apply any style by default.

A separate set of `sterling` CSS styles is provided. See the Design topic for details.

## Support variant styles

Each component exports a `variant` string property. This string is appended to the component class name at the root of the component. You can specify additional CSS classes for style components.

The `sterling` theme provides different preset variants per component. The component documentation describes the different presets.

Some examples:

- setting the variant to `colorful` will apply vivid colors rather than neutral colors to most components.
- setting the Button's variant to `capsule secondary` will both round the ends of the button and deemphasize the button by showing only the border outline in the default state.
- setting the Input's variant to `composed` will remove borders and background and turn off focus, outline, and disabled indicators. This is useful when the Input is within a container that will handle focus and disabled state itself.

## Forward HTML element props

Components will forward props to the intrinsic HTML element it renders.

For example, the Button component renders a `<button/>`.
The Button component forwards HTMLButtonElement props to the button element.

This means you can pass any HTMLButton prop to Button such as `type`.
If you specified `type=submit` this would override the Button components default `type=button` prop.

## Raise HTML events

Components will bubble the intrinsic events for the HTML element it renders.

Taking Button as an example again, it will bubble events from `<button/>` such as click, focus and blur, keydown and keyup, and others. This means you can subscribe to these HTMLButtonElement events just like you would for `<button />`;

### Event categories

HTML events are loosely grouped into categories here for easier mapping to events.

| Event Category | Events                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| change (text)  | beforeinput, change, input, invalid, reset                                                              |
| change (value) | change, input                                                                                           |
| click          | click, dblclick                                                                                         |
| clipboard      | copy, cut, paste                                                                                        |
| dialog         | cancel, close                                                                                           |
| drag           | drag, dragend, dragenter, dragleave, dragover, dragstart, drop                                          |
| focus          | blur, focus, focusin, focusout                                                                          |
| forms          | formdata, reset, submit                                                                                 |
| keystrokes     | keydown, keypress, keyup                                                                                |
| mouse          | mousedown, mouseenter, mouseleave, mousemove, mouseover, mouseout, mouseup, wheel                       |
| pointer        | gotpointercapture, lostpointercapture                                                                   |
| pointer (cont) | pointercancel, pointerdown, pointerenter, pointerleave, pointermove, pointerover, pointerout, pointerup |
| scroll         | scroll                                                                                                  |
| selection      | select                                                                                                  |
| touch          | touchcancel, touchend, touchmove, touchstart                                                            |

### Event Category -> Elements

Here's a list of events you can expect will be bubbled for types of elements.

| Event Category | Elements                                  |
| -------------- | ----------------------------------------- |
| change (text)  | input type='text', textarea               |
| change (value) | input type='checkbox', input type='radio' |
| click          | (all)                                     |
| clipboard      | div, input type='text', textarea          |
| dialog         | dialog                                    |
| drag           | (all)                                     |
| focus          | (all)                                     |
| keystrokes     | (all)                                     |
| mouse          | (all)                                     |
| pointer        | (all)                                     |
| scroll         | (all)                                     |
| selection      | input type='text', textarea               |
| touch          | (all)                                     |

## Prefer to render intrinsic HTML elements

Whenever a component is providing a thin wrapper around an HTML element,
it will typically render that element at the root element.

Some HTML elements cannot be restyled, but they do provide value being rendered by the component.
For example, `Checkbox` renders a hidden `input type=checkbox` that helps with focus and keyboard input.

Some HTML elements are too difficult to style without undue duplication of data or rendering.
For example `select` is hard to style and the items in the dropdown cannot be styled.
If the `Select` component rendered the `select` element, it would have to duplicate all the items in the `select`
and in its own dropdown.

Components also apply the appropriate ARIA role or leverage the default ARIA role of their intrinsic element.

## Portal to float UI above the page

Components that have dropdowns like `Dropdown`, `Menu`, and `Select` need to ensure that the dropdown UI is not
hidden due to a container's overflow setting. To achieve this, components will portal a part of their UI to
render it as a direct child of the `body`. The element will be inserted at the end of the list of children so that
it renders above other non-floating components.

## Provide composability with slots

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

## Communicate across hierarchy with context

When a component has a slot containing descendants, it cannot set properties, subscribe to events, or get a reference to
a descendant. This creates a difficult boundary to communication between components.

In these cases, components will use Svelte context to pass data and callbacks to descendants.
This provides the bonus that different kinds of descendants can be substituted given they use context.

For example, `Tree` sets a `TreeContext` context that tells `TreeItem` if the tree is disabled, the expanded node values,
and the selected value. `TreeItem` sets a `TreeItemContext` that tells `TreeItem` children, if the item is disabled and
the depth of the children.

## Locate elements using role and data-props

Slots don't allow components to know what type of elements are filling the slot.
Other times there may be sibling or parent elements a component doesn't know about because they are not within
the component's HTML.
Components sometimes need to locate elements in order to implement proper behavior.
They do this with `ParentNode.querySelector` and find elements by role and data properties.

For example, `TreeItem` finds previous and next siblings to implement up/down arrow key handling.
It uses calls like `querySelector('[role="treeitem"][data-value]')` to locate the next sibling.

This means that some components will have specific roles and data properties in order to participate in the behavior
of their parent component.
