import { DiffsHighlighter } from "../highlighter/DiffsHighlighter.js";
import { FileDiffMetadata, ForceDiffPlainTextOptions, RenderDiffOptions, ThemedDiffResult } from "../types.js";
//#region src/utils/renderDiffWithHighlighter.d.ts
declare function renderDiffWithHighlighter(diff: FileDiffMetadata, highlighter: DiffsHighlighter, options: RenderDiffOptions, { forcePlainText, lazyLineAST, startingLine, totalLines, expandedHunks, collapsedContextThreshold }?: ForceDiffPlainTextOptions): ThemedDiffResult;
//#endregion
export { renderDiffWithHighlighter };
//# sourceMappingURL=renderDiffWithHighlighter.d.ts.map