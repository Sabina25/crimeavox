import { HighlighterTypes } from "../types.js";
//#region src/utils/resolvePreferredHighlighter.d.ts
/**
 * Undefined lets the caller use the active type or the default.
 */
declare function resolvePreferredHighlighter(workerManager: {
  getPreferredHighlighter(): HighlighterTypes;
} | undefined, options: {
  preferredHighlighter?: HighlighterTypes | undefined;
}): HighlighterTypes | undefined;
//#endregion
export { resolvePreferredHighlighter };
//# sourceMappingURL=resolvePreferredHighlighter.d.ts.map