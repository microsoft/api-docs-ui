import { ApiOperationParameter } from '@/types/apiOperation';
import { HttpBodyFormats } from '@/enums/HttpBodyFormats';

export interface HttpRawBodyDataSample {
  name: string;
  value: string;
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

export type HttpReqBodyValue = string | File | object | null | undefined;

export interface HttpReqBodyData {
  value: HttpReqBodyValue;
  format: HttpBodyFormats;
}

export interface HttpReqData {
  urlTemplate: string;
  method: string;
  urlParams: HttpReqParam[];
  query: HttpReqParam[];
  headers: HttpReqParam[];
  body?: HttpReqBodyData;
}
