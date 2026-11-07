import { DiffsTheme } from "./types.js";
import { HighlighterTypes } from "../../types.js";
import { ThemeLoader, ThemeResolver } from "@pierre/theming";
import { ThemeRegistration } from "shiki";
import { Theme, ThemeFamily } from "@pierre/highlights";
//#region src/highlighter/themes/themeResolver.d.ts
type CustomThemeLoader = ThemeLoader<ThemeRegistration | DiffsTheme | Theme | ThemeFamily>;
declare const customThemes: Map<string, Partial<Record<'textmate' | 'zed' | 'diffs', CustomThemeLoader>>>;
/** Keep caches separate because the same name can have TextMate and Zed palettes. */
declare function createDiffsThemeResolver(backend: HighlighterTypes): ThemeResolver<DiffsTheme>;
//#endregion
export { CustomThemeLoader, createDiffsThemeResolver, customThemes };
//# sourceMappingURL=themeResolver.d.ts.map