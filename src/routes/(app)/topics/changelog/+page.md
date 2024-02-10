# Changelog

## 1.0.5

- Fix: Radio and Switch top-level dis missing checked class. Prevented styling above the input.
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
