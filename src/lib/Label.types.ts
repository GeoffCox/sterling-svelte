import type { Snippet } from 'svelte';
import type { HTMLLabelAttributes } from 'svelte/elements';

export type LabelValidationResult = {
  valid: boolean;
  validationClass?: string;
  validationMessage?: Snippet | string;
};

export type LabelValidationCallback = (
  validity: ValidityState,
  validationMessage: string
) => LabelValidationResult | undefined;

export type LabelProps = HTMLLabelAttributes & {
  formValidation?: boolean | null;
  forwardClick?: boolean | null;
  message?: Snippet | string;
  onValidation?: LabelValidationCallback;
  required?: boolean | null;
  requiredIndicator?: Snippet | string;
  requiredReason?: Snippet | string;
  text?: Snippet | string;
};
