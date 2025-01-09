import type { TextAreaResize } from '$lib';

export const getPlaygroundCode = (props: {
  autoHeight: boolean;
  _class: string;
  disabled: boolean;
  placeholder: string;
  resize: TextAreaResize;
}) => {
  const propList: string[] = [];
  propList.push('bind:value');
  if (props.autoHeight) {
    propList.push(`autoHeight`);
  }
  if (props._class) {
    propList.push(`class="${props._class.trim()}"`);
  }
  if (props.disabled) {
    propList.push(`disabled`);
  }
  if (props.resize) {
    propList.push(`resize="${props.resize}"`);
  }

  const propsText = propList.length > 0 ? ` ${propList.join(' ')}` : '';

  return `<script lang="ts">
  import { TextArea } from '@geoffcox/sterling-svelte';

  let value : string = '';
</script>

<TextArea${propsText} />
`;
};
