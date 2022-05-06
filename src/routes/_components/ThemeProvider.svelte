<script lang="ts">
	import { lightTheme } from '$lib/Themes/useLightTheme';
	import { darkTheme } from '$lib/Themes/useDarkTheme';
	export let theme: string = 'light';
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
