import { DiffsTheme } from "./types.js";
import { DiffsThemeNames, HighlighterTypes } from "../../types.js";
//#region src/highlighter/themes/resolveTheme.d.ts
declare function resolveTheme(themeName: DiffsThemeNames, backend?: HighlighterTypes): Promise<DiffsTheme>;
//#endregion
export { resolveTheme };
//# sourceMappingURL=resolveTheme.d.ts.map