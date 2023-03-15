import type { Theme } from '$lib';
import { darkStatusColors } from '$lib/theme/colors';

export const oceanBlues: Record<string, string> = {
  neutral0: 'hsl(209, 46%, 0%)',
  neutral10: 'hsl(209, 46%, 12%)',
  neutral15: 'hsl(209, 46%, 15%)',
  neutral20: 'hsl(209, 46%, 20%)',
  neutral30: 'hsl(209, 46%, 30%)',
  neutral45: 'hsl(209, 46%, 45%)',
  neutral60: 'hsl(209, 46%, 60%)',
  neutral75: 'hsl(209, 46%, 75%)',
  neutral85: 'hsl(209, 46%, 85%)',
  neutral92: 'hsl(209, 46%, 92%)',
  neutral96: 'hsl(209, 46%, 96%)',
  neutral98: 'hsl(209, 46%, 98%)',
  neutral100: 'hsl(209, 46%, 100%)'
};

export const oceanTheme: Theme = {
  // ----- Common ---- //
  '--stsv-Common__background-color': oceanBlues.neutral15,
  '--stsv-Common__border-color': oceanBlues.neutral92,
  '--stsv-Common__border-radius': '0',
  '--stsv-Common__border-style': 'solid',
  '--stsv-Common__border-width': '2px',
  '--stsv-Common__color': oceanBlues.neutral100,

  // hover
  '--stsv-Common__background-color--hover': oceanBlues.neutral15,
  '--stsv-Common__border-color--hover': oceanBlues.neutral96,
  '--stsv-Common__color--hover': oceanBlues.neutral100,

  // focus
  '--stsv-Common__background-color--focus': oceanBlues.neutral45,
  '--stsv-Common__border-color--focus': oceanBlues.neutral100,
  '--stsv-Common__color--focus': oceanBlues.neutral100,

  // outline
  '--stsv-Common__outline-color': oceanBlues.neutral100,
  '--stsv-Common__outline-offset': '0',
  '--stsv-Common__outline-style': 'solid',
  '--stsv-Common__outline-width': '2px',

  // disabled
  '--stsv-Common__background-color--disabled': oceanBlues.neutral45,
  '--stsv-Common__border-color--disabled': oceanBlues.neutral92,
  '--stsv-Common__color--disabled': oceanBlues.neutral92,

  // ----- Layer ---- //
  '--stsv-Layer__background-color--1': oceanBlues.neutral20,
  '--stsv-Layer__color--1': oceanBlues.neutral100,

  '--stsv-Layer__background-color--2': oceanBlues.neutral10,
  '--stsv-Layer__color--2': oceanBlues.neutral100,

  '--stsv-Layer__background-color--3': oceanBlues.neutral45,
  '--stsv-Layer__color--3': oceanBlues.neutral100,

  // ----- Button ----- //

  '--stsv-Button__background-color': oceanBlues.neutral45,
  '--stsv-Button__border-color': oceanBlues.neutral92,
  '--stsv-Button__border-radius': '8px',
  '--stsv-Button__border-style': 'solid',
  '--stsv-Button__border-width': '2px',
  '--stsv-Button__color': oceanBlues.neutral100,

  // hover
  '--stsv-Button__background-color--hover': oceanBlues.neutral45,
  '--stsv-Button__border-color--hover': oceanBlues.neutral96,
  '--stsv-Button__color--hover': oceanBlues.neutral100,

  // active
  '--stsv-Button__background-color--active': oceanBlues.neutral60,
  '--stsv-Button__border-color--active': oceanBlues.neutral98,
  '--stsv-Button__color--active': oceanBlues.neutral98,

  // focus
  '--stsv-Button__background-color--focus': oceanBlues.neutral45,
  '--stsv-Button__border-color--focus': oceanBlues.neutral100,
  '--stsv-Button__color--focus': oceanBlues.neutral100,

  // ----- Input ----- //
  '--stsv-Input__background-color': oceanBlues.neutral30,
  '--stsv-Input__border-color': oceanBlues.neutral92,
  '--stsv-Input__border-radius': '3px',
  '--stsv-Input__border-style': 'solid',
  '--stsv-Input__border-width': '2px',
  '--stsv-Input__color': oceanBlues.neutral100,

  // hover
  '--stsv-Input__background-color--hover': oceanBlues.neutral15,
  '--stsv-Input__border-color--hover': oceanBlues.neutral96,
  '--stsv-Input__color--hover': oceanBlues.neutral100,

  // focus
  '--stsv-Input__background-color--focus': oceanBlues.neutral15,
  '--stsv-Input__border-color--focus': oceanBlues.neutral100,
  '--stsv-Input__color--focus': oceanBlues.neutral100,

  // selected
  '--stsv-Input__background-color--selected': oceanBlues.neutral60,
  '--stsv-Input__border-color--selected': oceanBlues.neutral98,
  '--stsv-Input__color--selected': oceanBlues.neutral100,

  // ----- Display ----- //
  '--stsv-Display__background-color': oceanBlues.neutral20,
  '--stsv-Display__border-color': oceanBlues.neutral92,
  '--stsv-Display__color': oceanBlues.neutral100,

  '--stsv-Display__color--subtle': oceanBlues.neutral96,
  '--stsv-Display__color--faint': oceanBlues.neutral45,
  '--stsv-Display__color--disabled': oceanBlues.neutral45,

  '--stsv-Info__background-color': darkStatusColors.info.backgroundColor,
  '--stsv-Info__border-color': darkStatusColors.info.borderColor,
  '--stsv-Info__color': darkStatusColors.info.color,

  '--stsv-Success__background-color': darkStatusColors.success.backgroundColor,
  '--stsv-Success__border-color': darkStatusColors.success.borderColor,
  '--stsv-Success__color': darkStatusColors.success.color,

  '--stsv-Warning__background-color': darkStatusColors.warning.backgroundColor,
  '--stsv-Warning__border-color': darkStatusColors.warning.borderColor,
  '--stsv-Warning__color': darkStatusColors.warning.color,

  '--stsv-Error__background-color': darkStatusColors.error.backgroundColor,
  '--stsv-Error__border-color': darkStatusColors.error.borderColor,
  '--stsv-Error__color': darkStatusColors.error.color
};
