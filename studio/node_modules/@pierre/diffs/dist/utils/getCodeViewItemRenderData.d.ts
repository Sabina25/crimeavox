import { FileRenderData } from "../components/File.js";
import { FileDiffRenderData } from "../components/FileDiff.js";
import { CodeViewRenderedDiffItem, CodeViewRenderedFileItem, CodeViewRenderedItem } from "../components/CodeView.js";
//#region src/utils/getCodeViewItemRenderData.d.ts
declare function getCodeViewItemRenderData<LAnnotation, Caret>(renderedItem: CodeViewRenderedDiffItem<LAnnotation, Caret>): FileDiffRenderData<LAnnotation>;
declare function getCodeViewItemRenderData<LAnnotation, Caret>(renderedItem: CodeViewRenderedFileItem<LAnnotation, Caret>): FileRenderData<LAnnotation>;
declare function getCodeViewItemRenderData<LAnnotation, Caret>(renderedItem: CodeViewRenderedItem<LAnnotation, Caret>): FileDiffRenderData<LAnnotation> | FileRenderData<LAnnotation>;
//#endregion
export { getCodeViewItemRenderData };
//# sourceMappingURL=getCodeViewItemRenderData.d.ts.map