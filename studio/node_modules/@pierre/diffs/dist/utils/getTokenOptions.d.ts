import { CodeToTokensOptions } from "../highlighter/types.js";
import { DiffsThemeNames, SupportedLanguages, ThemesType } from "../types.js";
//#region src/utils/getTokenOptions.d.ts
declare function getTokenOptions(lang: SupportedLanguages, theme: DiffsThemeNames | ThemesType, tokenizeMaxLineLength: number | undefined): CodeToTokensOptions;
//#endregion
export { getTokenOptions };
//# sourceMappingURL=getTokenOptions.d.ts.map