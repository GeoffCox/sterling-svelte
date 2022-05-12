<script lang="ts">
	import { lightTheme } from '$lib/themes/us$lib/themes/useLightThemearkTheme } from '$lib/themes/u$lib/themes/useDarkThemet theme: string = 'light';
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
