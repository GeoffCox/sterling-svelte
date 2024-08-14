# Changelog

## 1.0.12

- Bug: Callout applied drop-shadow to arrow from the code based on calculate placement. Drop shadow should be done from CSS. Fix: Removed to allow CSS to style drop shadow. Updated Callout to apply calculated placement classes.
- Bug: Dropdown did not apply using-keyboard or open classes to the root. Fix: Added classes.
- Feature: Separated disabled styles in Sterling Theme CSS files.
- Bug: TreeItemDisplay missing colorful variant in Sterling Theme. Fix: Added variant.
- Bug: Color sliders using disabled hatch angle var causing tight coupling. Fix: Removed var usage.

## 1.0.11

- Bug: Input showed disabled state when composed. Fix: Updated CSS.
- Bug: Default placement for Callout, Popover, and Tooltip was 'bottom-start'. Fix: Updated to 'top-start'.
- Bug: MenuButton callers had no control of Popover placement. Fix: Added popoverPlacement to MenuButton to forward to Popover.
- Bug: ColorPicker did not pass variant to Dropdown. Fix: Added variant parameter.
- Bug: MenuItemDisplay disabled style covered entire page. Fix: Added position:relative to base class.
- Bug: @ctrl/tinycolor export default was used causing issues when using the library from some sandbox sites. Fix: Updated to import TinyColor rather than default. Updated to latest version.
- Bug: Dialog did not correctly update return value for form submission. Fix: Set returnValue before close animation. Awaited tick() for state update.
- Bug: HslColorSliders defaulted to a middle random color. Fix: Updated defaults for HslColorSliders to be zeroed.
- Bug: Slider thumb disappears when disabled and vertical. Fix: Adjusted CSS positioning.
- Feature: Added valueVariant and sliderVariant props to ColorPicker to pass to variants to children.
- Bug: TextArea allowed resize to be vertical or both when autoHeight is set. Fix: Correct resize when autoHeight is set.
- Feature: Added text-underline variant to Link in Sterling Theme to support text-decoration: underline style.
- Feature: Added switch background fill in Sterling Theme when checked to improve state visibility.

## 1.0.10

- Bug: Packaging exports missing. Fix: Svelte file pattern added to exports.

## 1.0.9

- Bug: Packaging exports missing. Fix: CSS file pattern added to exports.

## 1.0.8

- Bug: Packaging broken with new Svelte updates. Updates to svelte versions and tsconfig caused creation of a dist folder starting with 1.0.6. This caused problems including the default CSS. Fix: Added outdir to fix the issue.

## 1.0.7

- Bug: Callout, Popover, and Menu height set to fit-content causes stretch behavior in Safari. Fix: Changed to auto.
- Bug: Dialog did not allow Popover and Callout to appear above. Fix: Updated portaling to support dialog as portal host through context.

## 1.0.6

- Bug: Vertical Tab justification defaulted to flex-end and should be flex-start. Fix: default changed to flex-start.
- Bug: List home/end keys weren't working because of introduction of intermediate container element to properly scroll. Fix: Updated query selectors for first and last list items.
- Bug: List arrow keys weren't working when selectedValue set to empty string. Fix: Updated conditionals in key handler.
- Bug: Dialog footer justified footer content as flex-end in default styles which is too opinionated. Fix: Removed flex styling from footer.
- Bug: Label text had unnecessary padding. Fix: Removed the padding.

## 1.0.5

- Bug: Radio and Switch top-level dismissing checked class. Fix: Prevented styling above the input.
- Bug: Checkbox, Input,Radio, and Switch top-level divs need using-keyboard class. This allows for focus-within applied like focus-visible when the intrinsic input is focused. Fix: Added using-keybord
- Bug: Tab content text aligment in vertical layout should not be set. Fix: Removed

## 1.0.4

- Bug: Checkbox top-level div missing checked class. Fix: Prevented styling above the input.
- Bug: Label MutationObserver creation was not in onMount. Caused an error if used before parent component mounted. Fix: Moved to onMount.
- Bug: Callout referenced document rather than globalThis.document. Caused an error if used before parent component mounted. Fix: Added globalThis prefix.
- Bug: Popover referenced document rather than globalThis.document. Caused an error if used before parent component mounted. Fix: Added globalThis prefix.
- Bug: prefersColorSchemeDark mediaQuery subscriptions not within onMount. Caused an error if used before parent component was mounted. Fix: Moved to onMount
- Bug: prefereReducedMotion mediaQuery subscriptions not within onMount. Caused an error if used before parent component was mounted. Fix: Moved to onMount
- Bug: usingKeyboard keyborg subscriptions not within onMount. Caused an error if used before parent component was mounted. Fix: Moved to onMount

## 1.0.3

- Bug: Dropdown and Select missing an icon slot to allow customization within the button. Fix: Added icon slot
- Bug: Dropdown rendering value div was not conditional on the value slot. Fix: Made conditional
- Bug: Popover and Callout created ResizeObserver before mount causing a ResizeObserver undefined error. Fix: Moved to onMount
- Feature: Added menuVariant to MenuButton to provide style customization.
- Feature: Added listVariant to Select to provide style customization.
- Bug: sterling.css Input styles used .label instead of .sterling-input.label. Fix: Updated CSS

## 1.0.2

(Not published)

## 1.0.1

- Bug: Dialog.svelte inadvertly imported sterling.css. Fix: Removed import
