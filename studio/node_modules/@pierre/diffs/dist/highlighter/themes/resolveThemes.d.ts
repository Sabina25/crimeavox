import { DiffsTheme } from "./types.js";
import { DiffsThemeNames, HighlighterTypes } from "../../types.js";
//#region src/highlighter/themes/resolveThemes.d.ts
declare function resolveThemes(themes: DiffsThemeNames[], backend?: HighlighterTypes): Promise<DiffsTheme[]>;
//#endregion
export { resolveThemes };
//# sourceMappingURL=resolveThemes.d.ts.map