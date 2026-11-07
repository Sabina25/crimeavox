import { FileContents, FileDiffMetadata, MergeConflictActionPayload, MergeConflictMarkerRow, MergeConflictResolution, PostRenderPhase } from "../types.js";
import { WorkerPoolManager } from "../worker/WorkerPoolManager.js";
import "../worker/index.js";
import { HunksRenderResult } from "../renderers/DiffHunksRenderer.js";
import { FileDiff, FileDiffOptions, FileDiffRenderBaseProps, FileDiffRenderData, FileDiffRenderInput } from "./FileDiff.js";
import { MergeConflictDiffAction } from "../utils/parseMergeConflictDiffFromFile.js";
import { UnresolvedFileHunksRenderer, UnresolvedFileHunksRendererOptions } from "../renderers/UnresolvedFileHunksRenderer.js";
//#region src/components/UnresolvedFile.d.ts
type RenderMergeConflictActions<LAnnotation> = (action: MergeConflictDiffAction, instance: UnresolvedFile<LAnnotation>) => HTMLElement | DocumentFragment | null | undefined;
type MergeConflictActionsTypeOption<LAnnotation> = 'none' | 'default' | RenderMergeConflictActions<LAnnotation>;
interface UnresolvedFileOptions<LAnnotation> extends Omit<FileDiffOptions<LAnnotation, undefined>, 'diffStyle' | 'onPostRender'> {
  onPostRender?(node: HTMLElement, instance: UnresolvedFile<LAnnotation>, phase: PostRenderPhase): unknown;
  mergeConflictActionsType?: MergeConflictActionsTypeOption<LAnnotation>;
  onMergeConflictAction?(payload: MergeConflictActionPayload, instance: UnresolvedFile<LAnnotation>): void;
  onMergeConflictResolve?(file: FileContents, payload: MergeConflictActionPayload): void;
  maxContextLines?: number;
}
interface UnresolvedFileRenderProps<LAnnotation> extends FileDiffRenderBaseProps<LAnnotation> {
  file?: FileContents;
  actions?: (MergeConflictDiffAction | undefined)[];
  markerRows?: MergeConflictMarkerRow[];
}
interface UnresolvedFileHydrationProps<LAnnotation> extends Omit<UnresolvedFileRenderProps<LAnnotation>, 'file'> {
  file?: FileContents;
  fileContainer: HTMLElement;
  prerenderedHTML?: string;
}
interface GetOrComputeDiffProps {
  file: FileContents | undefined;
  fileDiff: FileDiffMetadata | undefined;
  actions: (MergeConflictDiffAction | undefined)[] | undefined;
  markerRows: MergeConflictMarkerRow[] | undefined;
}
interface ResolveConflictReturn {
  file: FileContents;
  fileDiff: FileDiffMetadata;
  actions: (MergeConflictDiffAction | undefined)[];
  markerRows: MergeConflictMarkerRow[];
}
type UnresolvedFileDataCache = GetOrComputeDiffProps;
interface UnresolvedFileRenderInput<LAnnotation> extends FileDiffRenderInput<LAnnotation> {
  actions: (MergeConflictDiffAction | undefined)[];
  markerRows: MergeConflictMarkerRow[];
}
interface UnresolvedFileRenderData<LAnnotation> extends FileDiffRenderData<LAnnotation> {
  actions: (MergeConflictDiffAction | undefined)[];
  markerRows: MergeConflictMarkerRow[];
}
declare class UnresolvedFile<LAnnotation = undefined> extends FileDiff<LAnnotation, undefined> {
  options: UnresolvedFileOptions<LAnnotation>;
  readonly __id: string;
  readonly type = "unresolved-file";
  protected computedCache: UnresolvedFileDataCache;
  private conflictActions;
  private markerRows;
  __getNextRenderData({ actions, markerRows, ...input }: UnresolvedFileRenderInput<LAnnotation>): UnresolvedFileRenderData<LAnnotation>;
  private conflictActionCache;
  constructor(options?: UnresolvedFileOptions<LAnnotation>, workerManager?: WorkerPoolManager | undefined, requestOwnerRender?: () => void);
  setOptions(options: UnresolvedFileOptions<LAnnotation> | undefined): void;
  protected syncInteractionOptions(): void;
  protected createHunksRenderer(options: UnresolvedFileOptions<LAnnotation>): UnresolvedFileHunksRenderer<LAnnotation>;
  protected getHunksRendererOptions(options: UnresolvedFileOptions<LAnnotation>): UnresolvedFileHunksRendererOptions;
  protected applyPreNodeAttributes(pre: HTMLPreElement, result: HunksRenderResult): void;
  cleanUp(): void;
  private getOrComputeDiff;
  hydrate(props: UnresolvedFileHydrationProps<LAnnotation>): void;
  rerender(): void;
  render(props?: UnresolvedFileRenderProps<LAnnotation>): boolean;
  resolveConflict(conflictIndex: number, resolution: MergeConflictResolution, fileDiff?: FileDiffMetadata | undefined): ResolveConflictReturn | undefined;
  private resolveConflictAndRender;
  protected prepareRenderData(fileDiff: FileDiffMetadata): void;
  protected adoptRenderData(fileDiff: FileDiffMetadata): void;
  private handleMergeConflictActionClick;
  private renderMergeConflictActionSlots;
  private renderMergeConflictAction;
  private clearMergeConflictActionCache;
}
declare function getUnresolvedDiffHunksRendererOptions<LAnnotation>(options?: UnresolvedFileOptions<LAnnotation>, baseOptions?: UnresolvedFileOptions<LAnnotation>): UnresolvedFileHunksRendererOptions;
//#endregion
export { MergeConflictActionsTypeOption, RenderMergeConflictActions, UnresolvedFile, UnresolvedFileHydrationProps, UnresolvedFileOptions, UnresolvedFileRenderData, UnresolvedFileRenderInput, UnresolvedFileRenderProps, getUnresolvedDiffHunksRendererOptions };
//# sourceMappingURL=UnresolvedFile.d.ts.map