import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dropdown, Field, Option, Textarea } from '@fluentui/react-components';
import classNames from 'classnames';
import { ArrowClockwiseRegular } from '@fluentui/react-icons';
import { HttpRawBodyDataSample } from '@/types/testConsole';
import styles from './RawBodyForm.module.scss';

export interface Props {
  /**
   * Data samples to be displayed in the dropdown.
   * If passed - the first example will be selected by default.
   * If there is only one value - dropdown will be hidden.
   */
  dataSamples?: HttpRawBodyDataSample[];
  /** Current value. */
  value?: string;
  /** Change value callback. */
  onChange: (value: string) => void;
}

export const RawBodyForm: React.FC<Props> = ({ dataSamples, value, onChange }) => {
  const [currentSample, setCurrentSample] = useState<HttpRawBodyDataSample | undefined>(dataSamples?.[0]);
  const [originalValue, setOriginalValue] = useState(value);

  const hasValueChanged = value !== originalValue;

  const applySample = useCallback(
    (sample: HttpRawBodyDataSample) => {
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

  const handleRevertClick = useCallback(() => {
    onChange(originalValue);
  }, [onChange, originalValue]);

  return (
    <div className={styles.rawBodyForm}>
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
    </div>
  );
};

const RawBodyFormMemo = React.memo(RawBodyForm);
RawBodyFormMemo.displayName = 'HttpTestConsole.BodyForm.Raw';

export default RawBodyFormMemo;
