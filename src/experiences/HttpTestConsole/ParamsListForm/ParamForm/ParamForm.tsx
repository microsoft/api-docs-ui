import React, { useCallback, useState } from 'react';
import { Button, Field, Input, Tooltip } from '@fluentui/react-components';
import { EyeRegular, EyeOffRegular } from '@fluentui/react-icons';
import { Stack } from '@fluentui/react';
import { DeleteRegular } from '@fluentui/react-icons';
import classNames from 'classnames';
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
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...value, [e.currentTarget.name]: e.currentTarget.value });
    },
    [onChange, value]
  );

  const handleSecretToggleClick = useCallback(() => {
    setIsSecretRevealed((prev) => !prev);
  }, []);

  return (
    <div className={styles.paramForm}>
      <Stack
        className={styles.fieldsRow}
        tokens={{ childrenGap: 10 }}
        horizontalAlign="stretch"
        verticalAlign="start"
        horizontal
      >
        <Field
          className={classNames(styles.field, 'param-name')}
          validationState={error ? 'error' : 'none'}
          validationMessage={error}
        >
          <Input
            placeholder="Name..."
            name="name"
            value={value.name}
            disabled={isRequired}
            onChange={handleFieldChange}
          />
        </Field>
        <Field className={classNames(styles.field, 'param-value')}>
          <Input
            placeholder="Value..."
            type={isSecret && !isSecretRevealed ? 'password' : 'text'}
            name="value"
            value={value.value}
            onChange={handleFieldChange}
          />
        </Field>

        {isSecret && (
          <Tooltip content={isSecretRevealed ? 'Hide secret' : 'Reveal secret'} relationship="label">
            <Button
              icon={isSecretRevealed ? <EyeOffRegular /> : <EyeRegular />}
              appearance="subtle"
              onClick={handleSecretToggleClick}
            />
          </Tooltip>
        )}

        {!!onRemove && (
          <div className="param-remove">
            <Button icon={<DeleteRegular />} appearance="subtle" title="Remove" onClick={onRemove} />
          </div>
        )}
      </Stack>
    </div>
  );
};

export default React.memo(ParamForm);
