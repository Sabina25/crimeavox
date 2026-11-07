import { InitializeWorkerRequest, RenderDiffSuccessResponse, RenderFileSuccessResponse, WorkerRequest, WorkerResponse } from "./types.js";
import { EncodedHastLines } from "./hastLinesTransport.js";
//#region src/worker/workerMessage.d.ts
interface InitializeWorkerWireRequest extends InitializeWorkerRequest {
  resultFormat?: 'hast-ops-v1';
}
type WorkerWireRequest = Exclude<WorkerRequest, InitializeWorkerRequest> | InitializeWorkerWireRequest;
interface EncodedFileSuccessResponse extends Omit<RenderFileSuccessResponse, 'result'> {
  result: Omit<RenderFileSuccessResponse['result'], 'code'> & {
    code: EncodedHastLines;
  };
}
interface EncodedDiffSuccessResponse extends Omit<RenderDiffSuccessResponse, 'result'> {
  result: Omit<RenderDiffSuccessResponse['result'], 'code'> & {
    code: {
      deletionLines: EncodedHastLines;
      additionLines: EncodedHastLines;
    };
  };
}
type WorkerWireResponse = WorkerResponse | EncodedFileSuccessResponse | EncodedDiffSuccessResponse;
//#endregion
export { EncodedDiffSuccessResponse, EncodedFileSuccessResponse, InitializeWorkerWireRequest, WorkerWireRequest, WorkerWireResponse };
//# sourceMappingURL=workerMessage.d.ts.map