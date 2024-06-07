# Changelog

## 1.0.8

- Fix packaging. Updates to svelte versions and tsconfig caused creation of a dist folder starting with 1.0.6. This caused problems including the default CSS. Added outdir to fix the issue.

## 1.0.7

- Fix: Callout, Popover, and Menu height set to fit-content causes stretch behavior in Safari. Changed to auto.
- Fix: Dialog did not allow Popover and Callout to appear above. Updated portaling to support dialog as portal host through context.

## 1.0.6

- Fix: Vertical Tab justification defaulted to flex-end and should be flex-start.
- Fix: List home/end keys weren't working because of introduction of intermediate container element to properly scroll. Updated query selectors for first and last list items.
- Fix: List arrow keys weren't working when selectedValue set to empty string. Updated conditionals in key handler.
- Fix: Dialog footer justified footer content as flex-end in default styles which is too opinionated. Removed flex styling from footer.
- Fix: Label text had unnecessary padding. Removed the padding.

## 1.0.5

- Fix: Radio and Switch top-level dismissing checked class. Prevented styling above the input.
- Fix: Checkbox, Input,Radio, and Switch top-level divs need using-keyboard class. This allows for focus-within applied like focus-visible when the intrinsic input is focused.
- Fix: Removed Tab content text aligment in vertical layout. No longer needed.

## 1.0.4

- Fix: Checkbox top-level div missing checked class. Prevented styling above the input.
- Fix: Label MutationObserver creation was not in onMount. Caused an error if used before parent component mounted.
- Fix: Callout referenced document rather than globalThis.document. Caused an error if used before parent component mounted.
- Fix: Popover referenced document rather than globalThis.document. Caused an error if used before parent component mounted.
- Fix: prefersColorSchemeDark mediaQuery subscriptions not within onMount. Caused an error if used before parent component was mounted.
- Fix: prefereReducedMotion mediaQuery subscriptions not within onMount. Caused an error if used before parent component was mounted.
- Fix: usingKeyboard keyborg subscriptions not within onMount. Caused an error if used before parent component was mounted.

## 1.0.3

- Fix: Dropdown and Select missing an icon slot to allow customization within the button.
- Fix: Dropdown rendering value div was not conditional on the value slot.
- Fix: Popover and Callout created ResizeObserver before mount causing a ResizeObserver undefined error.
- Feature: Added menuVariant to MenuButton to provide style customization.
- Feature: Added listVariant to Select to provide style customization.
- Fix: sterling.css Input styles used .label instead of .sterling-input.label .

## 1.0.2

(Not published)

## 1.0.1

- Fix: Dialog.svelte inadvertly imported sterling.css.
