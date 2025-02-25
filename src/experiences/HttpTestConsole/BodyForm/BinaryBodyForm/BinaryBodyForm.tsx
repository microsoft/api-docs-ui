import React, { useCallback } from 'react';
import FileInput from '@/components/FileInput';

export interface Props {
  /** Current value. */
  value?: File | null;
  /** Change value callback. */
  onChange: (value: File | null) => void;
}

export const BinaryBodyForm: React.FC<Props> = ({ value, onChange }) => {
  const onFileChange = useCallback<React.ComponentProps<typeof FileInput>['onChange']>(
    (_, file?: File) => {
      if (!file) {
        return;
      }

      onChange(file);
    },
    [onChange]
  );

  return (
    <div>
      <FileInput value={value} onChange={onFileChange} />
    </div>
  );
};

const BinaryBodyFormMemo = React.memo(BinaryBodyForm);
BinaryBodyFormMemo.displayName = 'HttpTestConsole.BodyForm.Binary';

export default BinaryBodyFormMemo;
