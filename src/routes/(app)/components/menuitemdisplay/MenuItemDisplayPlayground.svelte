<script lang="ts">
  import type { MenuItemRole } from '$lib/MenuItem.types';

  import Playground from '../Playground.svelte';

  import Checkbox from '$lib/Checkbox.svelte';
  import Label from '$lib/Label.svelte';
  import Input from '$lib/Input.svelte';
  import MenuItemDisplay from '$lib/MenuItemDisplay.svelte';
  import Select from '$lib/Select.svelte';
  import VariantInput from '../../_shared/VariantInput.svelte';
  import { MENU_ITEM_ROLES } from '$lib';
  import ListItem from '$lib/ListItem.svelte';

  let exampleRef: any;

  let checked = false;
  let disabled = false;
  let hasChildren = true;
  let isMenuBarItem = false;
  let text = 'sterling-svelte';
  let menuItemRole: MenuItemRole = 'menuitem';
  let variant: string = '';
</script>

<Playground bind:this={exampleRef}>
  <div class="component" slot="component">
    <MenuItemDisplay {checked} {disabled} {hasChildren} {isMenuBarItem} {menuItemRole} {variant}>
      {text}
    </MenuItemDisplay>
  </div>
  <svelte:fragment slot="props">
    <Checkbox bind:checked>checked</Checkbox>
    <Checkbox bind:checked={disabled}>disabled</Checkbox>
    <Checkbox bind:checked={hasChildren}>hasChildren</Checkbox>
    <Checkbox bind:checked={isMenuBarItem}>isMenuBarItem</Checkbox>
    <Label text="menuItemRole" forwardClick>
      <Select bind:selectedValue={menuItemRole}>
        {#each MENU_ITEM_ROLES as role}
          <ListItem value={role}>{role}</ListItem>
        {/each}
      </Select>
    </Label>
    <VariantInput bind:variant availableVariants={[]} />
  </svelte:fragment>
  <svelte:fragment slot="tweaks">
    <Label text="text">
      <Input bind:value={text} />
    </Label>
  </svelte:fragment>
</Playground>
