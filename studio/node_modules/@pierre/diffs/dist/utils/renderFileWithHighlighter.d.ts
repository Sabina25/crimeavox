import { DiffsHighlighter } from "../highlighter/DiffsHighlighter.js";
import { FileContents, ForceFilePlainTextOptions, RenderFileOptions, ThemedFileResult } from "../types.js";
//#region src/utils/renderFileWithHighlighter.d.ts
declare function renderFileWithHighlighter(file: FileContents, highlighter: DiffsHighlighter, { theme, tokenizeMaxLineLength, useTokenTransformer }: RenderFileOptions, { forcePlainText, lazyLineAST, startingLine, totalLines, lines }?: ForceFilePlainTextOptions): ThemedFileResult;
//#endregion
export { renderFileWithHighlighter };
//# sourceMappingURL=renderFileWithHighlighter.d.ts.map