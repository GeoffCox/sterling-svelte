type Params = {
  /** Other elements should not raise the event if clicked. */
  ignoreOthers?: HTMLElement[];
};

/**
 * Raises the click_outside event when the user clicks outside the node.
 * @param node The node to check and receive the event.
 * @param params Additional parameters
 */
export const clickOutside = (node: HTMLElement, params?: Params) => {
  let ignoreOthers = params?.ignoreOthers;

  const handleClick = (event: MouseEvent) => {
    const targetNode = event?.target as Node;
    if (
      targetNode &&
      !node.contains(targetNode) &&
      (!ignoreOthers || ignoreOthers.filter(Boolean).every((x) => !x.contains(targetNode)))
    ) {
      node.dispatchEvent(
        new CustomEvent<svelte.JSX.ClickOutsideEventDetail>('click_outside', {
          detail: { mouseEvent: event }
        })
      );
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    update(params: Params) {
      ignoreOthers = params.ignoreOthers;
    },
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
};
