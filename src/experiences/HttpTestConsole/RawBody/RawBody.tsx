import React, { useCallback } from 'react';
import { Button, Textarea } from '@fluentui/react-components';
import { AddCircleRegular, DeleteRegular } from '@fluentui/react-icons';
import TestConsolePanel from '../TestConsolePanel';
import styles from './RawBody.module.scss';

export interface Props {
  /** Panel's name unique to current test console (used for handling its state only and not displayed anywhere). */
  name: string;
  /** Panel title. */
  title?: string;
  /** Current body value. If undefined - there is currently no body. */
  value?: string;
  /** Body value change callback. */
  onChange: (value: string | undefined) => void;
}

export const RawBody: React.FC<Props> = ({ name, title = 'Body', value, onChange }) => {
  const isAdded = value !== undefined;

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

  function renderHeader() {
    let action = (
      <Button as="a" size="small" icon={<AddCircleRegular />} onClick={handleAddClick}>
        Add body
      </Button>
    );

    if (isAdded) {
      action = (
        <Button as="a" icon={<DeleteRegular />} appearance="transparent" title="Remove" onClick={handleRemoveClick} />
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
      <Textarea
        className={styles.bodyTextArea}
        placeholder="Enter request body"
        value={value}
        autoFocus
        onChange={handleChange}
      />
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
