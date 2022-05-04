<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Button from '../lib/Button.svelte';
	import { lightTheme } from '../lib/useLightTheme';
	import { buttonTheme } from '../lib/useButtonTheme';
	import SvelteIcon from '../routes/_components/SvelteIcon.svelte';
	import ThemeDecorator from './ThemeDecorator.svelte'
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta title="Components/Button" component={Button} decorators={[() => ThemeDecorator]} />

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="default">
	<div use:lightTheme use:buttonTheme>
		<Button>Sterling</Button>
	</div>
</Story>

<Story name="disabled">
	<div use:lightTheme use:buttonTheme>
		<Button disabled>Sterling</Button>
	</div>
</Story>

<Story name="with icon">
	<div use:lightTheme use:buttonTheme>
		<Button>
			<SvelteIcon />
			<span> Sterling </span>
		</Button>
	</div>
</Story>
