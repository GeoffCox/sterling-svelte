<script lang="ts">
	import { darkTheme } from '$lib/useDarkTheme';
	import { buttonTheme } from '$lib/useButtonTheme';
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
