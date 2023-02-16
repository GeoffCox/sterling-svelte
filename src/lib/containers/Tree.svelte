<script lang="ts">
  import { v4 as uuid } from 'uuid';

  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import type { TreeNodeData, TreeForwardedEventHandlers } from './Tree.types';
  import { treeContextKey, treeNodeContextKey } from './Tree.constants';
  import Label from '$lib/display/Label.svelte';
  import TreeNode from './TreeNode.svelte';
  import TreeItem from './TreeItem.svelte';

  const inputId = uuid();

  let nodeIdCounter = 0;
  const getDefaultNodeId = (node: TreeNodeData<T>) => {
    if (node.nodeId) {
      return node.nodeId;
    } else {
      nodeIdCounter++;
      return `node-${nodeIdCounter}`;
    }
  };

  type T = $$Generic;

  export let composed = false;
  export let disabled = false;
  export let getNodeId = getDefaultNodeId;
  export let nodes: TreeNodeData<T>[] | undefined = undefined;
  export let selectedNodeId: string | undefined = undefined;
  export let expandedNodeIds: string[] = [];

  // ----- Context ----- //

  const selectedNodeIdStore = writable<string | undefined>(selectedNodeId);
  const expandedNodeIdStore = writable<string[]>(expandedNodeIds);
  const selectedNodeEventHandlersStore = writable<TreeForwardedEventHandlers>();

  setContext(treeContextKey, {
    expandedNodeIds: expandedNodeIdStore,
    getNodeId,
    selectedNodeId: selectedNodeIdStore,
    selectedNodeEventHandlers: selectedNodeEventHandlersStore
  });
  setContext(treeNodeContextKey, { parentNodeId: undefined, depth: 0 });

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseExpandCollapse = (expandedNodeIds: string[]) => {
    dispatch('expandCollapse', { expandedNodeIds });
  };

  const raiseSelect = (selectedNodeId: string | undefined) => {
    dispatch('select', { selectedNodeId });
  };

  // ----- Reactions ----- //

  $: {
    selectedNodeIdStore.set(selectedNodeId);
  }

  $: {
    selectedNodeId = $selectedNodeIdStore;
    raiseSelect($selectedNodeIdStore);
  }

  $: {
    expandedNodeIdStore.set(expandedNodeIds);
  }

  $: {
    expandedNodeIds = $expandedNodeIdStore;
    raiseExpandCollapse($expandedNodeIdStore);
  }

  // ----- Methods ----- //

  const getAllNodeIds = (node: TreeNodeData<T>, nodeIds: string[]) => {
    nodeIds.push(getNodeId(node));
    node.children?.forEach((child) => getAllNodeIds(child, nodeIds));
  };

  const setToggleNodeIdsToAll = () => {
    const nodeIds: string[] = [];
    nodes?.forEach((node) => getAllNodeIds(node, nodeIds));
    expandedNodeIds = nodeIds;
  };

  export const collapseAll = () => {
    expandedNodeIds = [];
  };

  export const expandAll = () => {
    setToggleNodeIdsToAll();
  };

  const onKeydown: TreeForwardedEventHandlers['onKeydown'] = (event) => {
    // Forward events from this tree to the selected tree node.
    // The selected tree node is best suited handle keyboard events.
    return $selectedNodeEventHandlersStore?.onKeydown?.(event);
  };
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  class="sterling-tree"
  class:disabled
  class:composed
  tabindex={!disabled ? 0 : undefined}
  on:keydown={onKeydown}
>
  {#if $$slots.label}
    <Label {disabled} for={inputId}>
      <slot name="label" />
    </Label>
  {/if}
  <div class="tree" role="tree">
    {#if nodes}
      {#each nodes as node}
        <TreeNode {disabled} {node} nodeId={getNodeId(node)}>
          <!-- 
          Forward the item slot into each tree node.
          It is cleanest to have a fragment for the TreeNode item slot to 
          capture the let params, then apply them to the Tree item slot. 
          -->
          <svelte:fragment
            slot="item"
            let:disabled
            let:expanded
            let:hasChildren
            let:depth
            let:node
            let:nodeId
            let:selected
          >
            <slot
              name="item"
              {disabled}
              {expanded}
              {hasChildren}
              {depth}
              {node}
              {nodeId}
              {selected}
            >
              <!-- 
              Svelte prevents conditionally applying slots.
              This repeats exact same item slot default for this node
              so the item slot is passed down the tree.
              -->
              <TreeItem {disabled} {expanded} {hasChildren} {depth} {node} {nodeId} {selected}>
                <svelte:fragment
                  let:disabled
                  let:expanded
                  let:hasChildren
                  let:depth
                  let:node
                  let:nodeId
                  let:selected
                >
                  <!-- This uses the nodeLabel slot for the TreeItem default slot. -->
                  <slot
                    name="nodeLabel"
                    {disabled}
                    {expanded}
                    {hasChildren}
                    {depth}
                    {node}
                    {nodeId}
                    {selected}>{nodeId}</slot
                  >
                </svelte:fragment>
              </TreeItem>
            </slot>
          </svelte:fragment>
        </TreeNode>
      {/each}
    {/if}
    <slot />
  </div>
</div>

<style>
  .sterling-tree {
    background-color: var(--stsv-Common__background-color);
    border-color: var(--stsv-Common__border-color);
    border-radius: var(--stsv-Common__border-radius);
    border-style: var(--stsv-Common__border-style);
    border-width: var(--stsv-Common__border-width);
    box-sizing: border-box;
    color: var(--stsv-Common__color);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    height: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-tree:hover {
    border-color: var(--stsv-Common__border-color--hover);
    color: var(--stsv-Common__color--hover);
  }

  .sterling-tree:focus-visible {
    border-color: var(--stsv-Common__border-color--focus);
    color: var(--stsv-Common__color--focus);
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  .sterling-tree.disabled {
    background-color: var(--stsv-Common__background-color--disabled);
    border-color: var(--stsv--Common__border-color--disabled);
    color: var(--stsv-Common__color--disabled);
    cursor: not-allowed;
  }

  .sterling-tree.composed,
  .sterling-tree:hover.composed,
  .sterling-tree:focus-visible.composed,
  .sterling-tree.disabled.composed {
    background: none;
    border: none;
    outline: none;
  }

  .sterling-tree > :global(label) {
    font-size: 0.7em;
    margin: 0.5em 0.7em;
  }

  .sterling-tree > :global(label):empty {
    margin: 0;
  }

  .tree {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    grid-row: 2 / span 1;
    overflow-x: hidden;
    overflow-y: scroll;
    outline: none;
    position: relative;
  }
</style>
