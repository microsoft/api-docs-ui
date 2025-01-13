export interface ApiOperation {
  name: string;
  description?: string;
  method: string;
  urlTemplate: string;
  displayName: string;
}

export interface ApiOperationParameter {
  name: string;
  /** Parameter placement, e.g. "query", "template", "header", "body". */
  in: string;
  type: string;
  description?: string;
  required?: boolean;
  readOnly?: boolean;
  examples?: any; // TODO
}
