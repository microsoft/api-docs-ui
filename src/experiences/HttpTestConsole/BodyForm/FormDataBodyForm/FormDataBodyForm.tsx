import React, { useCallback, useMemo } from 'react';
import { Field, Input, Select, Textarea } from '@fluentui/react-components';
import { ApiOperationParameter } from '@/types/apiOperation';
import FileInput from '@/components/FileInput';
import styles from './FormDataBodyForm.module.scss';

export interface Props {
  /** Current value. */
  value: object;
  /** List of form fields definitions. */
  fields: ApiOperationParameter[];
  /** Change value callback. */
  onChange: (value: object) => void;
}

export const FormDataBodyForm: React.FC<Props> = ({ value, fields, onChange }) => {
  const errors = useMemo(
    () =>
      fields.reduce((result, field) => {
        if (!field.required) {
          return result;
        }

        const fieldValue = value[field.name];
        if (!fieldValue) {
          return {
            ...result,
            [field.name]: 'Value is required',
          };
        }

        return result;
      }, {}),
    [fields, value]
  );

  const handleInputFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      onChange({ ...value, [e.target.name]: e.target.value });
    },
    [onChange, value]
  );

  const handleFileFieldChange = useCallback<React.ComponentProps<typeof FileInput>['onChange']>(
    (e, file) => {
      onChange({ ...value, [e.target.name]: file });
    },
    [onChange, value]
  );

  function renderField(field: ApiOperationParameter) {
    const fieldValue = value[field.name];

    switch (field.fieldType) {
      case 'text':
      case 'number':
        return (
          <Input name={field.name} type={field.fieldType} value={fieldValue || ''} onChange={handleInputFieldChange} />
        );

      case 'select':
        return (
          <Select name={field.name} value={fieldValue || ''} onChange={handleInputFieldChange}>
            <option></option>
            {field.enum.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </Select>
        );

      case 'file':
        return <FileInput value={fieldValue} onChange={handleFileFieldChange} />;

      case 'object':
        return <Textarea name={field.name} value={fieldValue || ''} onChange={handleInputFieldChange} />;

      default:
        return null;
    }
  }

  return (
    <div className={styles.formDataBodyForm}>
      {fields.map((field) => {
        const fieldElement = renderField(field);
        if (!fieldElement) {
          return null;
        }

        return (
          <Field
            key={field.name}
            className={styles.field}
            label={field.name}
            hint={field.description}
            validationState={errors[field.name] ? 'error' : 'none'}
            validationMessage={errors[field.name]}
            required={field.required}
          >
            {fieldElement}
          </Field>
        );
      })}
    </div>
  );
};

const FormDataBodyFormMemo = React.memo(FormDataBodyForm);
FormDataBodyFormMemo.displayName = 'HttpTestConsole.BodyForm.FormData';

export default FormDataBodyFormMemo;
