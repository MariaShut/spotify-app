// чтобы storybook отображал со стилями в переменных

declare module '*.css' {
	const content: { [className: string]: string };
	export default content;
}

declare module '*.module.css' {
	const content: { [className: string]: string };
	export default content;
}
