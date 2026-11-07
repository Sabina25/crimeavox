import { resolveHighlighterType } from "../highlighterType.js";
import { createDiffsThemeResolver } from "./themeResolver.js";
//#region src/highlighter/themes/resolveTheme.ts
function resolveTheme(themeName, backend = resolveHighlighterType()) {
	return createDiffsThemeResolver(backend).resolveTheme(themeName);
}
//#endregion
export { resolveTheme };

//# sourceMappingURL=resolveTheme.js.map