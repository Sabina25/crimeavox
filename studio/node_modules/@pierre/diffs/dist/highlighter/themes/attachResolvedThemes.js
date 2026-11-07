//#region src/highlighter/themes/attachResolvedThemes.ts
/** Seed themes received from the main thread into the worker's backend resolver. */
function attachResolvedThemes(themes, highlighter) {
	for (const theme of Array.isArray(themes) ? themes : [themes]) {
		const resolved = typeof theme === "string" ? highlighter.themeResolver.getResolvedThemes([theme])[0] : theme;
		highlighter.themeResolver.seedResolvedTheme(resolved.name, resolved);
	}
}
//#endregion
export { attachResolvedThemes };

//# sourceMappingURL=attachResolvedThemes.js.map