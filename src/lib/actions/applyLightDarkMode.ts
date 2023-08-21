import { prefersColorSchemeDark } from '$lib/mediaQueries/prefersColorSchemeDark';

type Mode = 'auto' | 'light' | 'dark';

type Params = {
  atDocumentRoot?: boolean;
  mode?: Mode;
};

const modes = ['light-mode', 'dark-mode'];

const addMode = (element: HTMLElement, mode: Mode, prefersDark: boolean) => {
  const darkMode = mode === 'dark' || (mode === 'auto' && prefersDark);
  element.classList.remove(...modes);
  element.classList.add(modes[darkMode ? 1 : 0]);
};

const clearModes = (element: HTMLElement) => {
  element.classList.remove(...modes);
};

export const applyLightDarkMode = (node: HTMLElement, params?: Params) => {
  let mode = params?.mode || 'auto';
  let prefersDark = false;

  let atDocumentRoot = params?.atDocumentRoot === true;
  let target = atDocumentRoot ? document.documentElement : node;

  const unsubscribe = prefersColorSchemeDark.subscribe((value) => {
    prefersDark = value;

    addMode(target, mode, prefersDark);
  });

  addMode(target, mode, prefersDark);
  return {
    destroy() {
      unsubscribe();
    },
    update(params?: Params) {
      // if changing the target, then clear from previous target
      if (atDocumentRoot !== params?.atDocumentRoot) {
        clearModes(target);
      }

      mode = params?.mode || 'auto';
      atDocumentRoot = params?.atDocumentRoot === true;
      target = atDocumentRoot ? document.documentElement : node;
      addMode(target, mode, prefersDark);
    }
  };
};
