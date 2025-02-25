import React, { useCallback, useMemo } from 'react';
import { Button, Tooltip, RadioGroup, Radio } from '@fluentui/react-components';
import { AddCircleRegular, DeleteRegular } from '@fluentui/react-icons';
import TestConsolePanel from '../TestConsolePanel';
import { HttpBodyFormats } from '@/enums/HttpBodyFormats';
import { HttpReqBodyData, HttpReqBodyValue } from '@/types/testConsole';
import RawBodyForm from './RawBodyForm';
import BinaryBodyForm from './BinaryBodyForm';
import FormDataBodyForm from './FormDataBodyForm';
import styles from './BodyForm.module.scss';

const subComponents = {
  Raw: RawBodyForm,
  Binary: BinaryBodyForm,
  FormData: FormDataBodyForm,
};

export interface Props {
  /** Panel's name unique to current test console (used for handling its state only and not displayed anywhere). */
  name: string;
  /** Panel title. */
  title?: string;
  /**
   * Specific format forms. Only supported elements will be displayed. If there is more than one format form, a format picker will be displayed.
   * Supported elements are <HttpTestConsole.BodyForm.Raw>, <HttpTestConsole.BodyForm.Binary> and <HttpTestConsole.BodyForm.FormData>
   */
  children: React.ReactNode;
  /** Current body value. */
  value: HttpReqBodyData;
  /** Change value callback. */
  onChange: (value: HttpReqBodyData) => void;
}

type SubComponentT<T extends React.NamedExoticComponent> = React.FC<
  Omit<React.ComponentProps<T>, 'value' | 'onChange'>
>;

export interface ResultType extends React.NamedExoticComponent<Props> {
  Raw: SubComponentT<typeof RawBodyForm>;
  Binary: SubComponentT<typeof BinaryBodyForm>;
  FormData: SubComponentT<typeof FormDataBodyForm>;
}

const formByFormat: Record<HttpBodyFormats, React.NamedExoticComponent> = {
  [HttpBodyFormats.Raw]: RawBodyForm,
  [HttpBodyFormats.Binary]: BinaryBodyForm,
  [HttpBodyFormats.FormData]: FormDataBodyForm,
};

const defaultValueByFormat: Record<HttpBodyFormats, HttpReqBodyValue> = {
  [HttpBodyFormats.Raw]: '',
  [HttpBodyFormats.Binary]: null,
  [HttpBodyFormats.FormData]: {},
};

const labelByFormat: Record<HttpBodyFormats, string> = {
  [HttpBodyFormats.Raw]: 'Raw',
  [HttpBodyFormats.Binary]: 'Binary',
  [HttpBodyFormats.FormData]: 'Form data',
};

export const BodyForm: React.FC<Props> = ({ name, title = 'Body', value, children, onChange }) => {
  const isAdded = value !== undefined;

  const supportedFormats = useMemo(() => {
    const formatByBodyEntries = Object.entries(formByFormat);

    return React.Children.toArray(children).reduce<HttpBodyFormats[]>((result, child) => {
      if (!React.isValidElement(child)) {
        return result;
      }

      const formatEntry = formatByBodyEntries.find(([, Component]) => child.type === Component);
      if (!formatEntry || result.includes(formatEntry[0] as HttpBodyFormats)) {
        return result;
      }

      return result.concat(formatEntry[0] as HttpBodyFormats);
    }, []);
  }, [children]);

  const handleValueChange = useCallback(
    (bodyValue: HttpReqBodyValue) => {
      onChange({ ...value, value: bodyValue });
    },
    [onChange, value]
  );

  const currentFormatForm = useMemo(() => {
    if (!isAdded) {
      return null;
    }

    const formElement = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === formByFormat[value.format]
    );

    if (!formElement || !React.isValidElement(formElement)) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.cloneElement(formElement as any, { value: value.value, onChange: handleValueChange });
  }, [children, handleValueChange, isAdded, value]);

  const handleAddClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: React.PointerEvent<any>) => {
      e.stopPropagation();

      onChange({
        format: supportedFormats[0],
        value: defaultValueByFormat[supportedFormats[0]],
      });
    },
    [supportedFormats, onChange]
  );

  const handleRemoveClick = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      onChange(undefined);
    },
    [onChange]
  );

  const handleFormatChange = useCallback<React.ComponentProps<typeof RadioGroup>['onChange']>(
    (_, { value }) => {
      onChange({
        format: value as HttpBodyFormats,
        value: defaultValueByFormat[value as HttpBodyFormats],
      });
    },
    [onChange]
  );

  function renderHeader() {
    let action = (
      <Button as="a" size="small" icon={<AddCircleRegular />} onClick={handleAddClick}>
        Add body
      </Button>
    );

    if (isAdded) {
      action = (
        <Tooltip content="Remove body" relationship="label">
          <Button as="a" icon={<DeleteRegular />} appearance="transparent" onClick={handleRemoveClick} />
        </Tooltip>
      );
    }

    return (
      <div className={styles.header}>
        <span>{title}</span>
        {action}
      </div>
    );
  }

  function renderContent() {
    if (!currentFormatForm) {
      return (
        <div className={styles.empty}>
          <span>No body</span>

          <Button appearance="subtle" size="small" icon={<AddCircleRegular />} onClick={handleAddClick}>
            Add
          </Button>
        </div>
      );
    }

    if (supportedFormats.length <= 1) {
      return currentFormatForm;
    }

    return (
      <>
        <RadioGroup
          className={styles.formatPicker}
          value={value.format}
          layout="horizontal"
          onChange={handleFormatChange}
        >
          {supportedFormats.map((format) => (
            <Radio key={format} value={format} label={labelByFormat[format]} />
          ))}
        </RadioGroup>

        {currentFormatForm}
      </>
    );
  }

  return (
    <TestConsolePanel className={styles.bodyForm} name={name} header={renderHeader()}>
      {renderContent()}
    </TestConsolePanel>
  );
};

const BodyFormMemo = React.memo(BodyForm);
BodyFormMemo.displayName = 'HttpTestConsole.BodyForm';

export default Object.assign(BodyFormMemo, subComponents) as ResultType;
