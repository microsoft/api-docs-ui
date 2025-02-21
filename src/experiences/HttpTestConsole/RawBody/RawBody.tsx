import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dropdown, Option, Textarea, Field, Tooltip } from '@fluentui/react-components';
import { AddCircleRegular, DeleteRegular, ArrowClockwiseRegular } from '@fluentui/react-icons';
import classNames from 'classnames';
import TestConsolePanel from '../TestConsolePanel';
import styles from './RawBody.module.scss';

interface RawDataSample {
  name: string;
  value: string;
}

export interface Props {
  /** Panel's name unique to current test console (used for handling its state only and not displayed anywhere). */
  name: string;
  /** Panel title. */
  title?: string;
  /** Current body value. If undefined - there is currently no body. */
  value?: string;
  /**
   * Data samples to be displayed in the dropdown.
   * If passed - the first example will be selected by default.
   * If there is only one value - dropdown will be hidden.
   */
  dataSamples?: RawDataSample[];
  /** Body value change callback. */
  onChange: (value: string | undefined) => void;
}

export const RawBody: React.FC<Props> = ({ name, title = 'Body', value, dataSamples, onChange }) => {
  const [currentSample, setCurrentSample] = useState<RawDataSample | undefined>(dataSamples?.[0]);
  const [originalValue, setOriginalValue] = useState(value);

  const isAdded = value !== undefined;
  const hasValueChanged = value !== originalValue;

  const applySample = useCallback(
    (sample: RawDataSample) => {
      onChange(sample.value);
      setOriginalValue(sample.value);
      setCurrentSample(sample);
    },
    [onChange]
  );

  useEffect(() => {
    if (!dataSamples?.length) {
      return;
    }

    applySample(dataSamples[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSampleSelect = useCallback<React.ComponentProps<typeof Dropdown>['onOptionSelect']>(
    (_, { optionValue }) => {
      applySample(dataSamples?.find((sample) => sample.name === optionValue));
    },
    [applySample, dataSamples]
  );

  const handleChange = useCallback<React.ComponentProps<typeof Textarea>['onChange']>(
    (_, { value }) => {
      onChange(value);
    },
    [onChange]
  );

  const handleAddClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: React.PointerEvent<any>) => {
      e.stopPropagation();
      setOriginalValue('');
      onChange('');
    },
    [onChange]
  );

  const handleRemoveClick = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      onChange(undefined);
    },
    [onChange]
  );

  const handleRevertClick = useCallback(() => {
    onChange(originalValue);
  }, [onChange, originalValue]);

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
    if (!isAdded) {
      return (
        <div className={styles.empty}>
          <span>No body</span>

          <Button appearance="subtle" size="small" icon={<AddCircleRegular />} onClick={handleAddClick}>
            Add
          </Button>
        </div>
      );
    }

    return (
      <>
        {dataSamples?.length > 1 && (
          <Dropdown
            aria-label="Sample request body"
            placeholder="Select sample request body"
            className={classNames(styles.sampleDropdown, 'request-body-dropdown')}
            value={currentSample?.name}
            selectedOptions={[currentSample?.name]}
            onOptionSelect={handleSampleSelect}
          >
            {dataSamples.map((dataSample) => (
              <Option key={dataSample.name} value={dataSample.name}>
                {dataSample.name}
              </Option>
            ))}
          </Dropdown>
        )}
        <Field>
          <Textarea
            className={classNames(styles.bodyTextArea, 'raw-textarea')}
            aria-label="Request body"
            placeholder="Enter request body"
            resize="vertical"
            value={value}
            autoFocus
            onChange={handleChange}
          />
        </Field>
        {hasValueChanged && (
          <Button
            className={classNames(styles.revertBtn, 'body-revert-button')}
            icon={<ArrowClockwiseRegular />}
            onClick={handleRevertClick}
          >
            Revert changes
          </Button>
        )}
      </>
    );
  }

  return (
    <TestConsolePanel className={styles.rawBody} name={name} header={renderHeader()}>
      {renderContent()}
    </TestConsolePanel>
  );
};

const RawBodyMemo = React.memo(RawBody);
RawBodyMemo.displayName = 'HttpTestConsole.RawBody';

export default RawBodyMemo;
