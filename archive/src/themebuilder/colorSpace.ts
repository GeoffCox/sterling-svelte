import tinycolor from 'tinycolor2';

import { round } from 'lodash-es';
import type { ColorFormat } from '$lib/ColorPicker.types';

export type RgbColor = {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
};

export type HslColor = {
  hue: number;
  saturation: number;
  lightness: number;
  alpha?: number;
};

export type ParsedColor = {
  format: ColorFormat;
  color: RgbColor | HslColor;
};

export const toHslString = (hsl: HslColor): string => {
  // we don't use tinycolor because it doesn't support decimal precision for HSL
  if (hsl.alpha !== undefined && hsl.alpha === 100) {
    return `hsl(${hsl.hue},${hsl.saturation}%,${hsl.lightness}%)`;
  } else {
    return `hsla(${hsl.hue},${hsl.saturation}%,${hsl.lightness}%,${hsl.alpha}%)`;
  }
};

export const toRgbString = (rgb: RgbColor): string => {
  const color = tinycolor({
    r: rgb.red,
    g: rgb.green,
    b: rgb.blue,
    a: rgb.alpha ? rgb.alpha / 100 : undefined
  });
  return color.toRgbString();
};

export const toHexString = (rgb: RgbColor): string => {
  const color = tinycolor({
    r: rgb.red,
    g: rgb.green,
    b: rgb.blue,
    a: rgb.alpha ? rgb.alpha / 100 : undefined
  });
  return color.toHexString();
};

export const toHsl = (rgb: RgbColor, precision?: number): HslColor => {
  const color = tinycolor({
    r: rgb.red,
    g: rgb.green,
    b: rgb.blue,
    a: rgb.alpha ? rgb.alpha / 100 : undefined
  });
  const hsl = color.toHsl();
  return {
    hue: round(hsl.h, precision),
    saturation: round(hsl.s * 100, precision),
    lightness: round(hsl.l * 100, precision)
  };
};

export const toRgb = (hsl: HslColor): RgbColor => {
  const color = tinycolor({
    h: hsl.hue,
    s: hsl.saturation / 100,
    l: hsl.lightness / 100,
    a: hsl.alpha ? hsl.alpha / 100 : undefined
  });
  const rgb = color.toRgb();
  return {
    red: rgb.r,
    green: rgb.g,
    blue: rgb.b
  };
};

export const getColorFormat = (text: string): ColorFormat => {
  const color = tinycolor(text);
  if (color.isValid()) {
    const format = color.getFormat();
    switch (format) {
      case 'hsl':
        return 'hsl';
        break;
      case 'rgb':
        return 'rgb';
        break;
      case 'hex':
        return 'hex';
        break;
      default:
    }
  }

  return 'hex';
};

export const parseColor = (text: string, precision?: number): ParsedColor | undefined => {
  const color = tinycolor(text);
  if (color.isValid()) {
    const format = color.getFormat();
    switch (format) {
      case 'hsl':
        const hsl = color.toHsl();
        return {
          format,
          color: {
            hue: round(hsl.h, precision),
            saturation: round(hsl.s * 100, precision),
            lightness: round(hsl.l * 100, precision),
            alpha: hsl.a ? hsl.a * 100 : undefined
          }
        };
        break;
      case 'rgb':
      case 'hex':
        const rgb = color.toRgb();
        return {
          format,
          color: {
            red: rgb.r,
            green: rgb.g,
            blue: rgb.b,
            alpha: rgb.a ? rgb.a * 100 : undefined
          }
        };
        break;
      default:
    }
  }
};

export const getLeastChangedHsl = (originalColor: HslColor, newColor: HslColor): HslColor => {
  let setHue = newColor.hue !== originalColor.hue;
  let setSaturation = newColor.saturation !== originalColor.saturation;
  let setLightness = newColor.lightness !== originalColor.lightness;

  // if the lightness changed to 0 or 100, don't change hue or saturation
  if (setLightness && (newColor.lightness === 100 || newColor.lightness === 0)) {
    setHue = false;
    setSaturation = false;
  }

  // if saturation changed to 0, don't change hue
  if (setSaturation && newColor.saturation === 0) {
    setHue = false;
  }

  return {
    hue: setHue ? newColor.hue : originalColor.lightness,
    saturation: setSaturation ? newColor.saturation : originalColor.saturation,
    lightness: setLightness ? newColor.lightness : originalColor.lightness,
    alpha: newColor.alpha
  };
};
