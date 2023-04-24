<script lang="ts">
  import ButtonPictureFrame from './ButtonPictureFrame.svelte';
  import CheckboxPictureFrame from './CheckboxPictureFrame.svelte';
  import RadioPicureFrame from './RadioPicureFrame.svelte';
  import DropdownPictureFrame from './DropdownPictureFrame.svelte';
  import SelectPictureFrame from './SelectPictureFrame.svelte';
  import TextAreaPictureFrame from './TextAreaPictureFrame.svelte';
  import InputPictureFrame from './InputPictureFrame.svelte';
  import LinkPictureFrame from './LinkPictureFrame.svelte';
  import SwitchPictureFrame from './SwitchPictureFrame.svelte';
  import SliderPictureFrame from './SliderPictureFrame.svelte';
  import TabListPictureFrame from './TabListPictureFrame.svelte';
  import MenuBarPictureFrame from './MenuBarPictureFrame.svelte';
  import ProgressPictureFrame from './ProgressPictureFrame.svelte';
  import ListPictureFrame from './ListPictureFrame.svelte';
  import TreePictureFrame from './TreePictureFrame.svelte';
  import MenuButtonPictureFrame from './MenuButtonPictureFrame.svelte';

  let sliderValue = 35;
  let sliderVerticalValue = 35;
</script>

<div class="page">
  <h1>Gallery</h1>
  <div class="gallery">
    <div class="row1">
      <div class="button-frame">
        <ButtonPictureFrame />
      </div>
      <div class="checkbox-frame">
        <CheckboxPictureFrame />
      </div>
      <div class="radio-frame">
        <RadioPicureFrame />
      </div>
      <div class="link-frame">
        <LinkPictureFrame />
      </div>
    </div>
    <div class="row2">
      <div class="input-frame">
        <InputPictureFrame />
      </div>
      <div class="textarea-frame">
        <TextAreaPictureFrame />
      </div>
    </div>
    <div class="row3">
      <div class="select-frame">
        <SelectPictureFrame />
      </div>
      <div class="dropdown-frame">
        <DropdownPictureFrame />
      </div>
      <div class="menu-bar-frame">
        <MenuBarPictureFrame />
      </div>
      <div class="menu-button-frame">
        <MenuButtonPictureFrame />
      </div>
    </div>
    <div class="row4">
      <div class="switch-frame">
        <SwitchPictureFrame />
      </div>
      <div class="slider-frame">
        <SliderPictureFrame bind:value={sliderValue} bind:verticalValue={sliderVerticalValue} />
      </div>
      <div class="progress-frame">
        <ProgressPictureFrame value={sliderValue} verticalValue={sliderVerticalValue} />
      </div>
    </div>
    <div class="row5">
      <div class="tab-list-frame">
        <TabListPictureFrame />
      </div>
    </div>
    <div class="row6">
      <div class="list-frame">
        <ListPictureFrame />
      </div>
      <div class="tree-frame">
        <TreePictureFrame />
      </div>
    </div>
  </div>
</div>

<style>
  .page {
    background-color: white;
    padding: 2em;
  }

  .gallery {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: 1em;
  }

  .row1 {
    display: grid;
    grid-template-areas:
      'button checkbox link'
      'button radio link';
    gap: 1em;
  }

  .row2 {
    display: grid;
    justify-content: center;
    grid-template-areas: 'input textarea';
    gap: 1em;
  }

  .row3 {
    display: grid;
    grid-template-areas: '. . menubar menubar menubar' '. select menubar menubar menubar' 'dropdown select . menubutton .';
    gap: 1em;
  }

  .row4 {
    display: grid;
    grid-template-areas: 'switch slider progress';
    gap: 1em;
  }

  .row5 {
    display: grid;
    grid-template-areas: '. . tablist .';
    gap: 1em;
  }

  .row6 {
    display: grid;
    grid-template-areas: 'list tree tree' '. tree tree' '. tree tree';
    gap: 1em;
  }

  .button-frame {
    align-self: center;
    grid-area: button;
  }

  .checkbox-frame {
    grid-area: checkbox;
  }

  .radio-frame {
    grid-area: radio;
  }

  .link-frame {
    align-self: center;
    grid-area: link;
  }

  .input-frame {
    grid-area: input;
  }

  .textarea-frame {
    grid-area: textarea;
  }

  .menu-bar-frame {
    grid-area: menubar;
  }

  .menu-button-frame {
    grid-area: menubutton;
  }

  .dropdown-frame {
    grid-area: dropdown;
  }

  .select-frame {
    grid-area: select;
  }

  .switch-frame {
    grid-area: switch;
  }

  .slider-frame {
    grid-area: slider;
  }

  .progress-frame {
    grid-area: progress;
  }

  .tab-list-frame {
    grid-area: tablist;
  }

  .list-frame {
    grid-area: list;
  }

  .tree-frame {
    grid-area: tree;
  }
</style>
