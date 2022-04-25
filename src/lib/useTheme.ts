export const theme = (node: HTMLElement, theme: Record<string, string>) => {
	const themeStyle = Object.keys(theme)
		.map((key) => `${key}:${theme[key]}`)
		.join(';');

	const style = node.getAttribute('style');
	node?.setAttribute('style', themeStyle);

	return {
		destroy() {
			style ? node.setAttribute('style', style): node.removeAttribute('style');
		}
	};
};
