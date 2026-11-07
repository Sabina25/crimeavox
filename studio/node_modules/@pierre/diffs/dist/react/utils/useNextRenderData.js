//#region src/react/utils/useNextRenderData.ts
function useNextRenderData(instanceRef, input) {
	"use no memo";
	return instanceRef.current?.__getNextRenderData(input);
}
//#endregion
export { useNextRenderData };

//# sourceMappingURL=useNextRenderData.js.map