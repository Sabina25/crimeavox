import { HighlighterTypes } from "../types.js";
//#region src/highlighter/highlighterType.d.ts
declare class HighlighterDisposedError extends Error {
  constructor();
}
declare function getHighlighterType(): HighlighterTypes | undefined;
declare function resolveHighlighterType(type?: HighlighterTypes): HighlighterTypes;
declare function assertHighlighterType(type: HighlighterTypes): void;
declare function acquireHighlighterType(type: HighlighterTypes): void;
declare function releaseHighlighterType(): void;
//#endregion
export { HighlighterDisposedError, acquireHighlighterType, assertHighlighterType, getHighlighterType, releaseHighlighterType, resolveHighlighterType };
//# sourceMappingURL=highlighterType.d.ts.map