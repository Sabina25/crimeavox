import { resolveHighlighterType } from "../highlighterType.js";
import { createDiffsThemeResolver } from "./themeResolver.js";
//#region src/highlighter/themes/resolveThemes.ts
function resolveThemes(themes, backend = resolveHighlighterType()) {
	return createDiffsThemeResolver(backend).resolveThemes(themes);
}
//#endregion
export { resolveThemes };

//# sourceMappingURL=resolveThemes.js.map