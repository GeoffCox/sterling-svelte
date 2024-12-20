<script lang="ts">
  import CodeEventIcon from '../../_shared/icons/CodeEventIcon.svelte';
  import CodeMethodIcon from '../../_shared/icons/CodeMethodIcon.svelte';
  import CodePropertyIcon from '../../_shared/icons/CodePropertyIcon.svelte';
  import CodeTypeIcon from '../../_shared/icons/CodeTypeIcon.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: docs = data.docs;

  $: props = data.docs.props;
  $: events = data.docs.events;
  $: methods = data.docs.methods;
  $: types = data.docs.types;
</script>

<div>
  <h1>{docs.name}</h1>
  <div>{docs.description}</div>

  {#if docs.usage}
    <br />
    <svelte:component this={docs.usage} />
  {/if}

  <br />
  {#if props || events || methods}
    <h2>Members</h2>
    {#if props}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Property Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {#each props as item}
            <tr>
              <td class="icon"><CodePropertyIcon /></td>
              <td class="name">{item.name}</td>
              <td class="type">{item.type || ''}</td>
              <td class="default">{item.default || ''}</td>
              <td class="comments">{item.comment || ''}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <br />
    {/if}
    {#if events}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Event Name</th>
            <th>Data</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {#each events as item}
            <tr>
              <td class="icon"><CodeEventIcon /></td>
              <td class="name">{item.name}</td>
              <td class="data">{item.data || ''}</td>
              <td class="comments">{item.comment || ''}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <br />
    {/if}
    {#if methods}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Method Name</th>
            <th>Parameters</th>
            <th>Return Type</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {#each methods as item}
            <tr>
              <td class="icon"><CodeMethodIcon /></td>
              <td class="name">{item.name}</td>
              <td class="params">{item.params || ''}</td>
              <td class="return">{item.returnType || ''}</td>
              <td class="comments">{item.comment || ''}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <br />
    {/if}
  {/if}
  {#if types}
    <h2>Types</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Type Name</th>
          <th>Definition</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {#each types as item}
          <tr>
            <td class="icon"><CodeTypeIcon /></td>
            <td class="name">{item.name}</td>
            <td class="definition">{item.definition || ''}</td>
            <td class="comments">{item.comment || ''}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <br />
  {/if}
  {#if docs.comments}
    <h2>Considerations</h2>
    <ul>
      {#each docs.comments as comment}
        <li>{comment}</li>
      {/each}
    </ul>
  {/if}
  {#if docs.anatomy}
    <h2>Anatomy</h2>
    <pre>{docs.anatomy}</pre>
  {/if}
</div>

<style>
  table {
    width: 100%;
  }

  .icon {
    width: 24px;
    height: 24px;
    text-align: center;
  }
</style>
