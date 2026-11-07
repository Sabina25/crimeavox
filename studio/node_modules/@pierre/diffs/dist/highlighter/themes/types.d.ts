import { ThemeLike } from "@pierre/theming";
import { ThemeRegistrationResolved } from "shiki";
import { Theme } from "@pierre/highlights";
//#region src/highlighter/themes/types.d.ts
/** Shared editor colors with the syntax theme for each supported backend. */
interface DiffsTheme extends ThemeLike {
  name: string;
  type: 'dark' | 'light';
  fg: string;
  bg: string;
  textmate?: ThemeRegistrationResolved;
  zed?: Theme;
  cssVariables?: CSSVariablesThemeOptions;
}
interface CSSVariablesThemeOptions {
  name?: string;
  variablePrefix?: string;
  variableDefaults?: Record<string, string>;
  fontStyle?: boolean;
}
//#endregion
export { CSSVariablesThemeOptions, DiffsTheme };
//# sourceMappingURL=types.d.ts.map