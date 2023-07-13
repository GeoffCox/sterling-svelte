import type { Theme } from '$lib';
import { darkStatusColors } from '$lib/theme/colors';

export const oceanBlues: Record<string, string> = {
  color0: 'hsl(209, 46%, 0%)',
  color1: 'hsl(209, 46%, 12%)',
  color2: 'hsl(209, 46%, 15%)',
  color3: 'hsl(209, 46%, 20%)',
  color4: 'hsl(209, 46%, 30%)',
  color5: 'hsl(209, 46%, 45%)',
  color6: 'hsl(209, 46%, 60%)',
  color7: 'hsl(209, 46%, 75%)',
  color8: 'hsl(209, 46%, 85%)',
  color9: 'hsl(209, 46%, 92%)',
  color10: 'hsl(209, 46%, 96%)',
  color11: 'hsl(209, 46%, 98%)',
  color12: 'hsl(209, 46%, 100%)'
};

export const oceanTheme: Theme = {
  // ----- Common ---- //
  'stsv-common__background-color': oceanBlues.color2,
  'stsv-common__border-color': oceanBlues.color9,
  'stsv-common__border-radius': '0',
  'stsv-common__border-style': 'solid',
  'stsv-common__border-width': '2px',
  'stsv-common__color': oceanBlues.color12,

  // outline
  'stsv-common__outline-color': oceanBlues.color12,
  'stsv-common__outline-offset': '0',
  'stsv-common__outline-style': 'solid',
  'stsv-common__outline-width': '2px',

  // disabled
  'stsv-common--disabled__stripe-color': 'hsla(0, 0%, 0%, 0.2)',
  'stsv-common--disabled__stripe-color--alt': `hsla(0, 0%, 100%, 0.2)`,
  'stsv-common--disabled__stripe-angle': '135deg',
  'stsv-common--disabled__stripe-width': '3px',

  // ----- Button ----- //

  'stsv-button__background-color': oceanBlues.color5,
  'stsv-button__border-color': oceanBlues.color9,
  'stsv-button__border-radius': '8px',
  'stsv-button__border-style': 'solid',
  'stsv-button__border-width': '2px',
  'stsv-button__color': oceanBlues.color12,

  // hover
  'stsv-button__background-color--hover': oceanBlues.color5,
  'stsv-button__border-color--hover': oceanBlues.color10,
  'stsv-button__color--hover': oceanBlues.color12,

  // active
  'stsv-button__background-color--active': oceanBlues.color6,
  'stsv-button__border-color--active': oceanBlues.color11,
  'stsv-button__color--active': oceanBlues.color11,

  // focus
  'stsv-button__background-color--focus': oceanBlues.color5,
  'stsv-button__border-color--focus': oceanBlues.color12,
  'stsv-button__color--focus': oceanBlues.color12,

  // ----- Input ----- //
  'stsv-input__background-color': oceanBlues.color4,
  'stsv-input__border-color': oceanBlues.color9,
  'stsv-input__border-radius': '3px',
  'stsv-input__border-style': 'solid',
  'stsv-input__border-width': '2px',
  'stsv-input__color': oceanBlues.color12,

  // hover
  'stsv-input__background-color--hover': oceanBlues.color2,
  'stsv-input__border-color--hover': oceanBlues.color10,
  'stsv-input__color--hover': oceanBlues.color12,

  // focus
  'stsv-input__background-color--focus': oceanBlues.color2,
  'stsv-input__border-color--focus': oceanBlues.color12,
  'stsv-input__color--focus': oceanBlues.color12,

  // selected
  'stsv-input__background-color--selected': oceanBlues.color6,
  'stsv-input__border-color--selected': oceanBlues.color11,
  'stsv-input__color--selected': oceanBlues.color12,

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

  'stsv-status--danger__background-color': darkStatusColors.error.backgroundColor,
  'stsv-status--danger__border-color': darkStatusColors.error.borderColor,
  'stsv-status--danger__color': darkStatusColors.error.color
};
