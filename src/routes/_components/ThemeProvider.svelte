<script lang="ts">
	import { lightTheme } from '$lib/themes/useLightTheme';
	import { darkTheme } from '$lib/themes/useDarkTheme';

	export let theme: string = "light";
</script>

<div class="theme-provider">
	{#if theme === 'light'}
		<div use:darkTheme>
			<slot />
		</div>
	{:else}
		<div use:lightTheme>
			<slot />
		</div>
	{/if}
</div>

<style>
</style>
