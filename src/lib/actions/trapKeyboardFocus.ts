const getFirstFocusable = (node: HTMLElement) => {
  // we can't select [tabIndex] as many elements don't have tabIndex as a declared property
  // but do default to tabIndex >= 0.
  const nodes = node.querySelectorAll('*');
  const elements = Array.from(nodes)
    .map((n) => n as unknown as HTMLOrSVGElement)
    .filter((n) => n.tabIndex !== undefined && n.tabIndex >= 0);
  return elements.length > 0 ? elements[0] : null;
};

const getLastFocusable = (node: HTMLElement) => {
  // we can't select [tabIndex] as many elements don't have tabIndex as a declared property
  // but do default to tabIndex >= 0.
  const nodes = node.querySelectorAll('*');
  const elements = Array.from(nodes)
    .map((n) => n as unknown as HTMLOrSVGElement)
    .filter((n) => n.tabIndex !== undefined && n.tabIndex >= 0);
  return elements.length > 0 ? elements[elements.length - 1] : null;
};

export const trapKeyboardFocus = (node: HTMLElement) => {
  const onKeydown = (e: KeyboardEvent) => {
    let handledFocus = false;
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        const firstFocusable = getFirstFocusable(node);
        if (document.activeElement === firstFocusable) {
          const lastFocusable = getLastFocusable(node);
          lastFocusable?.focus();
          handledFocus = true;
        }
      } else {
        const lastFocusable = getLastFocusable(node);
        if (document.activeElement === lastFocusable) {
          const firstFocusable = getFirstFocusable(node);
          firstFocusable?.focus();
          handledFocus = true;
        }
      }
    }

    if (handledFocus) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
  };

  node.addEventListener('keydown', onKeydown);

  return {
    destroy: () => {
      node.removeEventListener('keydown', onKeydown);
    }
  };
};
