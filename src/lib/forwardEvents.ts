import { custom_event } from 'svelte/internal';

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
      console.log('forward', node, target, event);
      target.dispatchEvent(event);
    };

    let forwardCustom = (event: any) => {
      console.log('custom forward', node, target, event);
      const customEvent = event as CustomEvent;
      target.dispatchEvent(
        custom_event(customEvent.type, customEvent.detail, {
          bubbles: customEvent.bubbles,
          cancelable: customEvent.cancelable
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
