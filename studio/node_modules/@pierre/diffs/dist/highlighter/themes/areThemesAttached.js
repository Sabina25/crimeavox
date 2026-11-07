import { resolveHighlighterType } from "../highlighterType.js";
import { getThemes } from "../../utils/getThemes.js";
import { createDiffsThemeResolver } from "./themeResolver.js";
//#region src/highlighter/themes/areThemesAttached.ts
function areThemesAttached(themes, highlighter = resolveHighlighterType()) {
	if (typeof highlighter !== "string" && highlighter.isDisposed) return false;
	return (typeof highlighter === "string" ? createDiffsThemeResolver(highlighter) : highlighter.themeResolver).hasResolvedThemes(getThemes(themes));
}
//#endregion
export { areThemesAttached };

//# sourceMappingURL=areThemesAttached.js.map