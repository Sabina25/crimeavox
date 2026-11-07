import { RefObject } from "react";
//#region src/react/utils/useNextRenderData.d.ts
interface NextRenderDataSource<TInput, TData> {
  __getNextRenderData(input: TInput): TData;
}
declare function useNextRenderData<TInput, TData>(instanceRef: RefObject<NextRenderDataSource<TInput, TData> | null>, input: TInput): TData | undefined;
//#endregion
export { useNextRenderData };
//# sourceMappingURL=useNextRenderData.d.ts.map