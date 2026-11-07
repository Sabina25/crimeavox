import { resolveHighlighterType } from "../highlighterType.js";
import { createDiffsThemeResolver } from "./themeResolver.js";
//#region src/highlighter/themes/getResolvedOrResolveTheme.ts
function getResolvedOrResolveTheme(themeName, backend = resolveHighlighterType()) {
	return createDiffsThemeResolver(backend).getResolvedOrResolveTheme(themeName);
}
//#endregion
export { getResolvedOrResolveTheme };

//# sourceMappingURL=getResolvedOrResolveTheme.js.map