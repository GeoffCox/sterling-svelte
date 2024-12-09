export const getPlaygroundCode = (props: {
  backdropCloses: boolean | null | undefined;
  formSubmit: boolean | null | undefined;
  _class: string;
}) => {
  const propList: string[] = [];

  if (props.backdropCloses) {
    propList.push('backdropCloses');
  }

  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }

  propList.push('bind:open');
  propList.push('bind:returnValue');

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Dialog } from '@geoffcox/sterling-svelte';
</script>

<Dialog${propsText}>
  <!-- Add content snippet or header, body, and footer snippets -->
</Dialog>`;
};
