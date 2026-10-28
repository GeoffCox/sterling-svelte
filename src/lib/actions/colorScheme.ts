type Params = {
  value?: string;
};

const getRootColorScheme = () => {
  const root = globalThis.document?.documentElement;
  return root?.style.getPropertyValue('color-scheme');
};

const clearRootColorScheme = () => {
  const root = globalThis.document?.documentElement;

  root?.style.removeProperty('color-scheme');
  root?.classList.remove('light', 'dark');
  root?.removeAttribute('data-theme');
};

const setRootColorScheme = (value?: string) => {
  if (value) {
    const root = globalThis.document?.documentElement;
    if (value === 'light') {
      root?.style.setProperty('color-scheme', 'light only');
      root?.classList.remove('dark');
      root?.classList.add(value);
      root?.setAttribute('data-theme', value);
    } else if (value === 'dark') {
      root?.style.setProperty('color-scheme', 'dark only');
      root?.classList.remove('light');
      root?.classList.add(value);
      root?.setAttribute('data-theme', value);
    } else {
      clearRootColorScheme();
    }
  } else {
    clearRootColorScheme();
  }
};

export const colorScheme = (_node: HTMLElement, params?: Params) => {
  const originalValue = getRootColorScheme();

  const colorScheme = params?.value && params.value !== 'light dark' ? params.value : undefined;
  setRootColorScheme(colorScheme);

  return {
    destroy() {
      if (originalValue) {
        setRootColorScheme(originalValue);
      } else {
        clearRootColorScheme();
      }
    },
    update(params?: Params) {
      const colorScheme = params?.value && params.value !== 'light dark' ? params.value : undefined;
      setRootColorScheme(colorScheme);
    }
  };
};
