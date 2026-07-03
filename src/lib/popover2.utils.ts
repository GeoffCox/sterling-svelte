import type { Popover2AnchorOrigin, Popover2Placement, PopoverNonant } from './Popover2.types';

export const splitNonant = (nonant: PopoverNonant) => {
  const result = nonant.split('-');
  return {
    horizontal: result[1] as 'left' | 'center' | 'right',
    vertical: result[0] as 'top' | 'center' | 'bottom'
  };
};

const getOffsetX = (
  anchorOriginX: 'left' | 'center' | 'right',
  placementX: 'left' | 'center' | 'right'
) => {
  switch (anchorOriginX) {
    case 'left':
      switch (placementX) {
        case 'left':
          return '0%';
        case 'right':
          return '100%';
        case 'center':
        default:
          return '50%';
      }

    case 'right':
      switch (placementX) {
        case 'left':
          return '-100%';
        case 'right':
          return '0%';
        case 'center':
        default:
          return '-50%';
      }
    case 'center':
    default:
      switch (placementX) {
        case 'left':
          return '-50%';
        case 'right':
          return '50%';
        case 'center':
        default:
          return '0%';
      }
  }
};

const getOffsetY = (
  anchorOriginY: 'top' | 'center' | 'bottom',
  placementY: 'top' | 'center' | 'bottom'
) => {
  switch (anchorOriginY) {
    case 'top':
      switch (placementY) {
        case 'top':
          return '0%';
        case 'bottom':
          return '100%';
        case 'center':
        default:
          return '50%';
      }

    case 'bottom':
      switch (placementY) {
        case 'top':
          return '-100%';
        case 'bottom':
          return '0%';
        case 'center':
        default:
          return '-50%';
      }
    case 'center':
    default:
      switch (placementY) {
        case 'top':
          return '-50%';
        case 'bottom':
          return '50%';
        case 'center':
        default:
          return '0%';
      }
  }
};

export const getPopoverOffsets = (
  anchorOrigin: Popover2AnchorOrigin,
  placement: Popover2Placement
) => {
  const { horizontal: anchorOriginX, vertical: anchorOriginY } = splitNonant(anchorOrigin);
  const { horizontal: placementX, vertical: placementY } = splitNonant(
    placement === 'auto' ? anchorOrigin : placement
  );

  const translateX = getOffsetX(anchorOriginX, placementX);
  const translateY = getOffsetY(anchorOriginY, placementY);

  return {
    x: translateX,
    y: translateY
  };
};
