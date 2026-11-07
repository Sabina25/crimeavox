import { resolveHighlighterType } from "../highlighterType.js";
import { createDiffsThemeResolver } from "./themeResolver.js";
//#region src/highlighter/themes/getResolvedThemes.ts
function getResolvedThemes(themeNames, backend = resolveHighlighterType()) {
	return createDiffsThemeResolver(backend).getResolvedThemes(themeNames);
}
//#endregion
export { getResolvedThemes };

//# sourceMappingURL=getResolvedThemes.js.map