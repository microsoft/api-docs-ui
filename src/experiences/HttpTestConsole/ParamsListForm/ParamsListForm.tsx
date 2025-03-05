import React, { useCallback, useMemo } from 'react';
import { Body1Strong, Button } from '@fluentui/react-components';
import { Stack } from '@fluentui/react';
import { AddCircleRegular } from '@fluentui/react-icons';
import { HttpReqParam } from '@/types/testConsole';
import { ApiOperationParameter } from '@/types/apiOperation';
import { validateParamsList } from '@/experiences/HttpTestConsole/utils';
import TestConsolePanel from '../TestConsolePanel';
import ParamForm from './ParamForm';
import styles from './ParamsListForm.module.scss';

export interface Props {
  /** Panel's name unique to current test console (used for handling its state only and not displayed anywhere). */
  name: string;
  /** Panel title. */
  title: string;
  /** Custom add button label. */
  addBtnLabel?: string;
  /** Current value (list of key-value pairs). */
  value: HttpReqParam[];
  /** List of available parameter definitions. Note that if there are required parameters, they must be present in value. */
  params?: ApiOperationParameter[];
  /** If true - adding or removing entries won't be allowed. */
  isStrictSchema?: boolean;
  /** Value change handler. In addition to value it accepts panel name for easier usage with useCallback. */
  onChange: (name: string, value: HttpReqParam[]) => void;
}

export const ParamsListForm: React.FC<Props> = ({
  name,
  title,
  addBtnLabel = 'Add',
  value,
  params = [],
  isStrictSchema,
  onChange,
}) => {
  const errors = useMemo(() => validateParamsList(value, params), [value, params]);

  const handleAddClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: React.PointerEvent<any>) => {
      e.stopPropagation();
      onChange(name, [...value, { name: '', value: '' }]);
    },
    [name, value, onChange]
  );

  const handleRemoveParam = useCallback(
    (index: number) => {
      onChange(
        name,
        value.filter((_, i) => i !== index)
      );
    },
    [name, value, onChange]
  );

  const handleFieldChange = useCallback(
    (index: number, param: HttpReqParam) => {
      onChange(
        name,
        value.map((field, i) => (i === index ? param : field))
      );
    },
    [name, onChange, value]
  );

  if (!value.length && isStrictSchema) {
    return null;
  }

  return (
    <TestConsolePanel
      className={styles.paramsListForm}
      name={name}
      header={
        <div className={styles.header}>
          <Stack verticalAlign="center" horizontalAlign="space-between" horizontal>
            <Body1Strong>{title}</Body1Strong>
          </Stack>
          {!isStrictSchema && (
            <Button as="a" size="small" icon={<AddCircleRegular />} onClick={handleAddClick}>
              {addBtnLabel}
            </Button>
          )}
        </div>
      }
    >
      {!value.length && (
        <div className={styles.empty}>
          <span>No items</span>
        </div>
      )}
      {value.map((field, index) => {
        const definition = params.find(({ name }) => name === field.name);

        return (
          <ParamForm
            key={index}
            value={field}
            definition={definition}
            error={errors[index]}
            onRemove={!isStrictSchema && !definition?.required && handleRemoveParam.bind(null, index)}
            onChange={handleFieldChange.bind(null, index)}
          />
        );
      })}
    </TestConsolePanel>
  );
};

const ParamsListFormMemo = React.memo(ParamsListForm);
ParamsListFormMemo.displayName = 'HttpTestConsole.ParamsListForm';

export default ParamsListFormMemo;
