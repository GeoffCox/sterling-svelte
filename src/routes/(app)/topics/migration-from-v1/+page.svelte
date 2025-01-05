<script>
  import Link from '$lib/Link.svelte';
</script>

<h1>Migrating from v1 to v2</h1>

<p>
  Sterling-svelte 2 is built on Svelte 5, while sterling-svelte 1 is built on Svelte 4. There are
  breaking changes between Svelte 4 and 5. You will need to deal with these breaking changes when
  moving from sterling-svelte 1 to 2.
</p>

<p>
  Reading the <Link href="https://svelte.dev/docs/svelte/v5-migration-guide"
    >Svelte 5 migration guide</Link
  >
  is highly recommended.
</p>

<h2>let/$ =&gt; runes</h2>

<p>
  Components use <code>$state</code>, <code>$derived</code>, and <code>$effect</code> rather than
  the <code>let</code> and <code>$:</code>. While not technically required, prefer to use runes in
  your components and pages that pass props to sterling-svelte components.
</p>

<h2>export let =&gt; props</h2>

<p>
  Each component defines their props types that are intersected with the HTML attributes for the
  primary HTML element they render. The <code>$props</code> rune is used to access props and props are
  passed to the primary HTML element.
</p>

<p></p>

<h2>events =&gt; callbacks</h2>

<p>
  Svelte 5 handles events from HTML elements using on<i>event</i> callbacks. These do not change the
  case of the event name (e.g. <code>click</code> is mapped to <code>onclick</code>). Components in
  sterling-svelte, camelCase component event callbacks to distiguish them from HTML events. For
  example, the List has an onSelect callback.
</p>

<h2>slots =&gt; snippets</h2>

<p>
  Following Svelte's move to snippets, components use the <code>children</code> snippet rather than the
  default slot. Components also provide named snippets often with default content rather than named slots.
</p>

<p>
  Some components will provide a snippet property than can be a string or a snippet. This allows you
  to pass a string directly than have to write the <code>{`{#snippet}{/snippet}`}</code>
  syntax withing the component tags. For example, Switch has <code>offLabel</code> and
  <code>onLabel</code>
  properties that are
  <code>string | Snippet</code>.
</p>

<h2>variant =&gt; class</h2>

<p>
  Svelte 4 made it difficult to export a <code>class</code> property from components. This resulted
  in sterling-svelte 1 exporting a <code>variant</code> property on every component that was
  appended to <code>class</code>
  when rendered. With Svelte 5, components can accept <code>class</code> as a property and the variant
  property has been removed.
</p>

<h2>status props =&gt; class</h2>

<p>
  Some components in sterling-svelte 1 had properties for indicating status. The Label and Progress
  components had a status property that could be 'none', 'error', 'warning', 'info', or 'success'.
  Now, components have removed that property in favor of passing classes on the <code>class</code> property.
</p>

<h2>context: stores =&gt; props</h2>

<p>
  Components that need to communicate across hierarchy used Svelte's <code>getContext</code> and
  <code>setContext</code>. To allow parent components to change values and child components to
  update when values changed, context properties were often Svelte stores.
</p>

<p>
  With Svelte 5, context properties are plain Javascript values. To support property changes, the
  parent creates the context object with getters and setters. This allows values instantiated with <code
    >$state</code
  > or values that are props of the parent component to allow the child to update when values change.
</p>
