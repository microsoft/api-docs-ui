import React from 'react';
import InfoPanel from '@/experiences/InfoPanel';
import SyntaxHighlighter from '@/experiences/SyntaxHighlighter';
import CopyToClipboard from '@/experiences/CopyToClipboard';
import styles from './RawSchema.module.scss';

export interface Props {
  /** Panel title */
  title: string;
  /** Raw schema string */
  schema: string;
  /** Schema definition language compatible with Prism.js */
  language: string;
}

export const RawSchema: React.FC<Props> = ({ title, schema, language }) => {
  return (
    <InfoPanel
      title={
        <>
          {title} <CopyToClipboard className={styles.copyBtn} content={schema} />
        </>
      }
      className={styles.rawSchema}
    >
      <SyntaxHighlighter language={language}>{schema}</SyntaxHighlighter>
    </InfoPanel>
  );
};

export default React.memo(RawSchema);
