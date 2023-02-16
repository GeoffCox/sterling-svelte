<script lang="ts">
  export let outlineColor: string;
  export let outlineOffset: string;
  export let outlineStyle: string;
  export let outlineWidth: string;

  const getCssValue = (value: string) => {
    if (value.startsWith('--')) {
      return `var(${value})`;
    }
    return value;
  };

  $: style =
    `--swatch__outline-color: ${getCssValue(outlineColor)};` +
    `--swatch__outline-offset: ${getCssValue(outlineOffset)};` +
    `--swatch__outline-style: ${getCssValue(outlineStyle)};` +
    `--swatch__outline-width: ${getCssValue(outlineWidth)};`;
</script>

<div class="swatch" {style}>
  <div class="color-block-background" />
  <div class="color-block" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 450 90"
    xml:space="preserve"
    class="diagram"
  >
    <text class="text" x="110" y="20">{outlineColor}</text>
    <text class="text" x="110" y="40">{outlineOffset}</text>
    <text class="text" x="110" y="60">{outlineStyle}</text>
    <text class="text" x="110" y="80">{outlineWidth}</text>
    <line class="line" x1="100" y1="5" x2="100" y2="85" />
    <line class="line" x1="100" y1="45" x2="73" y2="45" />
    <circle class="dot" cx="73" cy="45" r="3" />
  </svg>
</div>

<style>
  .swatch {
    width: 450px;
    height: 90px;
    position: relative;
  }

  .diagram {
    font: inherit;
    position: relative;
  }

  text {
    font-size: 16px;
    fill: var(--stsv-Common__color);
  }

  .line {
    stroke: var(--stsv-Common__color);
    stroke-width: 1px;
  }

  .dot {
    fill: var(--stsv-Common__color);
  }

  .color-block-background {
    background-color: transparent;
    background-image: repeating-linear-gradient(
        45deg,
        var(--stsv-Common__color) 25%,
        transparent 25%,
        transparent 75%,
        var(--stsv-Common__color) 75%,
        var(--stsv-Common__color)
      ),
      repeating-linear-gradient(
        45deg,
        var(--stsv-Common__color) 25%,
        var(--stsv-Common__background-color) 25%,
        var(--stsv-Common__background-color) 75%,
        var(--stsv-Common__color) 75%,
        var(--stsv-Common__color)
      );
    background-position: 0 0, 4px 4px;
    background-size: 8px 8px;
    opacity: 0.2;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 95px;
  }

  .color-block {
    position: absolute;
    display: grid;
    align-items: center;
    justify-items: center;
    font-size: 16px;
    top: 20px;
    left: 20px;
    width: 50px;
    height: 50px;
    outline-color: var(--swatch__outline-color);
    outline-offset: var(--swatch__outline-offset);
    outline-style: var(--swatch__outline-style);
    outline-width: var(--swatch__outline-width);
  }
</style>
