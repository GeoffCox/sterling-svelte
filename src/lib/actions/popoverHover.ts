type Params = {
  popoverTarget: string;
  delayMilliseconds?: number;
};

const isNodeDisabled = (node: HTMLElement): boolean => {
  return (
    ('disabled' in node && (node as HTMLButtonElement).disabled) ||
    node.getAttribute('aria-disabled') === 'true' ||
    !!node.closest('fieldset[disabled]')
  );
};

export const popoverHover = (node: HTMLElement, params: Params) => {
  let { popoverTarget, delayMilliseconds = 1000 } = params;

  let delayShowTimeout: NodeJS.Timeout | undefined;
  let popover: HTMLElement | undefined;

  const show = () => {
    if (isNodeDisabled(node)) {
      hide();
      return;
    }

    popover = popover || document.querySelector<HTMLElement>(`#${popoverTarget}`) || undefined;
    if (popover) {
      popover.showPopover({ source: node });
    }
  };

  const hide = () => {
    delayShowTimeout && clearTimeout(delayShowTimeout);
    delayShowTimeout = undefined;
    if (popover) {
      popover.hidePopover();
    }
  };

  const delayShow = () => {
    if (delayMilliseconds === 0) {
      show();
    } else {
      delayShowTimeout && clearTimeout(delayShowTimeout);
      delayShowTimeout = setTimeout(() => {
        show();
      }, delayMilliseconds);
    }
  };

  node.addEventListener('pointerenter', delayShow, true);
  node.addEventListener('pointerleave', hide, true);

  return {
    update(params: Params) {
      if (popoverTarget !== params.popoverTarget) {
        hide();
        popover = popover || document.querySelector<HTMLElement>(`#${popoverTarget}`) || undefined;
      }
      popoverTarget = params.popoverTarget;
      delayMilliseconds = params.delayMilliseconds || 1000;
    },
    destroy() {
      popover = undefined;
      delayShowTimeout && clearTimeout(delayShowTimeout);
      node.removeEventListener('pointerenter', delayShow, true);
      node.removeEventListener('pointerleave', hide, true);
    }
  };
};
