import { resolveHighlighterType } from "../highlighter/highlighterType.js";
import { getThemes } from "./getThemes.js";
//#region src/utils/getHighlighterOptions.ts
function getHighlighterOptions(lang, { theme, preferredHighlighter }) {
	return {
		langs: Array.isArray(lang) ? lang : [lang ?? "text"],
		themes: getThemes(theme),
		preferredHighlighter: resolveHighlighterType(preferredHighlighter)
	};
}
//#endregion
export { getHighlighterOptions };

//# sourceMappingURL=getHighlighterOptions.js.map