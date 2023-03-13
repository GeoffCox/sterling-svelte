import type { Theme } from './types';
import { neutrals } from './colors';

export const lightTheme: Theme = {
  // ----- Common (18) ---- //
  '--stsv-Common__background-color': neutrals.neutral100,
  '--stsv-Common__border-color': neutrals.neutral60,
  '--stsv-Common__border-radius': '0',
  '--stsv-Common__border-style': 'solid',
  '--stsv-Common__border-width': '2px',
  '--stsv-Common__color': neutrals.neutral15,

  // hover
  '--stsv-Common__background-color--hover': neutrals.neutral100,
  '--stsv-Common__border-color--hover': neutrals.neutral45,
  '--stsv-Common__color--hover': neutrals.neutral15,

  // focus
  '--stsv-Common__background-color--focus': neutrals.neutral96,
  '--stsv-Common__border-color--focus': neutrals.neutral0,
  '--stsv-Common__color--focus': neutrals.neutral15,

  // outline
  '--stsv-Common__outline-color': neutrals.neutral15,
  '--stsv-Common__outline-offset': '0',
  '--stsv-Common__outline-style': 'solid',
  '--stsv-Common__outline-width': '2px',

  // disabled
  '--stsv-Common__background-color--disabled': neutrals.neutral96,
  '--stsv-Common__border-color--disabled': neutrals.neutral75,
  '--stsv-Common__color--disabled': neutrals.neutral75,

  // ----- Layer ---- //
  '--stsv-Layer__background-color--1': neutrals.neutral98,
  '--stsv-Layer__color--1': neutrals.neutral15,

  '--stsv-Layer__background-color--2': neutrals.neutral96,
  '--stsv-Layer__color--2': neutrals.neutral15,

  '--stsv-Layer__background-color--3': neutrals.neutral92,
  '--stsv-Layer__color--3': neutrals.neutral15,

  // ----- Button (15) ----- //

  '--stsv-Button__background-color': neutrals.neutral96,
  '--stsv-Button__border-color': neutrals.neutral60,
  '--stsv-Button__border-radius': '8px',
  '--stsv-Button__border-style': 'solid',
  '--stsv-Button__border-width': '2px',
  '--stsv-Button__color': neutrals.neutral15,

  // hover
  '--stsv-Button__background-color--hover': neutrals.neutral96,
  '--stsv-Button__border-color--hover': neutrals.neutral45,
  '--stsv-Button__color--hover': neutrals.neutral15,

  // active
  '--stsv-Button__background-color--active': neutrals.neutral92,
  '--stsv-Button__border-color--active': neutrals.neutral30,
  '--stsv-Button__color--active': neutrals.neutral30,

  // focus
  '--stsv-Button__background-color--focus': neutrals.neutral96,
  '--stsv-Button__border-color--focus': neutrals.neutral0,
  '--stsv-Button__color--focus': neutrals.neutral15,

  // ----- Input (15) ----- //
  '--stsv-Input__background-color': neutrals.neutral98,
  '--stsv-Input__border-color': neutrals.neutral60,
  '--stsv-Input__border-radius': '3px',
  '--stsv-Input__border-style': 'solid',
  '--stsv-Input__border-width': '2px',
  '--stsv-Input__color': neutrals.neutral15,

  // hover
  '--stsv-Input__background-color--hover': neutrals.neutral100,
  '--stsv-Input__border-color--hover': neutrals.neutral45,
  '--stsv-Input__color--hover': neutrals.neutral15,

  // focus
  '--stsv-Input__background-color--focus': neutrals.neutral100,
  '--stsv-Input__border-color--focus': neutrals.neutral15,
  '--stsv-Input__color--focus': neutrals.neutral15,

  // selected
  '--stsv-Input__background-color--selected': neutrals.neutral92,
  '--stsv-Input__border-color--selected': neutrals.neutral30,
  '--stsv-Input__color--selected': neutrals.neutral15,

  // ----- Display ----- //
  '--stsv-Display__background-color': neutrals.neutral92,
  '--stsv-Display__border-color': neutrals.neutral30,
  '--stsv-Display__color': neutrals.neutral15,

  '--stsv-Display__color--subtle': neutrals.neutral45,
  '--stsv-Display__color--faint': neutrals.neutral85,
  '--stsv-Display__color--disabled': neutrals.neutral85,

  '--stsv-Info__background-color': 'hsl(198, 100%, 90%)',
  '--stsv-Info__border-color': 'hsl(198, 100%, 40%)',
  '--stsv-Info__color': 'hsl(198, 80%, 33%)',

  '--stsv-Success__background-color': 'hsl(146, 100%, 90%)',
  '--stsv-Success__border-color': 'hsl(146, 100%, 30%)',
  '--stsv-Success__color': 'hsl(146, 80%, 25%)',

  '--stsv-Warning__background-color': 'hsl(39, 100%, 80%)',
  '--stsv-Warning__border-color': 'hsl(39, 100%, 45%)',
  '--stsv-Warning__color': 'hsl(39, 100%, 25%)',

  '--stsv-Error__background-color': 'hsl(5, 100%, 90%)',
  '--stsv-Error__border-color': 'hsl(5, 100%, 40%)',
  '--stsv-Error__color': 'hsl(5, 80%, 40%)'
};
