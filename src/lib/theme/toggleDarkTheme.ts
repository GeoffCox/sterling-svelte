import { applyDarkTheme } from './applyDarkTheme';
import { applyLightTheme } from './applyLightTheme';
import type { ThemeActionParams } from './types';

type Params = Omit<ThemeActionParams, 'theme'> & {
  dark?: boolean;
};

const _applyTheme = (node: HTMLElement, params?: Params) => {
  let dark = params?.dark;

  if (params?.dark === undefined) {
    dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  if (dark) {
    applyDarkTheme(node, params);
  } else {
    applyLightTheme(node, params);
  }
};

const onPrefersColorSchemeDarkChanged = (
  e: MediaQueryListEvent,
  node: HTMLElement,
  params?: Params
) => {
  let dark = params?.dark;

  if (params?.dark === undefined) {
    dark = e.matches;
  }

  if (dark) {
    applyDarkTheme(node, params);
  } else {
    applyLightTheme(node, params);
  }
};

/**
 * An action that applies
 * - `darkTheme` when dark is true
 * - `lightTheme` when dark is false
 * - `darkTheme` or `lightTheme` based on `prefers-color-scheme` when dark is undefined
 *
 * @example ```use:toggleDarkMode```
 * @example ```use:toggleDarkMode={{ dark: myToggleVariable }}```
 */
export const toggleDarkTheme = (node: HTMLElement, params?: Params) => {
  let mediaChangeHandler = (e: MediaQueryListEvent) =>
    onPrefersColorSchemeDarkChanged(e, node, params);

  const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
  matchMedia.addEventListener('change', mediaChangeHandler);

  _applyTheme(node, params);

  return {
    destroy() {
      matchMedia.removeEventListener('change', mediaChangeHandler);
    },
    update(params?: Params) {
      // dark might have changed so resubscribe using new params
      matchMedia.removeEventListener('change', mediaChangeHandler);
      mediaChangeHandler = (e: MediaQueryListEvent) =>
        onPrefersColorSchemeDarkChanged(e, node, params);
      matchMedia.addEventListener('change', mediaChangeHandler);
      _applyTheme(node, params);
    }
  };
};
