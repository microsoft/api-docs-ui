import React, { useCallback } from 'react';
import { Button, Field, Input } from '@fluentui/react-components';
import { Stack } from '@fluentui/react';
import { DeleteRegular } from '@fluentui/react-icons';
import { HttpReqParam } from '@/types/testConsole';
import styles from './ParamForm.module.scss';

interface Props {
  value: HttpReqParam;
  error?: string;
  isSecret?: boolean;
  isRequired?: boolean;
  onRemove?: () => void;
  onChange: (value: HttpReqParam) => void;
}

export const ParamForm: React.FC<Props> = ({ value, error, isSecret, isRequired, onRemove, onChange }) => {
  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...value, [e.currentTarget.name]: e.currentTarget.value });
    },
    [onChange, value]
  );

  return (
    <div className={styles.paramForm}>
      <Field validationState={error ? 'error' : 'none'} validationMessage={error}>
        <Stack className={styles.fields} tokens={{ childrenGap: 10 }} horizontalAlign="stretch" horizontal>
          <Input
            placeholder="Name..."
            name="name"
            value={value.name}
            disabled={isRequired}
            onChange={handleFieldChange}
          />
          <Input
            placeholder="Value..."
            type={isSecret ? 'password' : 'text'}
            name="value"
            value={value.value}
            onChange={handleFieldChange}
          />

          {!!onRemove && <Button icon={<DeleteRegular />} appearance="subtle" title="Remove" onClick={onRemove} />}
        </Stack>
      </Field>
    </div>
  );
};

export default React.memo(ParamForm);
