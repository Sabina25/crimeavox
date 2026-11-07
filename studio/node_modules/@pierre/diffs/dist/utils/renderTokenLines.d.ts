import { ElementContent } from "../node_modules/.pnpm/@types_hast@3.0.4/node_modules/@types/hast/index.js";
import { DecorationItem, ThemedToken } from "../highlighter/types.js";
import { SharedRenderState } from "../types.js";
//#region src/utils/renderTokenLines.d.ts
interface RenderTokenLinesOptions {
  lazyLineAST?: boolean;
  cacheHtmlStyles?: boolean;
  state?: SharedRenderState;
  useTokenTransformer?: boolean;
  mergeWhitespaces?: 'never' | 'always';
  decorations?: DecorationItem[];
  /** UTF-16 line start offsets, required for numeric decoration positions. */
  lineOffsets?: number[];
}
/**
 * Converts highlighted tokens to one HAST element per line for custom renderers.
 * Callers provide any line separators and enclosing pre/code elements.
 */
declare function renderTokenLines(lines: ThemedToken[][], { state, lazyLineAST, cacheHtmlStyles, useTokenTransformer, mergeWhitespaces, decorations, lineOffsets }: RenderTokenLinesOptions): ElementContent[];
//#endregion
export { RenderTokenLinesOptions, renderTokenLines };
//# sourceMappingURL=renderTokenLines.d.ts.map