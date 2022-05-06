<script lang="ts">
	import { darkTheme } from '$lib/Themes/useDarkTheme';
	import { buttonTheme } from '$lib/Buttons/useButtonTheme';
	export let theme: string = 'light';
</script>

<div class="theme-provider">
	{#if theme === 'light'}
		<div use:darkTheme use:buttonTheme>
			<slot />
		</div>
	{:else}
		<div use:buttonTheme>
			<slot />
		</div>
	{/if}
</div>

<style>
</style>
