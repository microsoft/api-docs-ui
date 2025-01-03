import React, { useMemo } from 'react';
import { Badge } from '@fluentui/react-components';
import InfoTable from '@/components/InfoTable';
import { ApiOperationParameter } from '@/types/apiOperation';

export interface Props {
  /** List of API request parameters */
  parameters: ApiOperationParameter[];
  /** List of columns to hide */
  hiddenColumns?: Array<keyof ApiOperationParameter>;
}

function badgeRenderer(value: string) {
  return (
    <Badge
      appearance="tint"
      color="informative"
      shape="rounded"
    >
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

const columnOrder: Array<keyof ApiOperationParameter> = ['name', 'in', 'required', 'type', 'description'];

export const ParametersTable: React.FC<Props> = ({ parameters, hiddenColumns }) => {
  const columns = useMemo(() => (
    columnOrder
      .filter((name) => !hiddenColumns?.includes(name))
      .map((name) => columnConfigByKey[name])
  ), [hiddenColumns]);

  return <InfoTable dataItems={parameters} columns={columns} />;
};

export default React.memo(ParametersTable);
