import type { Theme } from './types';
import { blueColors, darkStatusColors, neutralColors } from './colors';

export const darkTheme: Theme = {
  // ----- Common ---- //
  'stsv-common__background-color': neutralColors.color2,
  'stsv-common__border-color': neutralColors.color9,
  'stsv-common__border-radius': '0',
  'stsv-common__border-style': 'solid',
  'stsv-common__border-width': '2px',
  'stsv-common__color': neutralColors.color12,

  'stsv-common__background-color--secondary': neutralColors.color3,
  'stsv-common__color--secondary': neutralColors.color6,

  'stsv-common__background-color--subtle': neutralColors.color2,
  'stsv-common__color--subtle': neutralColors.color5,

  'stsv-common__background-color--faint': neutralColors.color1,
  'stsv-common__color--faint': neutralColors.color4,

  // outline
  'stsv-common__outline-color': neutralColors.color12,
  'stsv-common__outline-offset': '0',
  'stsv-common__outline-style': 'solid',
  'stsv-common__outline-width': '2px',

  // disabled
  'stsv-common--disabled__stripe-color': 'hsla(0, 0%, 0%, 0.2)',
  'stsv-common--disabled__stripe-color--alt': `hsla(0, 0%, 100%, 0.2)`,
  'stsv-common--disabled__stripe-angle': '135deg',
  'stsv-common--disabled__stripe-width': '3px',

  // ----- Common--colorful (15) ---- //
  'stsv-common--colorful__background-color': blueColors.color1,
  'stsv-common--colorful__border-color': blueColors.color8,
  'stsv-common--colorful__color': blueColors.color9,

  'stsv-common--colorful__background-color--secondary': blueColors.color3,
  'stsv-common--colorful__color--secondary': blueColors.color7,

  'stsv-common--colorful__background-color--subtle': blueColors.color2,
  'stsv-common--colorful__color--subtle': blueColors.color5,

  'stsv-common--colorful__background-color--faint': blueColors.color1,
  'stsv-common--colorful__color--faint': blueColors.color3,

  // ----- Button ----- //

  'stsv-button__background-color': neutralColors.color4,
  'stsv-button__border-color': neutralColors.color9,
  'stsv-button__border-radius': '8px',
  'stsv-button__border-style': 'solid',
  'stsv-button__border-width': '2px',
  'stsv-button__color': neutralColors.color12,

  // hover
  'stsv-button__background-color--hover': neutralColors.color5,
  'stsv-button__border-color--hover': neutralColors.color10,
  'stsv-button__color--hover': neutralColors.color12,

  // active
  'stsv-button__background-color--active': neutralColors.color6,
  'stsv-button__border-color--active': neutralColors.color11,
  'stsv-button__color--active': neutralColors.color11,

  // focus
  'stsv-button__background-color--focus': neutralColors.color5,
  'stsv-button__border-color--focus': neutralColors.color12,
  'stsv-button__color--focus': neutralColors.color12,

  // ----- Button--colorful (12) ---- //

  'stsv-button--colorful__background-color': blueColors.color5,
  'stsv-button--colorful__border-color': blueColors.color3,
  'stsv-button--colorful__color': blueColors.color11,

  // hover
  'stsv-button--colorful__background-color--hover': blueColors.color6,
  'stsv-button--colorful__border-color--hover': blueColors.color4,
  'stsv-button--colorful__color--hover': blueColors.color11,

  // focus
  'stsv-button--colorful__background-color--focus': blueColors.color6,
  'stsv-button--colorful__border-color--focus': blueColors.color4,
  'stsv-button--colorful__color--focus': blueColors.color11,

  // active
  'stsv-button--colorful__background-color--active': blueColors.color7,
  'stsv-button--colorful__border-color--active': blueColors.color5,
  'stsv-button--colorful__color--active': blueColors.color12,

  // ----- Input ----- //
  'stsv-input__background-color': neutralColors.color4,
  'stsv-input__border-color': neutralColors.color9,
  'stsv-input__border-radius': '3px',
  'stsv-input__border-style': 'solid',
  'stsv-input__border-width': '2px',
  'stsv-input__color': neutralColors.color12,

  // hover
  'stsv-input__background-color--hover': neutralColors.color2,
  'stsv-input__border-color--hover': neutralColors.color10,
  'stsv-input__color--hover': neutralColors.color12,

  // focus
  'stsv-input__background-color--focus': neutralColors.color2,
  'stsv-input__border-color--focus': neutralColors.color12,
  'stsv-input__color--focus': neutralColors.color12,

  // selected
  'stsv-input__background-color--selected': neutralColors.color6,
  'stsv-input__border-color--selected': neutralColors.color11,
  'stsv-input__color--selected': neutralColors.color12,

  // ----- Input--colorful (12) ---- //

  'stsv-input--colorful__background-color': blueColors.color4,
  'stsv-input--colorful__border-color': blueColors.color9,
  'stsv-input--colorful__color': blueColors.color12,

  // hover
  'stsv-input--colorful__background-color--hover': blueColors.color2,
  'stsv-input--colorful__border-color--hover': blueColors.color10,
  'stsv-input--colorful__color--hover': blueColors.color12,

  // focus
  'stsv-input--colorful__background-color--focus': blueColors.color2,
  'stsv-input--colorful__border-color--focus': blueColors.color10,
  'stsv-input--colorful__color--focus': blueColors.color12,

  // selected
  'stsv-input--colorful__background-color--selected': blueColors.color6,
  'stsv-input--colorful__border-color--selected': blueColors.color11,
  'stsv-input--colorful__color--selected': blueColors.color12,

  // ----- Status ----- //
  'stsv-status--info__background-color': darkStatusColors.info.backgroundColor,
  'stsv-status--info__border-color': darkStatusColors.info.borderColor,
  'stsv-status--info__color': darkStatusColors.info.color,

  'stsv-status--success__background-color': darkStatusColors.success.backgroundColor,
  'stsv-status--success__border-color': darkStatusColors.success.borderColor,
  'stsv-status--success__color': darkStatusColors.success.color,

  'stsv-status--warning__background-color': darkStatusColors.warning.backgroundColor,
  'stsv-status--warning__border-color': darkStatusColors.warning.borderColor,
  'stsv-status--warning__color': darkStatusColors.warning.color,

  'stsv-status--error__background-color': darkStatusColors.error.backgroundColor,
  'stsv-status--error__border-color': darkStatusColors.error.borderColor,
  'stsv-status--error__color': darkStatusColors.error.color,

  // ----- Colorful (18) ---- //
  'stsv-Colorful__background-color': blueColors.color4,
  'stsv-Colorful__border-color': blueColors.color8,
  'stsv-Colorful__border-radius': '0',
  'stsv-Colorful__border-style': 'solid',
  'stsv-Colorful__border-width': '2px',
  'stsv-Colorful__color': blueColors.color11,

  // hover
  'stsv-Colorful__background-color--hover': blueColors.color5,
  'stsv-Colorful__border-color--hover': blueColors.color8,
  'stsv-Colorful__color--hover': blueColors.color11,

  // focus
  'stsv-Colorful__background-color--focus': blueColors.color5,
  'stsv-Colorful__border-color--focus': blueColors.color8,
  'stsv-Colorful__color--focus': blueColors.color11,

  // active
  'stsv-Colorful__background-color--active': blueColors.color7,
  'stsv-Colorful__border-color--active': blueColors.color9,
  'stsv-Colorful__color--active': blueColors.color12,

  // selected
  'stsv-Colorful__background-color--selected': neutralColors.color7,
  'stsv-Colorful__border-color--selected': neutralColors.color9,
  'stsv-Colorful__color--selected': neutralColors.color12
};
