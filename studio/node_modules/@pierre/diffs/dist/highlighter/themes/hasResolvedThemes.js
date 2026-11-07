import { resolveHighlighterType } from "../highlighterType.js";
import { createDiffsThemeResolver } from "./themeResolver.js";
//#region src/highlighter/themes/hasResolvedThemes.ts
function hasResolvedThemes(themeNames, backend = resolveHighlighterType()) {
	return createDiffsThemeResolver(backend).hasResolvedThemes(themeNames);
}
//#endregion
export { hasResolvedThemes };

//# sourceMappingURL=hasResolvedThemes.js.map