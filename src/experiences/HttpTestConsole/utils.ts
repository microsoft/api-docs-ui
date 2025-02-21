import React from 'react';
import memoizee from 'memoizee';
import { uniqBy } from 'lodash';
import { ApiOperationParameter } from '@/types/apiOperation';
import { HttpReqData, HttpReqParam, HttpParamSchemasByLocation } from '@/types/testConsole';
import TestConsolePanel from './TestConsolePanel';
import ParamsListForm from './ParamsListForm';
import RawBody from './RawBody';
import RequestPreview from './RequestPreview';

/**
 * Returns the names of the items that should be open by default.
 */
export const getDefaultOpenItems = memoizee((children: React.ReactNode): string[] => {
  return (
    React.Children.toArray(children)
      .filter((child) => {
        if (!React.isValidElement(child)) {
          return false;
        }

        if (child.type === ParamsListForm) {
          return child.props.value.length;
        }

        if (child.type === RawBody) {
          return child.props.value !== undefined;
        }

        if (child.type === TestConsolePanel) {
          return child.props.isOpenByDefault;
        }

        return child.type === RequestPreview;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((child) => (child as any).props.name)
  );
});

/**
 * Resolves complete URL template with provided url and query params.
 */
export function resolveUrlFromReqData(reqData: HttpReqData): string {
  const resolvedTemplate = reqData.urlTemplate.replace(/{([^}]+)}/g, (match, param) => {
    const urlParam = reqData.urlParams.find((p) => p.name === param);
    return urlParam?.value || match;
  });

  const searchParams = new URLSearchParams();
  reqData.query.forEach((param) => {
    if (!param.value) {
      return;
    }

    searchParams.set(param.name, param.value);
  });

  if (!searchParams.toString()) {
    return resolvedTemplate;
  }
  return `${resolvedTemplate}?${searchParams.toString()}`;
}

/**
 * Normalizes request data before using it for making a request.
 */
export function normalizeReqData(
  reqData: HttpReqData,
  schemas: HttpParamSchemasByLocation,
  showSecrets = false
): HttpReqData {
  const normalized = { ...reqData };

  const completeDataPredicate = (param: HttpReqParam) => param.name && param.value;
  const getSecretResolver = (schema: ApiOperationParameter[]) => (param: HttpReqParam) => {
    const isSecret = schema.find((schema) => schema.name === param.name)?.isSecret;
    if (!isSecret || showSecrets) {
      return param;
    }

    return {
      ...param,
      value: '••••••',
    };
  };

  normalized.method = normalized.method?.toUpperCase();

  normalized.urlParams = normalized.urlParams?.filter(completeDataPredicate).map(getSecretResolver(schemas.urlParams));

  normalized.query = uniqBy(normalized.query.filter(completeDataPredicate), 'name').map(
    getSecretResolver(schemas.query)
  );

  normalized.headers = uniqBy(normalized.headers.filter(completeDataPredicate), 'name').map(
    getSecretResolver(schemas.headers)
  );

  return normalized;
}

/**
 * Validates params list for duplicates and empty values.
 */
export function validateParamsList(
  params: HttpReqParam[],
  paramSchemas: ApiOperationParameter[]
): Array<null | string> {
  return params.map((param, i) => {
    if (params.slice(0, i).find(({ name }) => name === param.name)) {
      return `Parameter with this name already exists`;
    }

    const schema = paramSchemas.find((s) => s.name === param.name);

    if (!schema) {
      return null;
    }

    if (schema.required && !param.value) {
      return `Value is required`;
    }

    return null;
  });
}
