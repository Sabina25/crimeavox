import { RecallToken } from "../highlighter/tokenizer-types.js";
import { DiffsHighlighter } from "../highlighter/DiffsHighlighter.js";
import { CodeToTokensOptions } from "../highlighter/types.js";
//#region src/shiki-stream/types.d.ts
type CodeToTokenTransformStreamOptions = CodeToTokensOptions & {
  highlighter: DiffsHighlighter;
  /** Emit provisional tokens and recalls while the final line is incomplete. */
  allowRecalls?: boolean;
};
//#endregion
export { CodeToTokenTransformStreamOptions, type RecallToken };
//# sourceMappingURL=types.d.ts.map