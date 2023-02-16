<script lang="ts">
  export let backgroundColor: string;
  export let color: string;

  const getCssValue = (value: string) => {
    if (value.startsWith('--')) {
      return `var(${value})`;
    }
    return value;
  };

  $: style =
    `--swatch__background-color: ${getCssValue(backgroundColor)};` +
    `--swatch__color: ${getCssValue(color)};`;
</script>

<div class="swatch" {style}>
  <div class="color-block-background" />
  <div class="color-block"><span>T</span></div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 450 90"
    xml:space="preserve"
    class="diagram"
  >
    <text class="text" x="110" y="30">{backgroundColor}</text>
    <line class="line" x1="100" y1="15" x2="100" y2="35" />
    <line class="line" x1="100" y1="25" x2="60" y2="30" />
    <circle class="dot" cx="60" cy="30" r="3" />

    <text class="text" x="110" y="60">{color}</text>
    <line class="line" x1="100" y1="45" x2="100" y2="65" />
    <line class="line" x1="100" y1="55" x2="46" y2="55" />
    <circle class="dot" cx="46" cy="55" r="3" />
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
    background-color: var(--swatch__background-color);
    color: var(--swatch__color);
  }
</style>
