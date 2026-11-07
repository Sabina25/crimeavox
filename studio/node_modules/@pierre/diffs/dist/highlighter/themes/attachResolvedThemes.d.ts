import { DiffsTheme } from "./types.js";
import { DiffsHighlighter } from "../DiffsHighlighter.js";
import { DiffsThemeNames } from "../../types.js";
//#region src/highlighter/themes/attachResolvedThemes.d.ts
/** Seed themes received from the main thread into the worker's backend resolver. */
declare function attachResolvedThemes(themes: DiffsThemeNames | DiffsTheme | (DiffsThemeNames | DiffsTheme)[], highlighter: DiffsHighlighter): void;
//#endregion
export { attachResolvedThemes };
//# sourceMappingURL=attachResolvedThemes.d.ts.map