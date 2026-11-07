import { tokenStyle } from "./tokenStyle.js";
//#region src/utils/createSpanNodeFromToken.ts
function createSpanFromToken(token, cacheHtmlStyle) {
	const element = document.createElement("span");
	element.setAttribute("style", tokenStyle(token, cacheHtmlStyle));
	element.textContent = token.content === "\r" ? "" : token.content;
	return element;
}
//#endregion
export { createSpanFromToken };

//# sourceMappingURL=createSpanNodeFromToken.js.map