import type { Theme } from './types';
import { neutrals } from './colors';

export const darkTheme: Theme = {
  // ----- Common ---- //
  '--stsv-Common__background-color': neutrals.neutral15,
  '--stsv-Common__border-color': neutrals.neutral92,
  '--stsv-Common__border-radius': '0',
  '--stsv-Common__border-style': 'solid',
  '--stsv-Common__border-width': '2px',
  '--stsv-Common__color': neutrals.neutral100,

  // hover
  '--stsv-Common__background-color--hover': neutrals.neutral15,
  '--stsv-Common__border-color--hover': neutrals.neutral96,
  '--stsv-Common__color--hover': neutrals.neutral100,

  // focus
  '--stsv-Common__background-color--focus': neutrals.neutral45,
  '--stsv-Common__border-color--focus': neutrals.neutral100,
  '--stsv-Common__color--focus': neutrals.neutral100,

  // outline
  '--stsv-Common__outline-color': neutrals.neutral100,
  '--stsv-Common__outline-offset': '0',
  '--stsv-Common__outline-style': 'solid',
  '--stsv-Common__outline-width': '2px',

  // disabled
  '--stsv-Common__background-color--disabled': neutrals.neutral45,
  '--stsv-Common__border-color--disabled': neutrals.neutral92,
  '--stsv-Common__color--disabled': neutrals.neutral60,

  // ----- Layer ---- //
  '--stsv-Layer__background-color--1': neutrals.neutral20,
  '--stsv-Layer__color--1': neutrals.neutral100,

  '--stsv-Layer__background-color--2': neutrals.neutral10,
  '--stsv-Layer__color--2': neutrals.neutral100,

  '--stsv-Layer__background-color--3': neutrals.neutral45,
  '--stsv-Layer__color--3': neutrals.neutral100,

  // ----- Button ----- //

  '--stsv-Button__background-color': neutrals.neutral30,
  '--stsv-Button__border-color': neutrals.neutral92,
  '--stsv-Button__border-radius': '8px',
  '--stsv-Button__border-style': 'solid',
  '--stsv-Button__border-width': '2px',
  '--stsv-Button__color': neutrals.neutral100,

  // hover
  '--stsv-Button__background-color--hover': neutrals.neutral45,
  '--stsv-Button__border-color--hover': neutrals.neutral96,
  '--stsv-Button__color--hover': neutrals.neutral100,

  // active
  '--stsv-Button__background-color--active': neutrals.neutral60,
  '--stsv-Button__border-color--active': neutrals.neutral98,
  '--stsv-Button__color--active': neutrals.neutral98,

  // focus
  '--stsv-Button__background-color--focus': neutrals.neutral45,
  '--stsv-Button__border-color--focus': neutrals.neutral100,
  '--stsv-Button__color--focus': neutrals.neutral100,

  // ----- Input ----- //
  '--stsv-Input__background-color': neutrals.neutral30,
  '--stsv-Input__border-color': neutrals.neutral92,
  '--stsv-Input__border-radius': '3px',
  '--stsv-Input__border-style': 'solid',
  '--stsv-Input__border-width': '2px',
  '--stsv-Input__color': neutrals.neutral100,

  // hover
  '--stsv-Input__background-color--hover': neutrals.neutral15,
  '--stsv-Input__border-color--hover': neutrals.neutral96,
  '--stsv-Input__color--hover': neutrals.neutral100,

  // focus
  '--stsv-Input__background-color--focus': neutrals.neutral15,
  '--stsv-Input__border-color--focus': neutrals.neutral100,
  '--stsv-Input__color--focus': neutrals.neutral100,

  // selected
  '--stsv-Input__background-color--selected': neutrals.neutral60,
  '--stsv-Input__border-color--selected': neutrals.neutral98,
  '--stsv-Input__color--selected': neutrals.neutral100,

  // ----- Display ----- //
  '--stsv-Display__background-color': neutrals.neutral20,
  '--stsv-Display__border-color': neutrals.neutral92,
  '--stsv-Display__color': neutrals.neutral80,

  '--stsv-Display__color--subtle': neutrals.neutral96,
  '--stsv-Display__color--faint': neutrals.neutral45,
  '--stsv-Display__color--disabled': neutrals.neutral45,

  '--stsv-Info__background-color': 'hsl(198, 100%, 10%)',
  '--stsv-Info__border-color': 'hsl(198, 100%, 40%)',
  '--stsv-Info__color': 'hsl(198, 80%, 50%)',

  '--stsv-Success__background-color': 'hsl(146, 100%, 10%)',
  '--stsv-Success__border-color': 'hsl(146, 100%, 30%)',
  '--stsv-Success__color': 'hsl(146, 100%, 40%)',

  '--stsv-Warning__background-color': 'hsl(39, 100%, 10%)',
  '--stsv-Warning__border-color': 'hsl(39, 100%, 45%)',
  '--stsv-Warning__color': 'hsl(39, 100%, 50%)',

  '--stsv-Error__background-color': 'hsl(5, 100%, 10%)',
  '--stsv-Error__border-color': 'hsl(5, 100%, 40%)',
  '--stsv-Error__color': 'hsl(5, 100%, 50%)'
};
