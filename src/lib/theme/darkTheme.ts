import type { Theme } from './types';
import { blueColors, darkStatusColors, neutralColors } from './colors';

export const darkTheme: Theme = {
  // ----- Common ---- //
  '--stsv-Common__background-color': neutralColors.color2,
  '--stsv-Common__border-color': neutralColors.color9,
  '--stsv-Common__border-radius': '0',
  '--stsv-Common__border-style': 'solid',
  '--stsv-Common__border-width': '2px',
  '--stsv-Common__color': neutralColors.color12,

  '--stsv-Common__background-color--secondary': neutralColors.color3,
  '--stsv-Common__color--secondary': neutralColors.color6,

  '--stsv-Common__background-color--subtle': neutralColors.color2,
  '--stsv-Common__color--subtle': neutralColors.color5,

  '--stsv-Common__background-color--faint': neutralColors.color1,
  '--stsv-Common__color--faint': neutralColors.color4,

  // outline
  '--stsv-Common__outline-color': neutralColors.color12,
  '--stsv-Common__outline-offset': '0',
  '--stsv-Common__outline-style': 'solid',
  '--stsv-Common__outline-width': '2px',

  // disabled
  '--stsv-Common__background-color--disabled': neutralColors.color5,
  '--stsv-Common__border-color--disabled': neutralColors.color9,
  '--stsv-Common__color--disabled': neutralColors.color6,

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

  // ----- Common--colorful (15) ---- //
  '--stsv-Common--colorful__background-color': blueColors.color1,
  '--stsv-Common--colorful__border-color': blueColors.color8,
  '--stsv-Common--colorful__color': blueColors.color9,

  '--stsv-Common--colorful__background-color--secondary': blueColors.color3,
  '--stsv-Common--colorful__color--secondary': blueColors.color7,

  '--stsv-Common--colorful__background-color--subtle': blueColors.color2,
  '--stsv-Common--colorful__color--subtle': blueColors.color5,

  '--stsv-Common--colorful__background-color--faint': blueColors.color1,
  '--stsv-Common--colorful__color--faint': blueColors.color3,

  // ----- Button ----- //

  '--stsv-Button__background-color': neutralColors.color4,
  '--stsv-Button__border-color': neutralColors.color9,
  '--stsv-Button__border-radius': '8px',
  '--stsv-Button__border-style': 'solid',
  '--stsv-Button__border-width': '2px',
  '--stsv-Button__color': neutralColors.color12,

  // hover
  '--stsv-Button__background-color--hover': neutralColors.color5,
  '--stsv-Button__border-color--hover': neutralColors.color10,
  '--stsv-Button__color--hover': neutralColors.color12,

  // active
  '--stsv-Button__background-color--active': neutralColors.color6,
  '--stsv-Button__border-color--active': neutralColors.color11,
  '--stsv-Button__color--active': neutralColors.color11,

  // focus
  '--stsv-Button__background-color--focus': neutralColors.color5,
  '--stsv-Button__border-color--focus': neutralColors.color12,
  '--stsv-Button__color--focus': neutralColors.color12,

  // ----- Button--colorful (12) ---- //

  '--stsv-Button--colorful__background-color': blueColors.color5,
  '--stsv-Button--colorful__border-color': blueColors.color3,
  '--stsv-Button--colorful__color': blueColors.color11,

  // hover
  '--stsv-Button--colorful__background-color--hover': blueColors.color6,
  '--stsv-Button--colorful__border-color--hover': blueColors.color4,
  '--stsv-Button--colorful__color--hover': blueColors.color11,

  // focus
  '--stsv-Button--colorful__background-color--focus': blueColors.color6,
  '--stsv-Button--colorful__border-color--focus': blueColors.color4,
  '--stsv-Button--colorful__color--focus': blueColors.color11,

  // active
  '--stsv-Button--colorful__background-color--active': blueColors.color7,
  '--stsv-Button--colorful__border-color--active': blueColors.color5,
  '--stsv-Button--colorful__color--active': blueColors.color12,

  // ----- Input ----- //
  '--stsv-Input__background-color': neutralColors.color4,
  '--stsv-Input__border-color': neutralColors.color9,
  '--stsv-Input__border-radius': '3px',
  '--stsv-Input__border-style': 'solid',
  '--stsv-Input__border-width': '2px',
  '--stsv-Input__color': neutralColors.color12,

  // hover
  '--stsv-Input__background-color--hover': neutralColors.color2,
  '--stsv-Input__border-color--hover': neutralColors.color10,
  '--stsv-Input__color--hover': neutralColors.color12,

  // focus
  '--stsv-Input__background-color--focus': neutralColors.color2,
  '--stsv-Input__border-color--focus': neutralColors.color12,
  '--stsv-Input__color--focus': neutralColors.color12,

  // selected
  '--stsv-Input__background-color--selected': neutralColors.color6,
  '--stsv-Input__border-color--selected': neutralColors.color11,
  '--stsv-Input__color--selected': neutralColors.color12,

  // ----- Input--colorful (12) ---- //

  '--stsv-Input--colorful__background-color': blueColors.color4,
  '--stsv-Input--colorful__border-color': blueColors.color9,
  '--stsv-Input--colorful__color': blueColors.color12,

  // hover
  '--stsv-Input--colorful__background-color--hover': blueColors.color2,
  '--stsv-Input--colorful__border-color--hover': blueColors.color10,
  '--stsv-Input--colorful__color--hover': blueColors.color12,

  // focus
  '--stsv-Input--colorful__background-color--focus': blueColors.color2,
  '--stsv-Input--colorful__border-color--focus': blueColors.color10,
  '--stsv-Input--colorful__color--focus': blueColors.color12,

  // selected
  '--stsv-Input--colorful__background-color--selected': blueColors.color6,
  '--stsv-Input--colorful__border-color--selected': blueColors.color11,
  '--stsv-Input--colorful__color--selected': blueColors.color12,

  // ----- Status ----- //
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
  '--stsv-Error__color': darkStatusColors.error.color,

  // ----- Colorful (18) ---- //
  '--stsv-Colorful__background-color': blueColors.color4,
  '--stsv-Colorful__border-color': blueColors.color8,
  '--stsv-Colorful__border-radius': '0',
  '--stsv-Colorful__border-style': 'solid',
  '--stsv-Colorful__border-width': '2px',
  '--stsv-Colorful__color': blueColors.color11,

  // hover
  '--stsv-Colorful__background-color--hover': blueColors.color5,
  '--stsv-Colorful__border-color--hover': blueColors.color8,
  '--stsv-Colorful__color--hover': blueColors.color11,

  // focus
  '--stsv-Colorful__background-color--focus': blueColors.color5,
  '--stsv-Colorful__border-color--focus': blueColors.color8,
  '--stsv-Colorful__color--focus': blueColors.color11,

  // active
  '--stsv-Colorful__background-color--active': blueColors.color7,
  '--stsv-Colorful__border-color--active': blueColors.color9,
  '--stsv-Colorful__color--active': blueColors.color12,

  // selected
  '--stsv-Colorful__background-color--selected': neutralColors.color7,
  '--stsv-Colorful__border-color--selected': neutralColors.color9,
  '--stsv-Colorful__color--selected': neutralColors.color12
};
