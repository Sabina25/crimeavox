//#region src/utils/getCodeViewItemRenderData.ts
function getCodeViewItemRenderData(renderedItem) {
	if (renderedItem.type === "diff") {
		const { instance, item } = renderedItem;
		return instance.__getNextRenderData({
			fileDiff: instance.fileDiff ?? item.fileDiff,
			lineAnnotations: void 0
		});
	}
	const { instance, item } = renderedItem;
	return instance.__getNextRenderData({
		file: instance.file ?? item.file,
		lineAnnotations: void 0
	});
}
//#endregion
export { getCodeViewItemRenderData };

//# sourceMappingURL=getCodeViewItemRenderData.js.map