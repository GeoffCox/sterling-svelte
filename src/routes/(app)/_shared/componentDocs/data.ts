import type { ComponentDoc } from './types';
import { makeExtendsComment, commonProps } from './commonDoc';

import CalloutPlayground from '../../_playgrounds/callout/CalloutPlayground.svelte';
import CheckboxPlayground from '../../_playgrounds/checkbox/CheckboxPlayground.svelte';
import ColorPickerPlayground from '../../_playgrounds/colorpicker/ColorPickerPlayground.svelte';
import DialogPlayground from '../../_playgrounds/dialog/DialogPlayground.svelte';
import DropdownPlayground from '../../_playgrounds/dropdown/DropdownPlayground.svelte';
import HexColorSlidersPlayground from '../../_playgrounds/hexcolorsliders/HexColorSlidersPlayground.svelte';
import HslColorSlidersPlayground from '../../_playgrounds/hslcolorsliders/HslColorSlidersPlayground.svelte';
import InputPlayground from '../../_playgrounds/input/InputPlayground.svelte';
import LabelPlayground from '../../_playgrounds/label/LabelPlayground.svelte';
import LinkPlayground from '../../_playgrounds/link/LinkPlayground.svelte';
import ListPlayground from '../../_playgrounds/list/ListPlayground.svelte';
import ListItemPlayground from '../../_playgrounds/listitem/ListItemPlayground.svelte';
import MenuBarPlayground from '../../_playgrounds/menubar/MenuBarPlayground.svelte';
import MenuButtonPlayground from '../../_playgrounds/menubutton/MenuButtonPlayground.svelte';
import MenuItemPlayground from '../../_playgrounds/menuitem/MenuItemPlayground.svelte';
import MenuItemDisplayPlayground from '../../_playgrounds/menuitemdisplay/MenuItemDisplayPlayground.svelte';
import MenuSeparatorPlayground from '../../_playgrounds/menuseparator/MenuSeparatorPlayground.svelte';
import PopoverPlayground from '../../_playgrounds/popover/PopoverPlayground.svelte';
import ProgressPlayground from '../../_playgrounds/progress/ProgressPlayground.svelte';
import RadioPlayground from '../../_playgrounds/radio/RadioPlayground.svelte';
import SelectPlayground from '../../_playgrounds/select/SelectPlayground.svelte';
import SliderPlayground from '../../_playgrounds/slider/SliderPlayground.svelte';
import SwitchPlayground from '../../_playgrounds/switch/SwitchPlayground.svelte';
import TabPlayground from '../../_playgrounds/tab/TabPlayground.svelte';
import TabListPlayground from '../../_playgrounds/tablist/TabListPlayground.svelte';
import TextAreaPlayground from '../../_playgrounds/textarea/TextAreaPlayground.svelte';
import TooltipPlayground from '../../_playgrounds/tooltip/TooltipPlayground.svelte';
import TreePlayground from '../../_playgrounds/tree/TreePlayground.svelte';
import TreeChevronPlayground from '../../_playgrounds/treechevron/TreeChevronPlayground.svelte';
import TreeItemPlayground from '../../_playgrounds/treeitem/TreeItemPlayground.svelte';
import TreeItemDisplayPlayground from '../../_playgrounds/treeitemdisplay/TreeItemDisplayPlayground.svelte';
import { buttonDoc } from './buttonDoc';

export const componentDocs: Record<string, ComponentDoc> = {
  button: buttonDoc,
  callout: {
    name: 'Callout',
    description: 'A floating box of content with an arrow pointing at the reference element',
    comments: [
      'The Popover component provides floating content without the Callout style.',
      makeExtendsComment('HTMLDivElement')
    ],
    props: [
      {
        name: 'conditionalRender',
        type: 'boolean',
        default: 'true',
        comment: 'Conditionally renders content based on open'
      },
      {
        name: 'crossAxisOffset',
        type: 'number',
        default: '0',
        comment: 'The offset along the side of the reference element'
      },
      {
        name: 'mainAxisOffset',
        type: 'number',
        default: '0',
        comment: 'The offset towards or away from the side of the reference element'
      },
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the callout is open and visible'
      },
      {
        name: 'placement',
        type: 'PopoverPlacement',
        default: "'top-start'",
        comment: 'How the callout should be positioned relative to the reference element'
      },
      {
        name: 'portalHost',
        type: 'HTMLElement',
        default: 'undefined',
        comment: 'The host container for the callout'
      },
      {
        name: 'reference',
        type: 'HTMLElement',
        default: 'undefined',
        comment: 'The reference to the element anchoring the position of the callout'
      },
      commonProps.variant
    ],
    anatomy: `<div class="sterling-callout-portal">
  <div class="sterling-callout">
    <slot />
    <div class="arrow" />
  </div>
</div>`,
    usage: CalloutPlayground
  },
  checkbox: {
    name: 'Checkbox',
    description: 'A styled HTML input element with type=checkbox',
    comments: [makeExtendsComment('HTMLInputElement')],
    props: [commonProps.variant],
    anatomy: `<div class="sterling-checkbox">
  <div class="container">
    <!-- hidden-->
    <input />
    <div class="indicator" />
  </div>
  <label>
    <slot {checked} {disabled} {inputId} {value} {variant} />
  </label>
</div>`,
    usage: CheckboxPlayground
  },
  colorpicker: {
    name: 'ColorPicker',
    description: 'A Dropdown choosing a color in RGB(A), HEX(8), or HSL(A) formats',
    comments: [
      'The dropdown displays a set of sliders based on the color format selected.',
      'Changing the input to a color value with a different color format, switches the selected color format.',
      'Switching from HSL to HEX or RGB rounds values to the nearest color.',
      'There are no slots due to the required coordination between sliders and the dropdown.',
      makeExtendsComment('Dropdown')
    ],
    types: [
      {
        name: 'ColorFormat',
        definition: "'hex' | 'rgb' | 'hsl'"
      }
    ],
    props: [
      {
        name: 'colorText',
        type: 'string',
        default: "'#000000'",
        comment: 'The color value in HEX, RGB, or HSL format'
      },
      {
        name: 'colorFormat',
        type: 'ColorFormat',
        default: "'hex'",
        comment: 'The current color format'
      },

      commonProps.variant
    ],
    anatomy: `<div class="sterling-color-picker">
  <Dropdown>
    <div class="value" slot="value">
      <div class="color-box" />
      <Input />
    </div>
    <div class="sterling-color-picker-popup">
      <div class="tabs">
        <TabList />
      </div>
      <div class="sliders">
        <HexColorSliders />
        <HslColorSliders />
        <RgbColorSliders />
      </div>
    </div>
  </Dropdown>
</div>`,
    usage: ColorPickerPlayground
  },
  dialog: {
    name: 'Dialog',
    description: 'A styled HTML dialog element',
    comments: [
      'The dialog is always modal.',
      'The cancel event is only raised when the escape key is pressed.',
      makeExtendsComment('HTMLDialogElement')
    ],
    props: [
      {
        name: 'backdropCloses',
        type: 'boolean',
        default: 'false',
        comment: 'When true, clicking outside the dialog causes the dialog close'
      },
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the dialog is open; otherwise the dialog is closed'
      },
      {
        name: 'returnValue',
        type: 'string',
        default: "''",
        comment: 'A value indicates OK, empty indicates cancellation.'
      },
      commonProps.variant
    ],
    anatomy: `<dialog class="sterling-dialog">
  <form>
    <div class="content">
      <slot name="content">
        <div class="header">
          <slot name="header">
            <div class="title">
              <slot name="title" />
            </div>
            <div class="close">
              <Button>
                <div class="close-x" />
              </Button>
            </div>
          </slot>
        </div>
        <div class="body">
          <slot name="body" />
        </div>
        <div class="separator" />
        <div class="footer">
          <slot name="footer" />
        </div>
      </slot>
    </div>
  </form>
</dialog>`,
    usage: DialogPlayground
  },
  dropdown: {
    name: 'Dropdown',
    description:
      'A displayed value with a button that opens a floating panel for changing the value',
    comments: [makeExtendsComment('HTMLDivElement')],
    props: [
      {
        name: 'disabled',
        type: 'string',
        default: 'false',
        comment: 'When true, the dropdown is disabled and closed'
      },
      {
        name: 'open',
        type: 'string',
        default: 'false',
        comment: 'When true, the dropdown is open'
      },
      {
        name: 'stayOpenOnClickAway',
        type: 'string',
        default: 'false',
        comment: 'When true and the user clicks away from the dropdown, it remains open'
      },
      {
        name: 'variant',
        type: 'string',
        default: "''",
        comment: 'Additional class names to apply'
      }
    ],
    events: [
      {
        name: 'open',
        data: '{open: boolean}',
        comment: 'Raised when the dropdown opens or closes'
      }
    ],
    anatomy: `<div class="sterling-dropdown">
  <div class="value">
    <slot name="value" {disabled} {open} {variant} />
  </div>
  <slot name="button" {disabled} {open} {variant}>
    <div class="button">
      <slot name="icon" {disabled} {open} {variant}>
        <div class="chevron" />
      </slot>
    </div>
  </slot>
  <Popover>
    <div class="sterling-dropdown-popup-content">
      <slot {disabled} {open} {variant} />
    </div>
  </Popover>
</div>`,
    usage: DropdownPlayground
  },
  hexcolorsliders: {
    name: 'HexColorSliders',
    description: 'A set of sliders for selecting a color in HEX format',
    comments: [makeExtendsComment('HTMLDivElement')],
    props: [
      {
        name: 'red',
        type: 'number',
        default: '0',
        comment: 'The red value.'
      },
      {
        name: 'green',
        type: 'number',
        default: '0',
        comment: 'The green value.'
      },
      {
        name: 'blue',
        type: 'number',
        default: '0',
        comment: 'The blue value.'
      },
      {
        name: 'alpha',
        type: 'number',
        default: '255',
        comment: 'The alpha value.'
      },
      commonProps.variant
    ],
    anatomy: `<div class="sterling-hex-color-sliders">
  <Slider variant="red" />
  <Input variant="red" />
  <Slider variant="green" />
  <Input variant="green" />
  <Slider variant="blue" />
  <Input variant="blue" />
  <div class="alpha-hatch" />
  <div class="alpha-gradient" />
  <Slider variant="alpha" />
  <Input variant="alpha" />
</div>`,
    usage: HexColorSlidersPlayground
  },
  hslcolorsliders: {
    name: 'HslColorSliders',
    description: 'A set of sliders for selecting a color in HSL format',
    comments: [makeExtendsComment('HTMLDivElement')],
    props: [
      {
        name: 'hue',
        type: 'number',
        default: '180',
        comment: 'The hue value.'
      },
      {
        name: 'saturation',
        type: 'number',
        default: '100',
        comment: 'The saturation value.'
      },
      {
        name: 'lightness',
        type: 'number',
        default: '50',
        comment: 'The lightness value.'
      },
      {
        name: 'alpha',
        type: 'number',
        default: '1',
        comment: 'The alpha value.'
      },
      commonProps.variant
    ],
    anatomy: `<div class="sterling-hsl-color-sliders">
  <Slider variant="hue" />
  <Input variant="hue" />
  <Slider variant="saturation" />
  <Input variant="saturation" />
  <Slider variant="lightness" />
  <Input variant="lightness" />
  <div class="alpha-hatch" />
  <div class="alpha-gradient" />
  <Slider variant="alpha" />
  <Input variant="alpha" />
</div>`,
    usage: HslColorSlidersPlayground
  },
  input: {
    name: 'Input',
    description: 'A styled HTML input with an optional label',
    comments: [
      'Prefer using the Label component rather than the label produced by providing default slot content.',
      makeExtendsComment('HTMLInputElement')
    ],
    props: [commonProps.variant],
    anatomy: `<label class="sterling-input-label">
  <slot {disabled} {value} {variant} />
</label>
<div class="sterling-input">
  <input />
</div>`,
    usage: InputPlayground
  },
  label: {
    name: 'Label',
    description:
      'A named container for an interactive element such as an input, select, list, or tree.',
    comments: [
      'An optional message and status can provide information to the user about their value.',
      'The required property and requiredReason indicate the user must fill in a value and why.',
      makeExtendsComment('HTMLLabelElement')
    ],
    props: [
      {
        name: 'forwardClick',
        type: 'string',
        default: 'false',
        comment: 'If true, clicking the label invokes a click on the content.'
      },
      {
        name: 'message',
        type: 'string',
        default: "''",
        comment: 'The status message to display.'
      },
      {
        name: 'required',
        type: 'string',
        default: 'false',
        comment: 'When true, the label will indicate a value is required.'
      },
      {
        name: 'requiredReason',
        type: 'string',
        default: "''",
        comment: 'The reason a value is required.'
      },
      {
        name: 'status',
        type: 'string',
        default: "''",
        comment: 'The status of the label message.'
      },
      {
        name: 'text',
        type: 'string',
        default: "''",
        comment: 'The text to display in the label. Not used if the text slot is filled.'
      },
      {
        name: 'vertical',
        type: 'string',
        default: 'true',
        comment: 'When true, the label appears above the content.'
      },
      commonProps.variant
    ],
    types: [
      {
        name: 'LabelStatus',
        definition: "'none' | 'error' | 'warning' | 'info' | 'success'",
        comment: 'Used for the Label status property.'
      }
    ],
    anatomy: `<label class="sterling-label">
   <slot name="text" {disabled} {for} {forwardClick} {required} {text} {variant}>
    <div class="text">{text}</div>
    </slot>
  <div class="content">
    <slot />
  </div>
  <slot name="message" {disabled} {message} {required} {status} {variant}>
    <div class="message">{message}</div>
  </slot>
  <slot name="required" {requiredReason} {variant}>
    <Tooltip>
      <span class="required-reason" slot="tip">{requiredReason}</span>
      <div class="required">*</div>
    </Tooltip>
  </slot>
</label>`,
    usage: LabelPlayground
  },
  link: {
    name: 'Link',
    description: 'A styled HTML a link or anchor element',
    comments: [makeExtendsComment('HTMLAnchorElement')],
    props: [commonProps.variant],
    anatomy: `<a class="sterling-link">
  <slot {disabled} {href} {variant} />
</a>`,
    usage: LinkPlayground
  },
  list: {
    name: 'list',
    description: 'A scrollable list of items with a selected item',
    comments: [
      'Use the default slot to provide list items.',
      'A list item is identified by having data-value and role="listitem" properties. Any content without these properties, will not participate in selection. This allows you to mix in other content with list items such as search boxes, group headers, or decorations.',
      'If no item is selected, selectNextItem selects the first item in the list and selectPreviousItem selects the last item in the list.',
      makeExtendsComment('HTMLAnchorElement')
    ],
    props: [
      {
        name: 'disabled',
        type: 'string',
        default: 'false',
        comment: 'When true, the list and all its items are disabled'
      },
      {
        name: 'horizontal',
        type: 'string',
        default: 'false',
        comment: 'When true, items are arranged horizontally'
      },
      {
        name: 'selectedValue',
        type: 'string | undefined',
        default: 'undefined',
        comment: 'The value of the currently selected item'
      },
      {
        name: 'variant',
        type: 'string',
        default: "''",
        comment: 'Additional class names to apply'
      },
      commonProps.variant
    ],
    events: [
      {
        name: 'select',
        comment: 'Raised when the selectedValue changes',
        data: 'value'
      }
    ],
    methods: [
      {
        name: 'scrollToItem',
        comment: 'Scrolls to the item with the given value'
      },
      {
        name: 'selectItem',
        comment: 'Selects the item with the given value'
      },
      {
        name: 'selectNextItem',
        comment: 'Selects the item after the selected item'
      },
      {
        name: 'selectPreviousItem',
        comment: 'Selects the item before the selected item'
      },
      {
        name: 'selectFirstItem',
        comment: 'Selects the first item in the list'
      },
      {
        name: 'selectLastItem',
        comment: 'Selects the last item in the list'
      }
    ],
    anatomy: `<div class="sterling-list">
  <slot {disabled} {horizontal} {selectedValue} {variant} />
</div>`,
    usage: ListPlayground
  },
  listitem: {
    name: 'ListItem',
    description: 'An item within a List',
    comments: [makeExtendsComment('HTMLDivElement')],
    props: [
      {
        name: 'disabled',
        type: 'string',
        default: 'false',
        comment: 'When true, the item is disabled'
      },
      {
        name: 'value',
        type: 'string',
        default: "''",
        comment: 'The value uniquely identifying this item within the list'
      },
      commonProps.variant
    ],
    anatomy: `<div class="sterling-list-item">
  <slot {disabled} {horizontal} {selected} {value} {variant}>{value}</slot>
</div>`,
    usage: ListItemPlayground
  },
  menu: {
    name: 'Menu',
    description: 'A vertical list of menu items',
    comments: [
      'Menu is a building block for the other menu components: MenuBar, MenuButton, MenuItem, MenuSeparator.',
      'Position is based on the reference element.',
      'The menu floats above other elements on the page via portal.',
      makeExtendsComment('HTMLDivElement')
    ],
    props: [commonProps.variant],
    methods: [
      {
        name: 'focusFirstMenuItem',
        comment: 'Focuses the first menu item.'
      },
      {
        name: 'focusPreviousMenuItem',
        comment: 'Focuses the previous menu item.'
      },
      {
        name: 'focusNextMenuItem',
        comment: 'Focuses the next menu item.'
      },
      {
        name: 'focusLastMenuItem',
        comment: 'Focuses the last menu item.'
      }
    ]
  },
  menubar: {
    name: 'MenuBar',
    description: 'A horizontal list of menus, often positioned at the top of a window',
    comments: [
      'Prefer using the Label component rather than the label produced by providing default slot content.',
      makeExtendsComment('HTMLAnchorElement')
    ],
    props: [commonProps.variant],
    events: [
      {
        name: 'close',
        comment: 'Raised when a descendant menu is closed',
        data: 'value'
      },
      {
        name: 'open',
        comment: 'Raised when a descendant menu is opened',
        data: 'value'
      },
      {
        name: 'selected',
        comment: 'Raised when descendant menu item is selected',
        data: 'value'
      }
    ],
    anatomy: `<div class="sterling-menu-bar">
  <slot {variant} />
</div>`,
    usage: MenuBarPlayground
  },
  menubutton: {
    name: 'MenuButton',
    description: 'A Button that opens a Menu when clicked',
    comments: [makeExtendsComment('Button'), makeExtendsComment('HTMLButtonElement')],
    props: [
      {
        name: 'open',
        type: 'string',
        default: 'false',
        comment: 'When true, the menu is open'
      },
      {
        name: 'menuVariant',
        type: 'string',
        default: "''",
        comment: 'Additional class names to apply to the Menu'
      },
      {
        name: 'value',
        type: 'string',
        default: "''",
        comment: 'The value uniquely identifying this menu button as the root of the menu hierarchy'
      },
      commonProps.variant
    ],
    events: [
      {
        name: 'close',
        comment: 'Raised when the menu or a descendant menu is closed',
        data: '{ value: string }'
      },
      {
        name: 'open',
        comment: 'Raised when the menu or a descendant menu is opened',
        data: '{ value: string }'
      },
      {
        name: 'selected',
        comment: 'Raised when a descendant a menu item is selected',
        data: '{ value: string }'
      }
    ],
    anatomy: `<Button>
  <div class="reference">
    <slot {open} {value} {variant} />
  </div>
  <Popover>
    <Menu variant={menuVariant}>
      <slot name="items" />
    </Menu>
  </Popover>
</Button>`,
    usage: MenuButtonPlayground
  },
  menuitem: {
    name: 'MenuItem',
    description: 'A styled HTML <button> providing an item within a Menu.',
    comments: [makeExtendsComment('HTMLButtonElement')],
    props: [
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the menu item is checked'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the menu item is disabled'
      },
      {
        name: 'role',
        type: 'MenuItemRole',
        default: "''",
        comment: 'The role of the menu item'
      },
      {
        name: 'text',
        type: 'string | undefined',
        default: 'undefined',
        comment: 'The text of the menu item'
      },
      {
        name: 'value',
        type: 'string',
        default: "''",
        comment: 'The value uniquely identifying this menu item within the menu hierarchy'
      },
      commonProps.variant
    ],
    events: [
      {
        name: 'close',
        comment: 'Raised when the menu item is closed',
        data: '{ value: string }'
      },
      {
        name: 'open',
        comment: 'Raised when the menu item is opened',
        data: '{ value: string }'
      },
      {
        name: 'select',
        comment: 'Raised when the menu item is selected',
        data: '{ value: string }'
      }
    ],
    types: [
      {
        name: 'MenuItemRole',
        definition: "'menuitem' | 'menuitemcheckbox' | 'menuitemradio'",
        comment: 'Used for the MenuItem role property.'
      }
    ],
    anatomy: `<button class="sterling-menu-item">
  <div class="item">
    <slot
      name="item"
      {checked}
      {depth}
      {disabled}
      {hasChildren}
      {isMenuBarItem}
      {open}
      {role}
      {text}
      {value}
      {variant}
    >
      <MenuItemDisplay>{text}</MenuItemDisplay>
    </slot>
  </div>
  <Popover>
    <Menu>
      <slot {depth} {disabled} />
    </Menu>
  </Popover>
</button>`,
    usage: MenuItemPlayground
  },
  menuitemdisplay: {
    name: 'MenuItemDisplay',
    description: 'he default content for a MenuItem in a Menu',
    comments: [makeExtendsComment('HTMLDivElement')],
    props: [
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        comment: 'When true, displays the menu item as checked.'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        comment: 'When true, displays the menu item as disabled.'
      },
      {
        name: 'hasChildren',
        type: 'boolean',
        default: 'false',
        comment: 'When true, displays the menu item as a parent of children.'
      },
      {
        name: 'isMenuBarItem',
        type: 'boolean',
        default: 'false',
        comment: 'When true, displays the menu as a top level menu bar item.'
      },
      {
        name: 'menuItemRole',
        type: 'MenuItemRole',
        default: "'menuitem'",
        comment: 'The role of the menu item.'
      },
      commonProps.variant
    ],
    anatomy: `<div class="sterling-menu-item-display">
  <div class="check" />
  <div class="content">
    <slot {checked} {disabled} {hasChildren} {isMenuBarItem} {menuItemRole} {variant} />
  </div>
  <div class="shortcut">
    <slot name="shortcut" {checked} {disabled} {isMenuBarItem} {menuItemRole} {variant} />
  </div>
  <div class="chevron" />
</div>`,
    usage: MenuItemDisplayPlayground
  },
  menuseparator: {
    name: 'MenuSeparator',
    description: 'A horizontal line separating menu items',
    comments: [makeExtendsComment('HTMLDivElement')],
    props: [commonProps.variant],
    anatomy: `<div class="sterling-menu-separator" />`,
    usage: MenuSeparatorPlayground
  },
  popover: {
    name: 'Popover',
    description: 'A floating box of content',
    comments: [
      'Floats content above the page via use:portal. Elements are moved to the end of the `body` element so they appear above them in the z-order.',
      'Popover does not provide any styling (background, border, etc.) around the floating content.'
    ],
    props: [
      {
        name: 'conditionalRender',
        type: 'boolean',
        default: 'true',
        comment: 'When true, content is rendered only when the popover is open.'
      },
      {
        name: 'crossAxisOffset',
        type: 'number',
        default: '0',
        comment: 'The offset along the side of the reference element.'
      },
      {
        name: 'mainAxisOffset',
        type: 'number',
        default: '0',
        comment: 'The offset towards or away from the side of the reference element.'
      },
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the popover is open and visible.'
      },
      {
        name: 'placement',
        type: 'PopoverPlacement',
        default: "'bottom-start'",
        comment: 'How the popover should be positioned relative to the reference element.'
      },
      {
        name: 'portalHost',
        type: 'HTMLElement | undefined',
        default: 'undefined',
        comment: 'The host container for the callout.'
      },
      {
        name: 'reference',
        type: 'HTMLElement | undefined',
        default: 'undefined',
        comment: 'The reference to the element anchoring the position of the popover.'
      }
    ],
    types: [
      {
        name: 'PopoverPlacement',
        definition:
          "'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'"
      }
    ],
    anatomy: `<div class="sterling-popover-portal" use:portal>
  <div class="sterling-popover">
    <slot {open} {variant} />
  </div>
</div>`,
    usage: PopoverPlayground
  },
  progress: {
    name: 'Progress',
    description: 'A visual bar that expands to indicate progress.',
    comments: [makeExtendsComment('HTMLDivElement')],
    props: [
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the progress bar is disabled.'
      },
      {
        name: 'max',
        type: 'number',
        default: '100',
        comment: 'The maximum value.'
      },
      {
        name: 'percent',
        type: 'number',
        default: '0',
        comment: 'A read-only percentage between 0 and 100 calculated from value and max.'
      },
      {
        name: 'status',
        type: 'ProgressStatus',
        default: "'none'",
        comment: 'The current status of the progress.'
      },
      {
        name: 'value',
        type: 'number',
        default: '0',
        comment: 'The current value.'
      },
      commonProps.variant,
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the progress bar is displayed vertically.'
      }
    ],
    types: [
      {
        name: 'ProgressStatus',
        definition: "'none' | 'error' | 'warning' | 'info' | 'success'",
        comment: 'Used for the Progress status property.'
      }
    ],
    anatomy: `<div class="sterling-progress">
  <div class="container">
    <div class="indicator" />
  </div>
</div>`,
    usage: ProgressPlayground
  },
  radio: {
    name: 'Radio',
    description: 'A styled HTML input element with type=radio',
    comments: [makeExtendsComment('HTMLInputElement')],
    props: [
      {
        name: 'group',
        type: 'string',
        default: "''",
        comment: 'The group to bind to the selected value for a group of radio buttons'
      },
      commonProps.variant
    ],
    anatomy: `<div class="sterling-radio">
  <div class="container">
    <!-- hidden -->
    <input />
    <div class="indicator" />
  </div>
  <label>
    <slot {checked} {disabled} {group} {inputId} {value} {variant} />
  </label>
</div>`,
    usage: RadioPlayground
  },
  select: {
    name: 'Select',
    description: 'A value that can be selected from a dropdown list of values',
    comments: [
      'Due to lack of styling capabilities with <select>, the Select component does not use <select>',
      makeExtendsComment('HTMLDivElement')
    ],
    props: [
      {
        name: 'open',
        type: 'boolean',
        default: 'false',
        comment: "When true, the select's dropdown is open."
      },
      {
        name: 'selectedValue',
        type: 'string | undefined',
        default: 'undefined',
        comment: 'The value of the selected item.'
      },
      commonProps.variant,
      {
        name: 'listVariant',
        type: 'string',
        default: "''",
        comment: 'Additional class names to apply to the List'
      }
    ],
    events: [
      {
        name: 'pending',
        data: '{ value: string }',
        comment: 'Raised when a value is selected but not yet committed'
      },
      {
        name: 'select',
        data: '{ value: string }',
        comment: 'Raised when a value is selected'
      }
    ],
    methods: [
      {
        name: 'scrollToSelectedItem',
        comment: 'Scrolls to the selected item'
      }
    ],
    anatomy: `<div class="sterling-select">
  <div class="value">
    <slot name="value" {disabled} {open} {selectedValue} {variant}>
      {selectedValue}
    </slot>
  </div>
  <div class="button">
    <slot name="button" {disabled} {open} {selectedValue} {variant}>
      <slot name="icon" {disabled} {open} {selectedValue} {variant}>
        <div class="chevron" />
      </slot>
    </slot>
  </div>
  <Popover>
    <div class="sterling-select-popup-content">
      <List>
        <!-- Items to display in the dropdown -->
        <slot {variant} {listVariant} />
      </List>
    </div>
  </Popover>
</div>`,
    usage: SelectPlayground
  },
  slider: {
    name: 'Slider',
    description: 'A draggable button on a line to set a value in a range.',
    comments: [makeExtendsComment('HTMLDivElement')],
    props: [
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the slider is disabled'
      },
      {
        name: 'max',
        type: 'number',
        default: '100',
        comment: 'The maximum value of the slider'
      },
      {
        name: 'min',
        type: 'number',
        default: '0',
        comment: 'The minimum value of the slider'
      },
      {
        name: 'step',
        type: 'number',
        default: '1',
        comment: 'The amount the value changes by pressing arrow keys'
      },
      {
        name: 'precision',
        type: 'number | undefined',
        default: 'undefined',
        comment: 'The number of decimal places to round the value'
      },
      {
        name: 'value',
        type: 'number',
        default: '0',
        comment: 'The current value of the slider'
      },
      commonProps.variant,
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the slider is displayed vertically'
      }
    ],
    events: [
      {
        name: 'change',
        data: '{ value: number }',
        comment: 'Raised when the value of the slider changes'
      }
    ],
    anatomy: `<div class="sterling-slider">
  <div class="container">
    <div class="track" />
    <div class="fill" />
    <div class="thumb" />
  <div>
</div>`,
    usage: SliderPlayground
  },
  switch: {
    name: 'Switch',
    description: 'A styled HTML input element with type=checkbox',
    comments: [makeExtendsComment('HTMLInputElement')],
    props: [
      {
        name: 'offText',
        type: 'string | undefined',
        default: 'undefined',
        comment:
          'The text appearing by the off position. Not used when the offLabel slot is filled.'
      },
      {
        name: 'onText',
        type: 'string | undefined',
        default: 'undefined',
        comment:
          'The text appearing near the on position. Not used when the onLabel slot is filled.'
      },
      commonProps.variant,
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the switch is displayed vertically.'
      }
    ],
    anatomy: `<div class="sterling-switch">
   <!-- hidden input -->
  <input />
  <div class="off-label">
    <slot name="offLabel" {checked} {disabled} {inputId} {offText} {variant} {vertical} />
  </div>
  <div class="switch">
    <div class="thumb" />
  </div>
  <div class="on-label">
    <slot name="onLabel" {checked} {disabled} {inputId} {onText} {variant} {vertical}>
  </div>
</div>`,
    usage: SwitchPlayground
  },
  tab: {
    name: 'Tab',
    description: 'A button that switches the content displayed in a TabList',
    comments: [
      'When the parent TabList is disabled, the Tab is also disabled.',
      makeExtendsComment('HTMLButtonElement')
    ],
    props: [
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the tab is disabled'
      },
      {
        name: 'selected',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the tab is selected'
      },
      {
        name: 'text',
        type: 'string | undefined',
        default: 'undefined',
        comment: 'The text of the tab; not used when the default slot is filled'
      },
      {
        name: 'value',
        type: 'string',
        comment: 'The value uniquely identifying this tab within the tab list'
      },
      commonProps.variant
    ],
    anatomy: `<button class="sterling-tab">
  <slot {disabled} {selected} {text} {value} {variant}>
    <div class="text">{text || value}</div>
  </slot>
  <div class="indicator" />
</button>`,
    usage: TabPlayground
  },
  tablist: {
    name: 'TabList',
    description: 'A list of tabs where selecting a tab can switch the content displayed',
    comments: [makeExtendsComment('HTMLDivElement')],
    props: [
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the tab list and its tabs are disabled'
      },
      {
        name: 'selectedValue',
        type: 'string | undefined',
        default: 'undefined',
        comment: 'The value of the currently selected tab'
      },
      {
        name: 'vertical',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the tab list is displayed vertically'
      },
      commonProps.variant
    ],
    events: [
      {
        name: 'select',
        comment: 'Raised when a tab is selected',
        data: 'value'
      }
    ],
    methods: [
      {
        name: 'selectFirstTab',
        comment: 'Selects the first tab.'
      },
      {
        name: 'selectPreviousTab',
        comment: 'Selects the previous tab.'
      },
      {
        name: 'selectNextTab',
        comment: 'Selects the next tab.'
      },
      {
        name: 'selectLastTab',
        comment: 'Selects the last tab.'
      }
    ],
    anatomy: `<div class="sterling-tab-list">
  <!-- children -->
  <slot {disabled} {selectedValue} {variant} {vertical} />
</div>`,
    usage: TabListPlayground
  },
  textarea: {
    name: 'Textarea',
    description: 'A styled HTML textarea element',
    comments: [makeExtendsComment('HTMLTextAreaElement')],
    props: [
      {
        name: 'autoHeight',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the text area will resize itself vertically to fit text.'
      },
      {
        name: 'resize',
        type: 'TextAreaResize',
        default: "'none'",
        comment: 'Sets the resize handle direction.'
      },
      commonProps.variant
    ],
    anatomy: `<div class="sterling-text-area">
  <textarea />
</div>`,
    usage: TextAreaPlayground
  },
  tooltip: {
    name: 'Tooltip',
    description: 'A Callout that display after the mouse hovers over the reference element',
    comments: [
      'The tooltip is anchored to a sibling element that appears directly after the default slot content.',
      makeExtendsComment('Callout')
    ],
    props: [
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the tooltip is disabled and will not be shown.'
      },
      {
        name: 'hoverDelayMilliseconds',
        type: 'number',
        default: '1000',
        comment: 'The duration of mouse hover before showing the tooltip.'
      }
    ],
    anatomy: `<slot {disabled} {hoverDelayMilliseconds} {open} {variant} />
<!-- hidden anchor point -->
<div class="sterling-tooltip-origin" />
<Callout>
  <slot name="tip" {placement} {variant} />
</Callout>`,
    usage: TooltipPlayground
  },
  tree: {
    name: 'Tree',
    description:
      'A hierarchy of items that can be expanded or collapsed. A single item can be selected.',
    comments: [makeExtendsComment('HTMLDivElement')],
    props: [
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the tree and its descendants are disabled.'
      },
      {
        name: 'selectedValue',
        type: 'string | undefined',
        default: 'undefined',
        comment: 'The value of the currently selected item.'
      },
      {
        name: 'expandedValues',
        type: 'string[]',
        default: '[]',
        comment: 'The values of items that are expanded.'
      },
      commonProps.variant
    ],
    events: [
      {
        name: 'expandCollapse',
        comment: 'Raised when an item is expanded or collapsed',
        data: '{ expandedValues: string[] }'
      },
      {
        name: 'select',
        comment: 'Raised when an item is selected',
        data: '{ selectedValue: string }'
      }
    ],
    anatomy: `<div class="sterling-tree">
  <!-- children -->
  <slot {disabled} {expandedValues} {selectedValue} {variant} />
</div>`,
    usage: TreePlayground
  },
  treechevron: {
    name: 'TreeChevron',
    description: 'A chevron that indicates the expand/collapse state of a TreeItem',
    comments: [
      'Provides selection, expand/collapse, and interaction within a Tree',
      makeExtendsComment('HTMLDivElement')
    ],
    props: [
      {
        name: 'expanded',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the chevron indicates the item is expanded.'
      },
      {
        name: 'hasChildren',
        type: 'boolean',
        default: 'false',
        comment: 'When false, the chevron indicates the item is a leaf.'
      },
      commonProps.variant
    ],
    anatomy: `<div class="sterling-tree-chevron"/>`,
    usage: TreeChevronPlayground
  },
  treeitem: {
    name: 'TreeItem',
    description: 'An item within a Tree hierarchy',
    comments: [
      'By default, renders a TreeItemDisplay',
      'A tree item is identified by having data-value and role="treeitem" properties',
      makeExtendsComment('HTMLDivElement')
    ],
    props: [
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the item is disabled.'
      },
      {
        name: 'text',
        type: 'string | undefined',
        default: 'undefined',
        comment: 'The text for the item. Not used when either the item or label slots are filled.'
      },
      {
        name: 'value',
        type: 'string',
        default: 'undefined', // Since `value` does not have a default in the code, it's technically required. Marking as "undefined" for consistency in structure.
        comment: 'The value uniquely identifying this item within the tree.'
      },
      commonProps.variant
    ],
    methods: [
      {
        name: 'collapse',
        comment: 'Collapses the current item.'
      },
      {
        name: 'expand',
        comment: 'Expands the current item.'
      },
      {
        name: 'select',
        comment: 'Selects the current item.'
      },
      {
        name: 'selectParent',
        comment: 'Selects the parent of the current item.'
      },
      {
        name: 'selectPrevious',
        comment: 'Selects the previous item relative to the current item.'
      },
      {
        name: 'selectNext',
        comment: 'Selects the next item relative to the current item.'
      },
      {
        name: 'toggleExpanded',
        comment: 'Toggles the expanded state of the current item.'
      }
    ],
    anatomy: `<div class="sterling-tree-item">
  <div class="item">
    <slot name="item" {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant}>
      <TreeItemDisplay>
        <slot name="label" {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant}
          >{text || value}
        </slot>
      </TreeItemDisplay>
    </slot>
  </div>
  <div class="children">
    <slot {depth} {disabled} {selected} {value} {variant} />
  </div>
</div>`,
    usage: TreeItemPlayground
  },
  treeitemdisplay: {
    name: 'TreeItemDisplay',
    description: 'The default content for a TreeItem in a Tree',
    comments: [makeExtendsComment('HTMLDivElement')],
    props: [
      {
        name: 'depth',
        type: 'number',
        default: '0',
        comment: 'The depth of the item in the tree.'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the item is disabled.'
      },
      {
        name: 'expanded',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the item is expanded.'
      },
      {
        name: 'hasChildren',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the item has children.'
      },
      {
        name: 'selected',
        type: 'boolean',
        default: 'false',
        comment: 'When true, the item is selected.'
      },
      {
        name: 'value',
        type: 'string',
        comment: 'The value uniquely identifying this item within the tree.'
      },
      commonProps.variant
    ],
    anatomy: `<div class="sterling-tree-item-display">
  <TreeChevron {expanded} {hasChildren} {variant} />
  <slot {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant} />
</div>`,
    usage: TreeItemDisplayPlayground
  }
};
