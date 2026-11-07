import { DiffsTheme } from "./types.js";
import { CustomThemeLoader } from "./themeResolver.js";
import { ThemeLoader } from "@pierre/theming";
import { ThemeRegistration } from "shiki";
import { Theme, ThemeFamily } from "@pierre/highlights";
//#region src/highlighter/themes/registerCustomTheme.d.ts
/** Register a lazy TextMate, Zed, or shared Diffs theme loader. */
declare function registerCustomTheme(themeName: string, loader: ThemeLoader<ThemeRegistration>, type?: 'textmate'): void;
declare function registerCustomTheme(themeName: string, loader: ThemeLoader<Theme | ThemeFamily>, type: 'zed'): void;
declare function registerCustomTheme(themeName: string, loader: ThemeLoader<DiffsTheme>, type: 'diffs'): void;
//#endregion
export { type CustomThemeLoader, registerCustomTheme };
//# sourceMappingURL=registerCustomTheme.d.ts.map