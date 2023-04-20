import type { Theme } from './types';
import { darkStatusColors, neutralColors } from './colors';

export const darkTheme: Theme = {
  // ----- Common ---- //
  '--stsv-Common__background-color': neutralColors.neutral15,
  '--stsv-Common__border-color': neutralColors.neutral92,
  '--stsv-Common__border-radius': '0',
  '--stsv-Common__border-style': 'solid',
  '--stsv-Common__border-width': '2px',
  '--stsv-Common__color': neutralColors.neutral100,

  // hover
  '--stsv-Common__background-color--hover': neutralColors.neutral15,
  '--stsv-Common__border-color--hover': neutralColors.neutral96,
  '--stsv-Common__color--hover': neutralColors.neutral100,

  // focus
  '--stsv-Common__background-color--focus': neutralColors.neutral45,
  '--stsv-Common__border-color--focus': neutralColors.neutral100,
  '--stsv-Common__color--focus': neutralColors.neutral100,

  // outline
  '--stsv-Common__outline-color': neutralColors.neutral100,
  '--stsv-Common__outline-offset': '0',
  '--stsv-Common__outline-style': 'solid',
  '--stsv-Common__outline-width': '2px',

  // disabled
  '--stsv-Common__background-color1--disabled': 'hsla(0, 0%, 0%, 20%)',
  '--stsv-Common__background-color2--disabled': `hsla(0, 0%, 100%, 20%)`,
  '--stsv-Disabled__background':
    'repeating-linear-gradient(' +
    '45deg,' +
    'var(--stsv-Common__background-color1--disabled),' +
    'var(--stsv-Common__background-color1--disabled) 3px,' +
    'var(--stsv-Common__background-color2--disabled) 3px,' +
    'var(--stsv-Common__background-color2--disabled) 6px' +
    ')',
  '--stsv-Common__background-color--disabled': neutralColors.neutral45,
  '--stsv-Common__border-color--disabled': neutralColors.neutral92,
  '--stsv-Common__color--disabled': neutralColors.neutral60,

  // ----- Layer ---- //
  '--stsv-Layer__background-color--1': neutralColors.neutral20,
  '--stsv-Layer__color--1': neutralColors.neutral100,

  '--stsv-Layer__background-color--2': neutralColors.neutral10,
  '--stsv-Layer__color--2': neutralColors.neutral100,

  '--stsv-Layer__background-color--3': neutralColors.neutral45,
  '--stsv-Layer__color--3': neutralColors.neutral100,

  // ----- Button ----- //

  '--stsv-Button__background-color': neutralColors.neutral30,
  '--stsv-Button__border-color': neutralColors.neutral92,
  '--stsv-Button__border-radius': '8px',
  '--stsv-Button__border-style': 'solid',
  '--stsv-Button__border-width': '2px',
  '--stsv-Button__color': neutralColors.neutral100,

  // hover
  '--stsv-Button__background-color--hover': neutralColors.neutral45,
  '--stsv-Button__border-color--hover': neutralColors.neutral96,
  '--stsv-Button__color--hover': neutralColors.neutral100,

  // active
  '--stsv-Button__background-color--active': neutralColors.neutral60,
  '--stsv-Button__border-color--active': neutralColors.neutral98,
  '--stsv-Button__color--active': neutralColors.neutral98,

  // focus
  '--stsv-Button__background-color--focus': neutralColors.neutral45,
  '--stsv-Button__border-color--focus': neutralColors.neutral100,
  '--stsv-Button__color--focus': neutralColors.neutral100,

  // ----- Input ----- //
  '--stsv-Input__background-color': neutralColors.neutral30,
  '--stsv-Input__border-color': neutralColors.neutral92,
  '--stsv-Input__border-radius': '3px',
  '--stsv-Input__border-style': 'solid',
  '--stsv-Input__border-width': '2px',
  '--stsv-Input__color': neutralColors.neutral100,

  // hover
  '--stsv-Input__background-color--hover': neutralColors.neutral15,
  '--stsv-Input__border-color--hover': neutralColors.neutral96,
  '--stsv-Input__color--hover': neutralColors.neutral100,

  // focus
  '--stsv-Input__background-color--focus': neutralColors.neutral15,
  '--stsv-Input__border-color--focus': neutralColors.neutral100,
  '--stsv-Input__color--focus': neutralColors.neutral100,

  // selected
  '--stsv-Input__background-color--selected': neutralColors.neutral60,
  '--stsv-Input__border-color--selected': neutralColors.neutral98,
  '--stsv-Input__color--selected': neutralColors.neutral100,

  // ----- Display ----- //
  '--stsv-Display__background-color': neutralColors.neutral20,
  '--stsv-Display__border-color': neutralColors.neutral92,
  '--stsv-Display__color': neutralColors.neutral80,

  '--stsv-Display__color--subtle': neutralColors.neutral96,
  '--stsv-Display__color--faint': neutralColors.neutral45,
  '--stsv-Display__color--disabled': neutralColors.neutral45,

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
