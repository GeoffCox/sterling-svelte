<script lang="ts">
  import { v4 as uuid } from 'uuid';

  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import type { TreeNodeData } from './Tree.types';
  import { treeContextKey, treeNodeContextKey } from './Tree.constants';
  import Label from '$lib/display/Label.svelte';
  import TreeNode from './TreeNode.svelte';
  import TreeItemChevron from './TreeNodeChevron.svelte';
  import TreeNodeItem from './TreeNodeItem.svelte';

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

  export let disabled = false;
  export let composed = false;
  export let nodes: TreeNodeData<T>[] | undefined = undefined;
  export let selectedNodeId: string | undefined = undefined;
  export let getNodeId = getDefaultNodeId;

  // ----- Events ----- //
  const dispatch = createEventDispatcher();

  const raiseExpandedChanged = () => {
    dispatch('expandedChanged');
  };

  const raiseSelectedChanged = () => {
    dispatch('selectedChanged');
  };

  const expandedNodeIdsStore = writable<string[]>([]);
  const selectedNodeIdStore = writable<string | undefined>(selectedNodeId);

  setContext(treeContextKey, {
    getNodeId,
    expandedNodeIds: expandedNodeIdsStore,
    selectedNodeId: selectedNodeIdStore
  });
  setContext(treeNodeContextKey, { parentNodeId: undefined, depth: 0 });

  $: {
    selectedNodeIdStore.set(selectedNodeId);
  }

  $: {
    selectedNodeId = $selectedNodeIdStore;
  }

  $: $expandedNodeIdsStore, raiseExpandedChanged();
  $: $selectedNodeIdStore, raiseSelectedChanged();
</script>

<div class="sterling-tree" class:disabled class:composed>
  {#if $$slots.label}
    <Label {disabled} for={inputId}>
      <slot name="label" />
    </Label>
  {/if}
  <div class="tree">
    {#if nodes}
      {#each nodes as node}
        <TreeNode {disabled} {node} nodeId={getNodeId(node)}>
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
              <TreeNodeItem {disabled} {expanded} {hasChildren} {depth} {node} {nodeId} {selected}>
                <svelte:fragment
                  let:disabled
                  let:expanded
                  let:hasChildren
                  let:depth
                  let:node
                  let:nodeId
                  let:selected
                >
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
              </TreeNodeItem>
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
    background-color: var(--Common__background-color);
    border-color: var(--Common__border-color);
    border-radius: var(--Common__border-radius);
    border-style: var(--Common__border-style);
    border-width: var(--Common__border-width);
    box-sizing: border-box;
    color: var(--Common__color);
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
    border-color: var(--Common__border-color--hover);
    color: var(--Common__color--hover);
  }

  .sterling-tree:focus-within {
    border-color: var(--Common__border-color--focus);
    color: var(--Common__color--focus);
    outline-color: var(--Common__outline-color);
    outline-offset: var(--Common__outline-offset);
    outline-style: var(--Common__outline-style);
    outline-width: var(--Common__outline-width);
  }

  .sterling-tree.disabled {
    background-color: var(--Common__background-color--disabled);
    border-color: var(---Common__border-color--disabled);
    color: var(--Common__color--disabled);
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
