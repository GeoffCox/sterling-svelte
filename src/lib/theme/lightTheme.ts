import type { Theme } from './types';
import { lightStatusColors, neutralColors } from './colors';

export const lightTheme: Theme = {
  // ----- Common (18) ---- //
  '--stsv-Common__background-color': neutralColors.neutral100,
  '--stsv-Common__border-color': neutralColors.neutral60,
  '--stsv-Common__border-radius': '0',
  '--stsv-Common__border-style': 'solid',
  '--stsv-Common__border-width': '2px',
  '--stsv-Common__color': neutralColors.neutral15,

  // hover
  '--stsv-Common__background-color--hover': neutralColors.neutral100,
  '--stsv-Common__border-color--hover': neutralColors.neutral45,
  '--stsv-Common__color--hover': neutralColors.neutral15,

  // focus
  '--stsv-Common__background-color--focus': neutralColors.neutral96,
  '--stsv-Common__border-color--focus': neutralColors.neutral0,
  '--stsv-Common__color--focus': neutralColors.neutral15,

  // outline
  '--stsv-Common__outline-color': neutralColors.neutral15,
  '--stsv-Common__outline-offset': '0',
  '--stsv-Common__outline-style': 'solid',
  '--stsv-Common__outline-width': '2px',

  // disabled
  '--stsv-Common__background-color--disabled': neutralColors.neutral96,
  '--stsv-Common__border-color--disabled': neutralColors.neutral75,
  '--stsv-Common__color--disabled': neutralColors.neutral75,

  // ----- Layer ---- //
  '--stsv-Layer__background-color--1': neutralColors.neutral98,
  '--stsv-Layer__color--1': neutralColors.neutral15,

  '--stsv-Layer__background-color--2': neutralColors.neutral96,
  '--stsv-Layer__color--2': neutralColors.neutral15,

  '--stsv-Layer__background-color--3': neutralColors.neutral92,
  '--stsv-Layer__color--3': neutralColors.neutral15,

  // ----- Button (15) ----- //

  '--stsv-Button__background-color': neutralColors.neutral96,
  '--stsv-Button__border-color': neutralColors.neutral60,
  '--stsv-Button__border-radius': '8px',
  '--stsv-Button__border-style': 'solid',
  '--stsv-Button__border-width': '2px',
  '--stsv-Button__color': neutralColors.neutral15,

  // hover
  '--stsv-Button__background-color--hover': neutralColors.neutral96,
  '--stsv-Button__border-color--hover': neutralColors.neutral45,
  '--stsv-Button__color--hover': neutralColors.neutral15,

  // active
  '--stsv-Button__background-color--active': neutralColors.neutral92,
  '--stsv-Button__border-color--active': neutralColors.neutral30,
  '--stsv-Button__color--active': neutralColors.neutral30,

  // focus
  '--stsv-Button__background-color--focus': neutralColors.neutral96,
  '--stsv-Button__border-color--focus': neutralColors.neutral0,
  '--stsv-Button__color--focus': neutralColors.neutral15,

  // ----- Input (15) ----- //
  '--stsv-Input__background-color': neutralColors.neutral98,
  '--stsv-Input__border-color': neutralColors.neutral60,
  '--stsv-Input__border-radius': '3px',
  '--stsv-Input__border-style': 'solid',
  '--stsv-Input__border-width': '2px',
  '--stsv-Input__color': neutralColors.neutral15,

  // hover
  '--stsv-Input__background-color--hover': neutralColors.neutral100,
  '--stsv-Input__border-color--hover': neutralColors.neutral45,
  '--stsv-Input__color--hover': neutralColors.neutral15,

  // focus
  '--stsv-Input__background-color--focus': neutralColors.neutral100,
  '--stsv-Input__border-color--focus': neutralColors.neutral15,
  '--stsv-Input__color--focus': neutralColors.neutral15,

  // selected
  '--stsv-Input__background-color--selected': neutralColors.neutral92,
  '--stsv-Input__border-color--selected': neutralColors.neutral30,
  '--stsv-Input__color--selected': neutralColors.neutral15,

  // ----- Display ----- //
  '--stsv-Display__background-color': neutralColors.neutral92,
  '--stsv-Display__border-color': neutralColors.neutral30,
  '--stsv-Display__color': neutralColors.neutral15,

  '--stsv-Display__color--subtle': neutralColors.neutral45,
  '--stsv-Display__color--faint': neutralColors.neutral85,
  '--stsv-Display__color--disabled': neutralColors.neutral85,

  '--stsv-Info__background-color': lightStatusColors.info.backgroundColor,
  '--stsv-Info__border-color': lightStatusColors.info.borderColor,
  '--stsv-Info__color': lightStatusColors.info.color,

  '--stsv-Success__background-color': lightStatusColors.success.backgroundColor,
  '--stsv-Success__border-color': lightStatusColors.success.borderColor,
  '--stsv-Success__color': lightStatusColors.success.color,

  '--stsv-Warning__background-color': lightStatusColors.warning.backgroundColor,
  '--stsv-Warning__border-color': lightStatusColors.warning.borderColor,
  '--stsv-Warning__color': lightStatusColors.warning.color,

  '--stsv-Error__background-color': lightStatusColors.error.backgroundColor,
  '--stsv-Error__border-color': lightStatusColors.error.borderColor,
  '--stsv-Error__color': lightStatusColors.error.color
};
