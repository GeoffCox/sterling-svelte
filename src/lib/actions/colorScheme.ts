type Params = {
  value?: string;
};

const getRootColorScheme = () => {
  return globalThis.document?.documentElement?.style.getPropertyValue('color-scheme');
};

const setRootColorScheme = (value: string) => {
  globalThis.document?.documentElement?.style.setProperty('color-scheme', value);
};

const clearRootColorScheme = () => {
  globalThis.document?.documentElement?.style.removeProperty('color-scheme');
};

export const colorScheme = (_node: HTMLElement, params?: Params) => {
  const originalValue = getRootColorScheme();
  setRootColorScheme(params?.value || 'light dark');

  return {
    destroy() {
      if (originalValue) {
        setRootColorScheme(originalValue);
      } else {
        clearRootColorScheme();
      }
    },
    update(params?: Params) {
      setRootColorScheme(params?.value || 'light dark');
    }
  };
};
