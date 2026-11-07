import { DiffsHighlighter } from "./DiffsHighlighter.js";
import { DiffsThemeNames, HighlighterTypes, SupportedLanguages, ThemesType } from "../types.js";
import { HighlighterDisposedError, getHighlighterType } from "./highlighterType.js";
//#region src/highlighter/shared_highlighter.d.ts
interface HighlighterOptions {
  themes: DiffsThemeNames[];
  langs: SupportedLanguages[];
  preferredHighlighter?: HighlighterTypes;
}
/**
 * Creates an instance the caller must dispose. Defaults to the active type
 * or DEFAULT_HIGHLIGHTER; rejects if a different type is already active.
 */
declare function createHighlighter(type?: HighlighterTypes): Promise<DiffsHighlighter>;
declare function getSharedHighlighter({ themes, langs, preferredHighlighter }: HighlighterOptions): Promise<DiffsHighlighter>;
declare function isHighlighterLoaded(): boolean;
interface GetHighlighterIfLoadedProps {
  theme?: DiffsThemeNames | ThemesType;
  lang?: SupportedLanguages;
  langs?: SupportedLanguages[];
}
/**
 * Returns undefined if the theme or language is not loaded.
 */
declare function getHighlighterIfLoaded({ theme, lang, langs }?: GetHighlighterIfLoadedProps): DiffsHighlighter | undefined;
declare function isHighlighterLoading(): boolean;
declare function isHighlighterNull(): boolean;
declare function preloadHighlighter(options: HighlighterOptions): Promise<void>;
/**
 * Disposes an already loaded shared instance synchronously and clears caches.
 * Instances from createHighlighter() must be disposed separately before
 * switching types.
 */
declare function disposeHighlighter(): Promise<void>;
//#endregion
export { HighlighterDisposedError, HighlighterOptions, createHighlighter, disposeHighlighter, getHighlighterIfLoaded, getHighlighterType, getSharedHighlighter, isHighlighterLoaded, isHighlighterLoading, isHighlighterNull, preloadHighlighter };
//# sourceMappingURL=shared_highlighter.d.ts.map