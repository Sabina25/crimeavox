import { CodeToHtmlOptions, TokensResult } from "../highlighter/types.js";
import "../types.js";
//#region src/utils/tokensToHtml.d.ts
/**
 * Renders existing tokens as a pre/code HTML block without highlighting again.
 * Pass the original source to resolve numeric decoration offsets.
 */
declare function tokensToHtml(source: string, result: TokensResult, options: CodeToHtmlOptions, cacheHtmlStyles?: boolean): string;
//#endregion
export { tokensToHtml };
//# sourceMappingURL=tokensToHtml.d.ts.map