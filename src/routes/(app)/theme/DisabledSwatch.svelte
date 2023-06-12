<div class="swatch"><span>T</span></div>

<style>
  .swatch {
    width: 100px;
    height: 100px;
    position: relative;
    display: grid;
    place-content: center;
    place-items: center;
    font-size: 42px;
  }

  .swatch::after {
    background: repeating-linear-gradient(
      45deg,
      var(--stsv-common__background-color1--disabled),
      var(--stsv-common__background-color1--disabled) 3px,
      var(--stsv-common__background-color2--disabled) 3px,
      var(--stsv-common__background-color2--disabled) 6px
    );
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    pointer-events: none;
    transition: opacity 250ms;
  }
</style>
