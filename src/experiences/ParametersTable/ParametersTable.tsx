import React, { useMemo } from 'react';
import { Badge } from '@fluentui/react-components';
import InfoTable from 'experiences/InfoTable';
import { ApiOperationExample, ApiOperationParameter } from '@/types/apiOperation';
import styles from './ParametersTable.module.scss';

interface ColumnConfig {
  key: string;
  title: string;
  renderer?: (value: unknown) => React.ReactNode;
  autoHide?: boolean;
}

function badgeRenderer(value?: string) {
  if (!value) {
    return null;
  }

  return (
    <Badge className={styles.badge} appearance="tint" color="informative" shape="rounded">
      {value}
    </Badge>
  );
}

const columnConfigByKey: Record<string, ColumnConfig> = {
  name: {
    key: 'name',
    title: 'Name',
  },
  in: {
    key: 'in',
    title: 'In',
  },
  required: {
    key: 'required',
    title: 'Required',
    renderer: (required?: boolean) => badgeRenderer(String(Boolean(!!required))),
  },
  readOnly: {
    key: 'readOnly',
    title: 'Read-only',
    renderer: (readOnly?: boolean) => badgeRenderer(String(Boolean(!!readOnly))),
  },
  type: {
    key: 'type',
    title: 'Type',
    renderer: badgeRenderer,
  },
  description: {
    key: 'description',
    title: 'Description',
  },
  examples: {
    key: 'examples',
    title: 'Examples',
    autoHide: true,
    renderer: (examples: ApiOperationExample[]) =>
      examples.map((example, i) => (
        <div key={i} className={styles.example}>
          {!!example.title && example.title !== 'default' && <strong>{example.title}: </strong>}
          <span>{example.value}</span>
          <div>{example.description}</div>
        </div>
      )),
  },
};

const columnOrder: Array<keyof typeof columnConfigByKey> = [
  'name',
  'in',
  'required',
  'readOnly',
  'type',
  'description',
  'examples',
];

export interface Props {
  /** List of API request parameters */
  parameters: Array<Partial<ApiOperationParameter>>;
  /** List of columns to hide */
  hiddenColumns?: Array<keyof typeof columnConfigByKey>;
}

export const ParametersTable: React.FC<Props> = ({ parameters, hiddenColumns }) => {
  const resolvedHiddenColumns = useMemo(() => {
    const result = (hiddenColumns || []).slice();

    Object.entries<ColumnConfig>(columnConfigByKey)
      .filter(([, { key, autoHide }]) => !hiddenColumns?.includes(key) && autoHide)
      .forEach(([key]) => {
        const isValuePresent = !!parameters.some((parameter) => parameter[key] !== undefined);
        if (!isValuePresent) {
          result.push(key);
        }
      });

    return result;
  }, [hiddenColumns, parameters]);

  const columns = useMemo(
    () => columnOrder.filter((name) => !resolvedHiddenColumns?.includes(name)).map((name) => columnConfigByKey[name]),
    [resolvedHiddenColumns]
  );

  const columnLabels = useMemo(() => columns.map(({ title }) => title), [columns]);

  return (
    <InfoTable columnLabels={columnLabels} noDataMessage="No parameters">
      {parameters.map((parameter) => (
        <InfoTable.Row key={parameter.name}>
          {columns.map(({ key, renderer }) => {
            let value = parameter[key];
            if (renderer && value !== undefined) {
              value = renderer(value);
            }

            return <InfoTable.Cell key={key}>{value}</InfoTable.Cell>;
          })}
        </InfoTable.Row>
      ))}
    </InfoTable>
  );
};

export default React.memo(ParametersTable);
