<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import Link from '$lib/Link.svelte';

  type NavItem = {
    name: string;
    url: string;
  };

  type NavSection = {
    name: string;
    items: NavItem[];
  };

  const sections: NavSection[] = [
    {
      name: 'GETTING STARTED',
      items: [
        {
          name: 'Introduction',
          url: '/'
        },
        {
          name: 'Sterling Theme',
          url: '/topics/theme'
        },
        {
          name: 'Architecture',
          url: '/topics/architecture'
        },
        {
          name: 'Change Log',
          url: '/topics/changelog'
        }
      ]
    },
    {
      name: 'COMPONENTS',
      items: [
        { name: 'Button', url: '/components/button' },
        { name: 'Callout', url: '/components/callout' },
        { name: 'Checkbox', url: '/components/checkbox' },
        { name: 'Dialog', url: '/components/dialog' },
        { name: 'Dropdown', url: '/components/dropdown' },
        { name: 'Input', url: '/components/input' },
        { name: 'Label', url: '/components/label' },
        { name: 'Link', url: '/components/link' },
        { name: 'List', url: '/components/list' },
        { name: 'ListItem', url: '/components/listitem' },
        { name: 'Menu', url: '/components/menu' },
        { name: 'MenuBar', url: '/components/menubar' },
        { name: 'MenuButton', url: '/components/menubutton' },
        { name: 'MenuItem', url: '/components/menuitem' },
        { name: 'MenuSeparator', url: '/components/menuseparator' },
        { name: 'Popover', url: '/components/popover' },
        { name: 'Progress', url: '/components/progress' },
        { name: 'Radio', url: '/components/radio' },
        { name: 'Select', url: '/components/select' },
        { name: 'Slider', url: '/components/slider' },
        { name: 'Switch', url: '/components/switch' },
        { name: 'Tab', url: '/components/tab' },
        { name: 'TabList', url: '/components/tablist' },
        { name: 'TextArea', url: '/components/textarea' },
        { name: 'Tooltip', url: '/components/tooltip' },
        { name: 'Tree', url: '/components/tree' },
        { name: 'TreeChevron', url: '/components/treechevron' },
        { name: 'TreeItem', url: '/components/treeitem' }
      ]
    },
    {
      name: 'INFRASTRUCTURE',
      items: [
        { name: 'Actions', url: '/topics/actions' },
        { name: 'Media Queries', url: '/topics/mediaqueries' }
      ]
    }
  ];
</script>

<div class="nav">
  {#each sections as section}
    <div class="section">
      <div class="section-name">{section.name}</div>
      <div class="items">
        {#each section.items as item}
          {#if $page.url.pathname === item.url}
            <Link href={`${base}${item.url}`}>{item.name}</Link>
          {:else}
            <Link class="ghost" href={`${base}${item.url}`}>{item.name}</Link>
          {/if}
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .section:not(:first-child) {
    padding-top: 2em;
  }
  .section-name {
    font-size: 0.8em;
  }

  .section .items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 0.5em;
    padding-top: 0.5em;
    font-size: 0.9em;
  }

  .section :global(a) {
    display: block;
  }
</style>
