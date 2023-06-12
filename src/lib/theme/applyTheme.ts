import type { Theme, ThemeActionParams } from './types';

const _applyTheme = (node: HTMLElement, theme: Theme) => {
  Object.keys(theme).map((key) => {
    node.style.setProperty(`--${key}`, theme[key] ? `${theme[key]}` : null);
  });
};

/**
 * Applies a theme.
 */
export const applyTheme = (node: HTMLElement, params: ThemeActionParams) => {
  const element = params.atDocumentRoot ? document.documentElement : node;
  _applyTheme(element, params.theme);

  return {
    update: (params?: ThemeActionParams) => {
      if (params) {
        const element = params.atDocumentRoot ? document.documentElement : node;
        _applyTheme(element, params?.theme);
      }
    }
  };
};
