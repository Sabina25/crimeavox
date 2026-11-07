import { ThemedToken } from "../highlighter/types.js";
import "../types.js";
//#region src/utils/tokenStyle.d.ts
/**
 * Returns CSS declarations for a highlighted token. Enable caching only when
 * htmlStyle objects are immutable and reused across tokens.
 */
declare function tokenStyle(token: ThemedToken, cacheHtmlStyle?: boolean): string;
//#endregion
export { tokenStyle };
//# sourceMappingURL=tokenStyle.d.ts.map