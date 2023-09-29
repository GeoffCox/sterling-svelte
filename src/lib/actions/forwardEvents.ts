export const forwardEvents = (
  node: HTMLElement,
  params: { target: HTMLElement; events?: string[]; customEvents?: string[] }
) => {
  const addListeners = (
    node: HTMLElement,
    target: HTMLElement,
    events?: string[],
    customEvents?: string[]
  ) => {
    let forward = (event: any) => {
      target.dispatchEvent(event);
    };

    let forwardCustom = (event: any) => {
      const customEvent = event as CustomEvent;
      target.dispatchEvent(
        new CustomEvent(customEvent.type, {
          bubbles: customEvent.bubbles,
          cancelable: customEvent.cancelable,
          detail: customEvent.detail
        })
      );
    };

    events?.forEach((e) => node.addEventListener(e, forward));
    customEvents?.forEach((e) => node.addEventListener(e, forwardCustom));

    return () => {
      events?.forEach((e) => node.removeEventListener(e, forward));
      customEvents?.forEach((e) => node.removeEventListener(e, forwardCustom));
    };
  };

  let unsubscribe = addListeners(node, params.target, params.events, params.customEvents);

  const update = (params: { target: HTMLElement; events?: string[]; customEvents?: [] }) => {
    unsubscribe();
    unsubscribe = addListeners(node, params.target, params.events, params.customEvents);
  };

  return {
    update,
    destroy() {
      unsubscribe();
    }
  };
};
