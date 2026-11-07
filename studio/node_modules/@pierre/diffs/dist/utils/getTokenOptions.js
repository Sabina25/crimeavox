import { formatCSSVariablePrefix } from "./formatCSSVariablePrefix.js";
//#region src/utils/getTokenOptions.ts
function getTokenOptions(lang, theme, tokenizeMaxLineLength) {
	return {
		lang,
		...typeof theme === "string" ? { theme } : { themes: theme },
		defaultColor: false,
		cssVariablePrefix: formatCSSVariablePrefix("token"),
		tokenizeMaxLineLength,
		tokenizeTimeLimit: 0
	};
}
//#endregion
export { getTokenOptions };

//# sourceMappingURL=getTokenOptions.js.map