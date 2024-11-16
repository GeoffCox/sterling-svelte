export const getPlaygroundCode = (props: {
  checked: boolean | null | undefined;
  disabled: boolean | null | undefined;
  offText?: string;
  onText?: string;
  customLabels: boolean | null | undefined;
  variant: string;
  vertical: boolean | null | undefined;
}) => {
  const propList: string[] = [];
  if (props.checked) {
    propList.push(`checked`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.offText) {
    propList.push(`offText="${props.offText.trim()}"`);
  }
  if (props.onText) {
    propList.push(`onText="${props.onText.trim()}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
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
    <svelte:fragment slot="offLabel" let:checked let:disabled>
      <!-- TODO: Put custom off label UI here -->
    </div>
    <div slot="onLabel" let:checked let:disabled>
      <!-- TODO: Put custom on label UI here -->
    </div>
</Select>
`;
  }

  return `<script lang="ts">
  import { Switch } from '@geoffcox/sterling-svelte';
</script>

<Switch${propsText} />
`;
};
