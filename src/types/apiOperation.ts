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
  /** An appropriate field type for property value. */
  fieldType?: 'text' | 'number' | 'checkbox' | 'select' | 'file' | 'object' | 'array';
  /** If present, it means that the value can be only one of the values in the provided list. */
  enum?: string[];
  description?: string;
  examples?: ApiOperationExample[];
  required?: boolean;
  readOnly?: boolean;
  isSecret?: boolean;
}
