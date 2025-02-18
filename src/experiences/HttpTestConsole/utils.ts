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

  const url = new URL(resolvedTemplate);
  reqData.query.forEach((param) => {
    if (!param.value) {
      return;
    }

    url.searchParams.set(param.name, param.value);
  });

  return decodeURI(url.toString());
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
