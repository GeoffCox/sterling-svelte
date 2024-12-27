export const getPlaygroundCode = (props: {
  _class: string;
  disabled?: boolean | null | undefined;
  selected?: boolean | null | undefined;
  text?: string;
  value: string;
  vertical?: boolean | null | undefined;
}) => {
  const propList: string[] = [];
  if (props.disabled) {
    if (props._class) {
      propList.push(`class="${props._class.trim()}"`);
    }
    propList.push(`disabled`);
  }
  if (props.selected) {
    propList.push(`selected`);
  }
  if (props.text) {
    propList.push(`text="${props.text.trim()}"`);
  }
  if (props.value) {
    propList.push(`value="${props.value.trim()}"`);
  }
  if (props.vertical) {
    propList.push(`vertical`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { Tab } from '@geoffcox/sterling-svelte';
</script>

<Tab${propsText} />
`;
};
