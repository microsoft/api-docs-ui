import React from 'react';

export interface ApiOperation {
  name: string;
  description?: string;
  method?: string;
  urlTemplate: string;
  displayName: string;
}

export interface ApiOperationExample {
  title?: string;
  value: string;
  description?: string;
}

export interface ApiOperationParameter {
  name: string;
  /** Parameter placement, e.g. "query", "template", "header", "body". */
  in?: string;
  /** Parameter type label. Can be a React node for cases when you need to render a link to definition. */
  type: React.ReactNode;
  description?: string;
  examples?: ApiOperationExample[];
  required?: boolean;
  readOnly?: boolean;
  isSecret?: boolean;
}
