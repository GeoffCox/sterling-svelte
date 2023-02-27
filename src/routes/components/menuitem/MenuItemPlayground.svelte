<script lang="ts">
  import Checkbox from '$lib/inputs/Checkbox.svelte';
  import Playground from '../Playground.svelte';

  import MenuItem from '$lib/containers/MenuItem.svelte';
  import MenuSeparator from '$lib/containers/MenuSeparator.svelte';

  let exampleRef: any;
  let disabled = false;

  let renderChoice: 'performance' | 'quality' = 'performance';
  let autoSave: boolean = false;
</script>

<Playground bind:this={exampleRef}>
  <svelte:fragment slot="component">
    <MenuItem
      value="file"
      {disabled}
      text="File"
      on:close={(event) => exampleRef.recordEvent(`close '${event.detail.value}'`)}
      on:open={(event) => exampleRef.recordEvent(`open '${event.detail.value}'`)}
      on:select={(event) => exampleRef.recordEvent(`select '${event.detail.value}'`)}
    >
      <MenuItem value="file-new" text="New" />
      <MenuItem value="file-open" text="Open..." />
      <MenuItem value="file-save" text="Save" />
      <MenuItem value="file-save-as" text="Save As..." disabled />
      <MenuSeparator />
      <MenuItem
        value="auto-save"
        role="menuitemcheckbox"
        text="Auto Save"
        checked={autoSave}
        on:select={() => (autoSave = !autoSave)}
      />
      <MenuSeparator />
      <MenuItem
        value="prefer-performance"
        role="menuitemradio"
        text="Performance Mode"
        checked={renderChoice === 'performance'}
        on:select={() => (renderChoice = 'performance')}
      />
      <MenuItem
        value="prefer-quality"
        role="menuitemradio"
        text="Quality Mode"
        checked={renderChoice === 'quality'}
        on:select={() => (renderChoice = 'quality')}
      />
      <MenuSeparator />
      <MenuItem value="file-share" text="Share">
        <MenuItem value="file-share-email" text="E-mail" />
        <MenuItem value="file-share-text" text="Text Messaging" />
        <MenuItem value="file-share-internet" text="Entire Internet" />
      </MenuItem>

      <MenuSeparator />
      <MenuItem value="file-quit" text="Quit" />
    </MenuItem>
  </svelte:fragment>>
  <svelte:fragment slot="options">
    <Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
  </svelte:fragment>
</Playground>
