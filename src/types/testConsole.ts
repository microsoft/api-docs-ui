import { ApiOperationParameter } from '@/types/apiOperation';

export enum HttpBodyFormats {
  RAW = 'raw',
  BINARY = 'binary',
}

export interface HttpParamSchemasByLocation {
  query: ApiOperationParameter[];
  headers: ApiOperationParameter[];
  urlParams: ApiOperationParameter[];
}

export interface HttpReqParam {
  name: string;
  value?: string;
}

export interface HttpReqData {
  urlTemplate: string;
  method: string;
  urlParams: HttpReqParam[];
  query: HttpReqParam[];
  headers: HttpReqParam[];
  bodyFormat: HttpBodyFormats;
  body: string | undefined;
}
