import React, { useCallback, useMemo } from 'react';
import { Button } from '@fluentui/react-components';
import { AddCircleRegular } from '@fluentui/react-icons';
import { HttpReqParam } from '@/types/testConsole';
import { ApiOperationParameter } from '@/types/apiOperation';
import TestConsolePanel from '../TestConsolePanel';
import ParamForm from './ParamForm';
import styles from './ParamsListForm.module.scss';

export interface Props {
  /** Panel's name unique to current test console (used for handling its state only and not displayed anywhere). */
  name: string;
  /** Panel title. */
  title: string;
  /** Current value (list of key-value pairs). */
  value: HttpReqParam[];
  /** List of available parameter definitions. Note that if there are required parameters, they must be present in value. */
  params?: ApiOperationParameter[];
  /** List of error messages for each value item. If there is no error then it should be `null`. */
  errors?: Array<string | null>;
  /** If true - adding or removing entries won't be allowed. */
  isStrictSchema?: boolean;
  /** Value change handler. In addition to value it accepts panel name for easier usage with useCallback. */
  onChange: (name: string, value: HttpReqParam[]) => void;
}

export const ParamsListForm: React.FC<Props> = ({
  name,
  title,
  value,
  params = [],
  errors = [],
  isStrictSchema,
  onChange,
}) => {
  const requiredFieldsCount = useMemo(() => params.filter((param) => param.required).length, [params]);

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
          <span>{title}</span>
          {!isStrictSchema && (
            <Button as="a" size="small" icon={<AddCircleRegular />} onClick={handleAddClick}>
              Add
            </Button>
          )}
        </div>
      }
    >
      {!value.length && (
        <div className={styles.empty}>
          <span>No items</span>

          <Button appearance="subtle" size="small" icon={<AddCircleRegular />} onClick={handleAddClick}>
            Add
          </Button>
        </div>
      )}
      {value.map((field, index) => {
        const isRequired = index < requiredFieldsCount;
        const definition = params.find(({ name }) => name === field.name);

        return (
          <ParamForm
            key={index}
            value={field}
            error={errors[index]}
            isSecret={definition?.isSecret}
            isRequired={isRequired}
            onRemove={!isStrictSchema && !isRequired && handleRemoveParam.bind(null, index)}
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
