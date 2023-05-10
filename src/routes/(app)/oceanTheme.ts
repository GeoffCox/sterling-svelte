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
  '--stsv-Common__background-color': oceanBlues.color2,
  '--stsv-Common__border-color': oceanBlues.color9,
  '--stsv-Common__border-radius': '0',
  '--stsv-Common__border-style': 'solid',
  '--stsv-Common__border-width': '2px',
  '--stsv-Common__color': oceanBlues.color12,

  // outline
  '--stsv-Common__outline-color': oceanBlues.color12,
  '--stsv-Common__outline-offset': '0',
  '--stsv-Common__outline-style': 'solid',
  '--stsv-Common__outline-width': '2px',

  // disabled
  '--stsv-Common__background-color--disabled': oceanBlues.color5,
  '--stsv-Common__border-color--disabled': oceanBlues.color9,
  '--stsv-Common__color--disabled': oceanBlues.color9,

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

  // ----- Button ----- //

  '--stsv-Button__background-color': oceanBlues.color5,
  '--stsv-Button__border-color': oceanBlues.color9,
  '--stsv-Button__border-radius': '8px',
  '--stsv-Button__border-style': 'solid',
  '--stsv-Button__border-width': '2px',
  '--stsv-Button__color': oceanBlues.color12,

  // hover
  '--stsv-Button__background-color--hover': oceanBlues.color5,
  '--stsv-Button__border-color--hover': oceanBlues.color10,
  '--stsv-Button__color--hover': oceanBlues.color12,

  // active
  '--stsv-Button__background-color--active': oceanBlues.color6,
  '--stsv-Button__border-color--active': oceanBlues.color11,
  '--stsv-Button__color--active': oceanBlues.color11,

  // focus
  '--stsv-Button__background-color--focus': oceanBlues.color5,
  '--stsv-Button__border-color--focus': oceanBlues.color12,
  '--stsv-Button__color--focus': oceanBlues.color12,

  // ----- Input ----- //
  '--stsv-Input__background-color': oceanBlues.color4,
  '--stsv-Input__border-color': oceanBlues.color9,
  '--stsv-Input__border-radius': '3px',
  '--stsv-Input__border-style': 'solid',
  '--stsv-Input__border-width': '2px',
  '--stsv-Input__color': oceanBlues.color12,

  // hover
  '--stsv-Input__background-color--hover': oceanBlues.color2,
  '--stsv-Input__border-color--hover': oceanBlues.color10,
  '--stsv-Input__color--hover': oceanBlues.color12,

  // focus
  '--stsv-Input__background-color--focus': oceanBlues.color2,
  '--stsv-Input__border-color--focus': oceanBlues.color12,
  '--stsv-Input__color--focus': oceanBlues.color12,

  // selected
  '--stsv-Input__background-color--selected': oceanBlues.color6,
  '--stsv-Input__border-color--selected': oceanBlues.color11,
  '--stsv-Input__color--selected': oceanBlues.color12,

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
  '--stsv-Error__color': darkStatusColors.error.color
};
