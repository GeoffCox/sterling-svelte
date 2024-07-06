import type { ComponentDoc, MemberDoc, PropDoc } from './types';
import ButtonPlayground from '../../_playgrounds/button/ButtonPlayground.svelte';
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

const commonProps: Record<string, PropDoc> = {
  variant: {
    name: 'variant',
    type: 'string',
    default: "''",
    comment: 'Additional class names to apply'
  }
};

const makeExtendsComment = (type: string) => {
  return `Includes ${type} props, event, and methods`;
};

export const componentDocs: Record<string, ComponentDoc> = {
  button: {
    name: 'Button',
    description: 'A styled HTML button',
    comments: [
      "The default type is 'button' rather than 'submit'",
      makeExtendsComment('HTMLButtonElement')
    ],
    props: [commonProps.variant],
    usage: ButtonPlayground,
    anatomy: `<button class="sterling-button">
  <slot {disabled} {variant} />
</button>`
  },
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
  }
};
