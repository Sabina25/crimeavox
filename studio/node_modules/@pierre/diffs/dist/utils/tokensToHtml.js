import { hastToHtml } from "./hastToHtml.js";
import { renderTokenLines } from "./renderTokenLines.js";
//#region src/utils/tokensToHtml.ts
/**
* Renders existing tokens as a pre/code HTML block without highlighting again.
* Pass the original source to resolve numeric decoration offsets.
*/
function tokensToHtml(source, result, options, cacheHtmlStyles = false) {
	const lineOffsets = [0];
	if (options.decorations?.some((item) => typeof item.start === "number" || typeof item.end === "number") === true) for (let index = source.indexOf("\n"); index !== -1; index = source.indexOf("\n", index + 1)) lineOffsets.push(index + 1);
	const code = {
		type: "element",
		tagName: "code",
		properties: {},
		children: []
	};
	const lines = renderTokenLines(result.tokens, {
		decorations: options.decorations,
		mergeWhitespaces: options.mergeWhitespaces,
		lineOffsets,
		cacheHtmlStyles
	});
	for (let i = 0; i < lines.length; i++) {
		if (i > 0) code.children.push({
			type: "text",
			value: "\n"
		});
		code.children.push(lines[i]);
	}
	const root = {
		type: "root",
		children: [{
			type: "element",
			tagName: "pre",
			properties: {
				class: "diffs",
				style: result.rootStyle === false ? void 0 : result.rootStyle ?? [result.fg != null ? `color:${result.fg}` : "", result.bg != null ? `background-color:${result.bg}` : ""].filter(Boolean).join(";"),
				tabIndex: 0
			},
			children: [code]
		}]
	};
	return hastToHtml(root);
}
//#endregion
export { tokensToHtml };

//# sourceMappingURL=tokensToHtml.js.map