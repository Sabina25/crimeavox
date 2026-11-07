import { isLinux, isMacLike, isSafari, resetPlatformDetection } from "../utils/platform.js";
//#region src/editor/platform.ts
function isPrimaryModifier({ metaKey, ctrlKey }, isMac = isMacLike()) {
	return isMac ? metaKey && !ctrlKey : ctrlKey && !metaKey;
}
function isMoveCursorShortcut(e) {
	const isMac = isMacLike();
	if (isMac && e.ctrlKey && !e.altKey && !e.metaKey) switch (e.key) {
		case "a": return "start";
		case "e": return "end";
		case "p": return "up";
		case "n": return "down";
		case "f": return "right";
		case "b": return "left";
	}
	if (!e.altKey && !e.ctrlKey && !e.metaKey) {
		if (e.key === "ArrowUp") return "up";
		else if (e.key === "ArrowDown") return "down";
		else if (e.key === "ArrowLeft") return "left";
		else if (e.key === "ArrowRight") return "right";
		else if (e.key === "Home") return "start";
		else if (e.key === "End") return "end";
	}
	if (!e.altKey && isPrimaryModifier(e, isMac)) {
		if (e.key === "ArrowLeft") return isMac ? "textStart" : "wordLeft";
		else if (e.key === "ArrowRight") return isMac ? "end" : "wordRight";
	}
}
//#endregion
export { isLinux, isMacLike, isMoveCursorShortcut, isPrimaryModifier, isSafari, resetPlatformDetection };

//# sourceMappingURL=platform.js.map