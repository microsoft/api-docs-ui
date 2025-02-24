import React, { useMemo } from 'react';
import { Badge } from '@fluentui/react-components';
import InfoTable from 'experiences/InfoTable';
import { ApiOperationParameter } from '@/types/apiOperation';
import styles from './ParametersTable.module.scss';

export interface Props {
  /** List of API request parameters */
  parameters: ApiOperationParameter[];
  /** List of columns to hide */
  hiddenColumns?: Array<keyof ApiOperationParameter>;
}

function badgeRenderer(value: string) {
  return (
    <Badge className={styles.badge} appearance="tint" color="informative" shape="rounded">
      {value}
    </Badge>
  );
}

const columnConfigByKey = {
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
};

const columnOrder: Array<keyof ApiOperationParameter> = ['name', 'in', 'required', 'readOnly', 'type', 'description'];

export const ParametersTable: React.FC<Props> = ({ parameters, hiddenColumns }) => {
  const columns = useMemo(
    () => columnOrder.filter((name) => !hiddenColumns?.includes(name)).map((name) => columnConfigByKey[name]),
    [hiddenColumns]
  );

  const columnLabels = useMemo(() => columns.map(({ title }) => title), []);

  return (
    <InfoTable columnLabels={columnLabels} noDataMessage="No parameters">
      {parameters.map((parameter) => (
        <InfoTable.Row key={parameter.name}>
          {columns.map(({ key, renderer }) => (
            <InfoTable.Cell key={key}>{renderer ? renderer(parameter[key]) : parameter[key]}</InfoTable.Cell>
          ))}
        </InfoTable.Row>
      ))}
    </InfoTable>
  );
};

export default React.memo(ParametersTable);
