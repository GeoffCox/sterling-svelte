import type { Theme } from './types';
import { blueColors, lightStatusColors, neutralColors } from './colors';

export const lightTheme: Theme = {
  // ----- Default ---- //

  // ----- Disabled ---- //

  // ----- Common (18) ---- //
  '--stsv-Common__background-color': neutralColors.color12,
  '--stsv-Common__border-color': neutralColors.color5,
  '--stsv-Common__border-radius': '0',
  '--stsv-Common__border-style': 'solid',
  '--stsv-Common__border-width': '2px',
  '--stsv-Common__color': neutralColors.color2,

  '--stsv-Common__color--secondary': neutralColors.color6,
  '--stsv-Common__color--tertiary': neutralColors.color8,

  // hover
  '--stsv-Common__background-color--hover': neutralColors.color12,
  '--stsv-Common__border-color--hover': neutralColors.color4,
  '--stsv-Common__color--hover': neutralColors.color2,

  // focus
  '--stsv-Common__background-color--focus': neutralColors.color10,
  '--stsv-Common__border-color--focus': neutralColors.color4,
  '--stsv-Common__color--focus': neutralColors.color2,

  // active
  '--stsv-Common__background-color--active': neutralColors.color12,
  '--stsv-Common__border-color--active': neutralColors.color3,
  '--stsv-Common__color--active': neutralColors.color2,

  // selected
  '--stsv-Common__background-color--selected': neutralColors.color12,
  '--stsv-Common__border-color--selected': neutralColors.color3,
  '--stsv-Common__color--selected': neutralColors.color2,

  // outline
  '--stsv-Common__outline-color': neutralColors.color2,
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
  '--stsv-Common__background-color--disabled': neutralColors.color10,
  '--stsv-Common__border-color--disabled': neutralColors.color7,
  '--stsv-Common__color--disabled': neutralColors.color7,

  // ----- Common--colorful (15) ---- //
  '--stsv-Common--colorful__background-color': blueColors.color12,
  '--stsv-Common--colorful__border-color': blueColors.color4,
  '--stsv-Common--colorful__color': blueColors.color3,

  // hover
  '--stsv-Common--colorful__background-color--hover': blueColors.color12,
  '--stsv-Common--colorful__border-color--hover': blueColors.color5,
  '--stsv-Common--colorful__color--hover': blueColors.color4,

  // focus
  '--stsv-Common--colorful__background-color--focus': blueColors.color12,
  '--stsv-Common--colorful__border-color--focus': blueColors.color5,
  '--stsv-Common--colorful__color--focus': blueColors.color4,

  // active
  '--stsv-Common--colorful__background-color--active': blueColors.color12,
  '--stsv-Common--colorful__border-color--active': blueColors.color3,
  '--stsv-Common--colorful__color--active': blueColors.color2,

  // selected
  '--stsv-Common--colorful__background-color--selected': blueColors.color12,
  '--stsv-Common--colorful__border-color--selected': blueColors.color3,
  '--stsv-Common--colorful__color--selected': blueColors.color2,

  // ----- Layer ---- //
  '--stsv-Layer__background-color--1': neutralColors.color11,
  '--stsv-Layer__color--1': neutralColors.color2,

  '--stsv-Layer__background-color--2': neutralColors.color10,
  '--stsv-Layer__color--2': neutralColors.color2,

  '--stsv-Layer__background-color--3': neutralColors.color9,
  '--stsv-Layer__color--3': neutralColors.color2,

  // ----- Button (15) ----- //

  '--stsv-Button__background-color': neutralColors.color10,
  '--stsv-Button__border-color': neutralColors.color5,
  '--stsv-Button__border-radius': '8px',
  '--stsv-Button__border-style': 'solid',
  '--stsv-Button__border-width': '2px',
  '--stsv-Button__color': neutralColors.color2,

  // hover
  '--stsv-Button__background-color--hover': neutralColors.color9,
  '--stsv-Button__border-color--hover': neutralColors.color4,
  '--stsv-Button__color--hover': neutralColors.color2,

  // focus
  '--stsv-Button__background-color--focus': neutralColors.color9,
  '--stsv-Button__border-color--focus': neutralColors.color4,
  '--stsv-Button__color--focus': neutralColors.color2,

  // active
  '--stsv-Button__background-color--active': neutralColors.color8,
  '--stsv-Button__border-color--active': neutralColors.color3,
  '--stsv-Button__color--active': neutralColors.color1,

  // ----- Button--colorful (12) ---- //

  '--stsv-Button--colorful__background-color': blueColors.color6,
  '--stsv-Button--colorful__border-color': blueColors.color4,
  '--stsv-Button--colorful__color': blueColors.color11,

  // hover
  '--stsv-Button--colorful__background-color--hover': blueColors.color7,
  '--stsv-Button--colorful__border-color--hover': blueColors.color5,
  '--stsv-Button--colorful__color--hover': blueColors.color11,

  // focus
  '--stsv-Button--colorful__background-color--focus': blueColors.color7,
  '--stsv-Button--colorful__border-color--focus': blueColors.color5,
  '--stsv-Button--colorful__color--focus': blueColors.color11,

  // active
  '--stsv-Button--colorful__background-color--active': blueColors.color5,
  '--stsv-Button--colorful__border-color--active': blueColors.color3,
  '--stsv-Button--colorful__color--active': blueColors.color12,

  // ----- Input (15) ----- //
  '--stsv-Input__background-color': neutralColors.color11,
  '--stsv-Input__border-color': neutralColors.color5,
  '--stsv-Input__border-radius': '3px',
  '--stsv-Input__border-style': 'solid',
  '--stsv-Input__border-width': '2px',
  '--stsv-Input__color': neutralColors.color2,

  // hover
  '--stsv-Input__background-color--hover': neutralColors.color12,
  '--stsv-Input__border-color--hover': neutralColors.color4,
  '--stsv-Input__color--hover': neutralColors.color2,

  // focus
  '--stsv-Input__background-color--focus': neutralColors.color12,
  '--stsv-Input__border-color--focus': neutralColors.color4,
  '--stsv-Input__color--focus': neutralColors.color2,

  // selected
  '--stsv-Input__background-color--selected': neutralColors.color9,
  '--stsv-Input__border-color--selected': neutralColors.color3,
  '--stsv-Input__color--selected': neutralColors.color2,

  // ----- Input--colorful (12) ---- //

  '--stsv-Input--colorful__background-color': blueColors.color11,
  '--stsv-Input--colorful__border-color': blueColors.color4,
  '--stsv-Input--colorful__color': blueColors.color2,

  // hover
  '--stsv-Input--colorful__background-color--hover': blueColors.color12,
  '--stsv-Input--colorful__border-color--hover': blueColors.color5,
  '--stsv-Input--colorful__color--hover': blueColors.color2,

  // focus
  '--stsv-Input--colorful__background-color--focus': blueColors.color12,
  '--stsv-Input--colorful__border-color--focus': blueColors.color5,
  '--stsv-Input--colorful__color--focus': blueColors.color2,

  // selected
  '--stsv-Input--colorful__background-color--selected': blueColors.color9,
  '--stsv-Input--colorful__border-color--selected': blueColors.color3,
  '--stsv-Input--colorful__color--selected': blueColors.color2,

  // ----- Display (6) ----- //
  '--stsv-Display__background-color': neutralColors.color9,
  '--stsv-Display__border-color': neutralColors.color4,
  '--stsv-Display__color': neutralColors.color2,

  '--stsv-Display__color--subtle': neutralColors.color5,
  '--stsv-Display__color--faint': neutralColors.color8,
  '--stsv-Display__color--disabled': neutralColors.color8,

  // ----- Semantic (12) ----- //
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
