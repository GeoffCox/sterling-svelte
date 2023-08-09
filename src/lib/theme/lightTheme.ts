import type { Theme } from './types';
import { blueColors, lightStatusColors, neutralColors } from './colors';

export const lightTheme: Theme = {
  // ----- Common ---- //
  'stsv-common__background-color': neutralColors.color12,
  'stsv-common__border-color': neutralColors.color5,
  'stsv-common__border-radius': '0',
  'stsv-common__border-style': 'solid',
  'stsv-common__border-width': '2px',
  'stsv-common__color': neutralColors.color2,

  'stsv-common__background-color--secondary': neutralColors.color9,
  'stsv-common__color--secondary': neutralColors.color5,

  'stsv-common__background-color--subtle': neutralColors.color10,
  'stsv-common__color--subtle': neutralColors.color7,

  'stsv-common__background-color--faint': neutralColors.color11,
  'stsv-common__color--faint': neutralColors.color9,

  // outline
  'stsv-common__outline-color': neutralColors.color2,
  'stsv-common__outline-offset': '0',
  'stsv-common__outline-style': 'solid',
  'stsv-common__outline-width': '2px',

  // disabled
  'stsv-common--disabled__stripe-color': 'hsla(0, 0%, 0%, 0.2)',
  'stsv-common--disabled__stripe-color--alt': `hsla(0, 0%, 100%, 0.2)`,
  'stsv-common--disabled__stripe-angle': '135deg',
  'stsv-common--disabled__stripe-width': '3px',

  // shadows
  'stsv-common__box-shadow': '2px 2px 4px 0px rgba(0, 0, 0, 0.4)',
  'stsv-common__box-shadow--inset': `inset 1px 1px 2px 0px ${neutralColors.color5}`,

  // ----- Common--colorful ---- //
  'stsv-common--colorful__background-color': blueColors.color12,
  'stsv-common--colorful__border-color': blueColors.color4,
  'stsv-common--colorful__color': blueColors.color3,

  'stsv-common--colorful__background-color--secondary': blueColors.color9,
  'stsv-common--colorful__color--secondary': blueColors.color6,

  'stsv-common--colorful__background-color--subtle': blueColors.color10,
  'stsv-common--colorful__color--subtle': blueColors.color8,

  'stsv-common--colorful__background-color--faint': blueColors.color11,
  'stsv-common--colorful__color--faint': blueColors.color9,

  // ----- Button ----- //

  'stsv-button__background-color': neutralColors.color10,
  'stsv-button__border-color': neutralColors.color5,
  'stsv-button__border-radius': '8px',
  'stsv-button__border-style': 'solid',
  'stsv-button__border-width': '2px',
  'stsv-button__color': neutralColors.color2,

  // hover
  'stsv-button__background-color--hover': neutralColors.color9,
  'stsv-button__border-color--hover': neutralColors.color4,
  'stsv-button__color--hover': neutralColors.color2,

  // focus
  'stsv-button__background-color--focus': neutralColors.color9,
  'stsv-button__border-color--focus': neutralColors.color4,
  'stsv-button__color--focus': neutralColors.color2,

  // active
  'stsv-button__background-color--active': neutralColors.color8,
  'stsv-button__border-color--active': neutralColors.color3,
  'stsv-button__color--active': neutralColors.color1,

  // ----- Button--colorful ---- //

  'stsv-button--colorful__background-color': blueColors.color6,
  'stsv-button--colorful__border-color': blueColors.color4,
  'stsv-button--colorful__color': blueColors.color11,

  // hover
  'stsv-button--colorful__background-color--hover': blueColors.color7,
  'stsv-button--colorful__border-color--hover': blueColors.color5,
  'stsv-button--colorful__color--hover': blueColors.color11,

  // focus
  'stsv-button--colorful__background-color--focus': blueColors.color7,
  'stsv-button--colorful__border-color--focus': blueColors.color5,
  'stsv-button--colorful__color--focus': blueColors.color11,

  // active
  'stsv-button--colorful__background-color--active': blueColors.color5,
  'stsv-button--colorful__border-color--active': blueColors.color3,
  'stsv-button--colorful__color--active': blueColors.color12,

  // ----- Input ----- //
  'stsv-input__background-color': neutralColors.color11,
  'stsv-input__border-color': neutralColors.color6,
  'stsv-input__border-radius': '3px',
  'stsv-input__border-style': 'solid',
  'stsv-input__border-width': '2px',
  'stsv-input__color': neutralColors.color2,

  // hover
  'stsv-input__background-color--hover': neutralColors.color10,
  'stsv-input__border-color--hover': neutralColors.color4,
  'stsv-input__color--hover': neutralColors.color2,

  // focus
  'stsv-input__background-color--focus': neutralColors.color9,
  'stsv-input__border-color--focus': neutralColors.color2,
  'stsv-input__color--focus': neutralColors.color2,

  // selected
  'stsv-input__background-color--selected': neutralColors.color8,
  'stsv-input__border-color--selected': neutralColors.color2,
  'stsv-input__color--selected': neutralColors.color2,

  // ----- Input--colorful ---- //

  'stsv-input--colorful__background-color': blueColors.color11,
  'stsv-input--colorful__border-color': blueColors.color4,
  'stsv-input--colorful__color': blueColors.color2,

  // hover
  'stsv-input--colorful__background-color--hover': blueColors.color10,
  'stsv-input--colorful__border-color--hover': blueColors.color5,
  'stsv-input--colorful__color--hover': blueColors.color2,

  // focus
  'stsv-input--colorful__background-color--focus': blueColors.color9,
  'stsv-input--colorful__border-color--focus': blueColors.color5,
  'stsv-input--colorful__color--focus': blueColors.color2,

  // selected
  'stsv-input--colorful__background-color--selected': blueColors.color8,
  'stsv-input--colorful__border-color--selected': blueColors.color3,
  'stsv-input--colorful__color--selected': blueColors.color2,

  // ----- Status ----- //
  'stsv-status--info__background-color': lightStatusColors.info.backgroundColor,
  'stsv-status--info__border-color': lightStatusColors.info.borderColor,
  'stsv-status--info__color': lightStatusColors.info.color,

  'stsv-status--success__background-color': lightStatusColors.success.backgroundColor,
  'stsv-status--success__border-color': lightStatusColors.success.borderColor,
  'stsv-status--success__color': lightStatusColors.success.color,

  'stsv-status--warning__background-color': lightStatusColors.warning.backgroundColor,
  'stsv-status--warning__border-color': lightStatusColors.warning.borderColor,
  'stsv-status--warning__color': lightStatusColors.warning.color,

  'stsv-status--danger__background-color': lightStatusColors.error.backgroundColor,
  'stsv-status--danger__border-color': lightStatusColors.error.borderColor,
  'stsv-status--danger__color': lightStatusColors.error.color
};
