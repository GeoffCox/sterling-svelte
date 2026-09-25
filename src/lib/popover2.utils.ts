import type { Popover2Nonant } from './Popover2.types';

type NonantVertical = 'top' | 'center' | 'bottom';
type NonantHorizontal = 'left' | 'center' | 'right';

export const splitNonant = (
  nonant: Popover2Nonant
): { vertical: NonantVertical; horizontal: NonantHorizontal } => {
  switch (nonant) {
    case 'top-left':
      return { vertical: 'top', horizontal: 'left' };
    case 'top':
      return { vertical: 'top', horizontal: 'center' };
    case 'top-right':
      return { vertical: 'top', horizontal: 'right' };
    case 'left':
      return { vertical: 'center', horizontal: 'left' };
    case 'center':
      return { vertical: 'center', horizontal: 'center' };
    case 'right':
      return { vertical: 'center', horizontal: 'right' };
    case 'bottom-left':
      return { vertical: 'bottom', horizontal: 'left' };
    case 'bottom':
      return { vertical: 'bottom', horizontal: 'center' };
    case 'bottom-right':
      return { vertical: 'bottom', horizontal: 'right' };
    default:
      throw new Error(`Invalid nonant value: ${nonant}.`);
  }
};

export const formatNonat = (vertical: NonantVertical, horizontal: NonantHorizontal) => {
  if (vertical === 'center' && horizontal === 'center') {
    return 'center';
  }
  if (vertical === 'center') {
    return horizontal;
  }
  if (horizontal === 'center') {
    return vertical;
  }
  return `${vertical}-${horizontal}`;
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

export const getPopoverOffsets = (anchorOrigin: Popover2Nonant, placement: Popover2Nonant) => {
  const { horizontal: anchorOriginX, vertical: anchorOriginY } = splitNonant(anchorOrigin);
  const { horizontal: placementX, vertical: placementY } = splitNonant(placement);

  const translateX = getOffsetX(anchorOriginX, placementX);
  const translateY = getOffsetY(anchorOriginY, placementY);

  return {
    x: translateX,
    y: translateY
  };
};

export const getOppositeNonant = (value: Popover2Nonant) => {
  switch (value) {
    case 'top-left':
      return 'bottom-right';
    case 'top-center':
      return 'bottom-center';
    case 'top-right':
      return 'bottom-left';
    case 'center-left':
      return 'center-right';
    case 'center-center':
      return 'center-center';
    case 'center-right':
      return 'center-left';
    case 'bottom-left':
      return 'top-right';
    case 'bottom-center':
      return 'top-center';
    case 'bottom-right':
      return 'top-left';
    default:
      return value;
  }
};

type Point = {
  x: number;
  y: number;
};

export const getFlippedAxes = (
  placement: Popover2Nonant,
  popoverRect: DOMRect,
  anchorPoint: Point
) => {
  // centerpoint of popover
  const pcx = popoverRect.left + popoverRect.width / 2;
  const pcy = popoverRect.top + popoverRect.height / 2;

  let xFlipped = false;
  switch (placement) {
    case 'top-left':
    case 'center-left':
    case 'bottom-left':
      xFlipped = pcx > anchorPoint.x;
      break;
    case 'top-right':
    case 'center-right':
    case 'bottom-right':
      xFlipped = pcx < anchorPoint.x;
      break;
    default:
      break;
  }

  let yFlipped = false;
  switch (placement) {
    case 'top-left':
    case 'top-center':
    case 'top-right':
      yFlipped = pcy > anchorPoint.y;
      break;
    case 'bottom-left':
    case 'bottom-center':
    case 'bottom-right':
      yFlipped = pcy < anchorPoint.y;
      break;
    default:
      break;
  }

  return {
    xFlipped,
    yFlipped
  };
};

export const getNonantPoint = (rect: DOMRect, nonant: Popover2Nonant) => {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  switch (nonant) {
    case 'top-left':
      return {
        x: rect.left,
        y: rect.top
      };
    case 'top-center':
      return {
        x: cx,
        y: rect.top
      };
    case 'top-right':
      return {
        x: rect.right,
        y: rect.top
      };
    case 'center-left':
      return {
        x: rect.left,
        y: cy
      };
    case 'center-center':
      return {
        x: cx,
        y: cy
      };
    case 'center-right':
      return {
        x: rect.right,
        y: cy
      };
    case 'bottom-left':
      return {
        x: rect.left,
        y: rect.bottom
      };
    case 'bottom-center':
      return {
        x: cx,
        y: rect.bottom
      };
    case 'bottom-right':
      return {
        x: rect.right,
        y: rect.bottom
      };
    default:
      return {
        x: cx,
        y: cy
      };
  }
};
