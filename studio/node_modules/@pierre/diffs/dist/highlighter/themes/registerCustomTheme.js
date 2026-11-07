import { customThemes } from "./themeResolver.js";
//#region src/highlighter/themes/registerCustomTheme.ts
function registerCustomTheme(themeName, loader, type = "textmate") {
	const themes = customThemes.get(themeName) ?? {};
	if (themes[type] != null) {
		console.error("SharedHighlight.registerCustomTheme: theme name and type already registered", themeName, type);
		return;
	}
	themes[type] = loader;
	customThemes.set(themeName, themes);
}
//#endregion
export { registerCustomTheme };

//# sourceMappingURL=registerCustomTheme.js.map