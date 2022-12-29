declare namespace svelte.JSX {
	interface DOMAttributes<T> {
		onclick_outside?: (e: CustomEvent) => void;
	}
}
