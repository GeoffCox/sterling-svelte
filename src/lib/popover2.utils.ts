import type { Popover2Nonant } from './Popover2.types';

type NonantVertical = 'top' | 'center' | 'bottom';
type NonantHorizontal = 'left' | 'center' | 'right';

type SplitNonant = {
  vertical: NonantVertical;
  horizontal: NonantHorizontal;
};

type Point = {
  x: number;
  y: number;
};

type Offset = Point;

type Size = {
  width: number;
  height: number;
};

export const splitNonant = (nonant: Popover2Nonant): SplitNonant => {
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

export const formatNonat = ({ vertical, horizontal }: SplitNonant) => {
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

const getPlacementPercentOffsetX = (
  anchorOriginX: NonantHorizontal,
  placementX: NonantHorizontal
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

const getPlacementOffsetPercentY = (anchorOriginY: NonantVertical, placementY: NonantVertical) => {
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

export const getPlacementPercentOffsets = (
  anchorOrigin: Popover2Nonant,
  placement: Popover2Nonant
) => {
  const { horizontal: anchorOriginX, vertical: anchorOriginY } = splitNonant(anchorOrigin);
  const { horizontal: placementX, vertical: placementY } = splitNonant(placement);

  const translateX = getPlacementPercentOffsetX(anchorOriginX, placementX);
  const translateY = getPlacementOffsetPercentY(anchorOriginY, placementY);

  return {
    x: translateX,
    y: translateY
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
    case 'top':
      return {
        x: cx,
        y: rect.top
      };
    case 'top-right':
      return {
        x: rect.right,
        y: rect.top
      };
    case 'left':
      return {
        x: rect.left,
        y: cy
      };
    case 'center':
      return {
        x: cx,
        y: cy
      };
    case 'right':
      return {
        x: rect.right,
        y: cy
      };
    case 'bottom-left':
      return {
        x: rect.left,
        y: rect.bottom
      };
    case 'bottom':
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

const getOffsetPixelsX = (placementX: NonantHorizontal, width: number) => {
  switch (placementX) {
    case 'left':
      return -width;
    case 'right':
      return 0;
    case 'center':
    default:
      return -width / 2;
  }
};

const getOffsetPixelsY = (placementY: NonantVertical, height: number) => {
  switch (placementY) {
    case 'top':
      return -height;
    case 'bottom':
      return 0;
    case 'center':
    default:
      return -height / 2;
  }
};

const getPlacementPixelOffsets = (placement: Popover2Nonant, size: Size) => {
  const { horizontal, vertical } = splitNonant(placement);

  const translateX = getOffsetPixelsX(horizontal, size.width);
  const translateY = getOffsetPixelsY(vertical, size.height);

  return {
    x: translateX,
    y: translateY
  };
};

/**
 * Calculates where a popover rect will appear relative to an anchor
 * given an anchor origin, placement, and offsets
 */
export const getPopoverPosition = (
  anchorOrigin: Popover2Nonant,
  anchorRect: DOMRect,
  placement: Popover2Nonant,
  popoverSize: Size,
  offset: Offset
) => {
  const anchorPoint = getNonantPoint(anchorRect, anchorOrigin);

  const placementOffset = getPlacementPixelOffsets(placement, popoverSize);

  const x = anchorPoint.x + placementOffset.x + offset.x;
  const y = anchorPoint.y + placementOffset.y + offset.y;

  return new DOMRectReadOnly(x, y, popoverSize.width, popoverSize.height);
};

export const getOppositeNonant = (value: Popover2Nonant) => {
  switch (value) {
    case 'top-left':
      return 'bottom-right';
    case 'top':
      return 'bottom';
    case 'top-right':
      return 'bottom-left';
    case 'left':
      return 'right';
    case 'center':
      return 'center';
    case 'right':
      return 'left';
    case 'bottom-left':
      return 'top-right';
    case 'bottom':
      return 'top';
    case 'bottom-right':
      return 'top-left';
    default:
      return value;
  }
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
    case 'left':
    case 'bottom-left':
      xFlipped = pcx > anchorPoint.x;
      break;
    case 'top-right':
    case 'right':
    case 'bottom-right':
      xFlipped = pcx < anchorPoint.x;
      break;
    default:
      break;
  }

  let yFlipped = false;
  switch (placement) {
    case 'top-left':
    case 'top':
    case 'top-right':
      yFlipped = pcy > anchorPoint.y;
      break;
    case 'bottom-left':
    case 'bottom':
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
