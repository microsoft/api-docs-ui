import React, { useCallback } from 'react';
import { Body1, Button, Label } from '@fluentui/react-components';
import { ArrowUploadRegular } from '@fluentui/react-icons';
import styles from './FileInput.module.scss';

export interface Props {
  value?: File;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, file?: File) => void;
}

export const FileInput: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e, e.target.files[0]);
    },
    [onChange]
  );

  return (
    <Label className={styles.fileInput}>
      <Button as="a" className="request-body-upload-button" icon={<ArrowUploadRegular />}>
        Select file
      </Button>
      <Body1 className={styles.fileName}>{value?.name}</Body1>
      <input type="file" onChange={handleChange} />
    </Label>
  );
};

export default React.memo(FileInput);
