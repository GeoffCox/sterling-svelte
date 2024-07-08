import type { TextAreaResize } from '$lib';

export const getPlaygroundCode = (props: {
  autoHeight: boolean;
  disabled: boolean;
  placeholder: string;
  resize: TextAreaResize;
  variant: string;
}) => {
  const propList: string[] = [];
  propList.push('bind:value');
  if (props.autoHeight) {
    propList.push(`autoHeight`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.resize) {
    propList.push(`resize="${props.resize.trim()}"`);
  }
  if (props.variant) {
    propList.push(`variant="${props.variant.trim()}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { TextArea } from '@geoffcox/sterling-svelte';

  let value : string = '';
</script>

<TextArea${propsText} />
`;
};
