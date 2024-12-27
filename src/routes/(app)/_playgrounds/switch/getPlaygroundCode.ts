export const getPlaygroundCode = (props: {
  checked: boolean | null | undefined;
  _class: string;
  customLabels: boolean | null | undefined;
  disabled: boolean | null | undefined;
  offLabelText?: string;
  onLabelText?: string;
  vertical: boolean | null | undefined;
}) => {
  const propList: string[] = [];
  if (props.checked) {
    propList.push(`checked`);
  }
  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (!props.customLabels && props.offLabelText) {
    propList.push(`offLabelText="${props.offLabelText.trim()}"`);
  }
  if (!props.customLabels && props.onLabelText) {
    propList.push(`onLabelText="${props.onLabelText.trim()}"`);
  }
  if (props.vertical) {
    propList.push(`vertical`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  if (props.customLabels) {
    return `<script lang="ts">
  import { Switch } from '@geoffcox/sterling-svelte';
</script>

<Switch${propsText}>
    {#snippet offLabelSnippet()}
      <!-- TODO: Put custom off label UI here -->
    {/snippet}
    {#snippet onLabelSnippet()}
      <!-- TODO: Put custom on label UI here -->
    {/snippet}
</Select>
`;
  }

  return `<script lang="ts">
  import { Switch } from '@geoffcox/sterling-svelte';
</script>

<Switch${propsText} />
`;
};
