import { round } from 'lodash-es';
import tinyColor from 'tinycolor2';

const getPrecision = (value: number) => {
  if (value !== undefined && Number !== null && !Number.isNaN(value)) {
    const text = value.toString();
    const position = text.indexOf('.');
    if (position !== -1) {
      const fraction = text.substring(position + 1);
      if (fraction) {
        return fraction.length;
      }
    }
  }
  return 0;
};

const isMatchingHuePrecision = (
  hex: string,
  hsl: tinyColor.ColorFormats.HSLA,
  precision: number
) => {
  const rounded = tinyColor({ h: round(hsl.h, precision), s: hsl.s, l: hsl.l });
  return hex === rounded.toHexString();
};

const isMatchingSaturationPrecision = (
  hex: string,
  hsl: tinyColor.ColorFormats.HSLA,
  precision: number
) => {
  const rounded = tinyColor({ h: hsl.h, s: round(hsl.s, precision), l: hsl.l });
  return hex === rounded.toHexString();
};

const isMatchingLightnessPrecision = (
  hex: string,
  hsl: tinyColor.ColorFormats.HSLA,
  precision: number
) => {
  const rounded = tinyColor({ h: hsl.h, s: hsl.s, l: round(hsl.l, precision) });
  return hex === rounded.toHexString();
};

/**
 * Removes numbers after the decimal of hue, saturation, and lightness values
 * ensuring it can still be represented as the same rgb or hex color.
 * @param color A tinyColor instance to use
 * @returns A tinyColor instance with minimum precision HSL values
 */
export const getMinPrecisionHsl = (color: tinyColor.Instance): tinyColor.ColorFormats.HSL => {
  let newColor = color;
  let hsl = newColor.toHsl();
  let hex = color.toHexString();

  let huePrecision = getPrecision(hsl.h);
  let saturationPrecision = getPrecision(hsl.s);
  let lightnessPrecision = getPrecision(hsl.l);

  while (huePrecision >= 0 && isMatchingHuePrecision(hex, hsl, huePrecision - 1)) {
    huePrecision--;
  }

  const hue = round(hsl.h, huePrecision);

  newColor = tinyColor({ h: hue, s: hsl.s, l: hsl.l });
  hsl = newColor.toHsl();

  while (
    saturationPrecision >= 0 &&
    isMatchingSaturationPrecision(hex, hsl, saturationPrecision - 1)
  ) {
    saturationPrecision--;
  }

  const saturation = round(hsl.s, saturationPrecision);

  newColor = tinyColor({ h: hue, s: saturation, l: hsl.l });
  hsl = newColor.toHsl();

  while (
    lightnessPrecision >= 0 &&
    isMatchingLightnessPrecision(hex, hsl, lightnessPrecision - 1)
  ) {
    lightnessPrecision--;
  }

  const lightness = round(hsl.l, lightnessPrecision);

  return tinyColor({ h: hue, s: saturation, l: lightness }).toHsl();
};
