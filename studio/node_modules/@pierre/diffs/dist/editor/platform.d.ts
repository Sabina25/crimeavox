import { isLinux, isMacLike, isSafari, resetPlatformDetection } from "../utils/platform.js";
//#region src/editor/platform.d.ts
declare function isPrimaryModifier({ metaKey, ctrlKey }: MouseEvent | KeyboardEvent, isMac?: boolean): boolean;
declare function isMoveCursorShortcut(e: KeyboardEvent): 'up' | 'down' | 'left' | 'right' | 'start' | 'textStart' | 'end' | 'wordLeft' | 'wordRight' | undefined;
//#endregion
export { isLinux, isMacLike, isMoveCursorShortcut, isPrimaryModifier, isSafari, resetPlatformDetection };
//# sourceMappingURL=platform.d.ts.map