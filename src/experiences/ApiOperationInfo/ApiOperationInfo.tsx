import React, { useCallback, useState } from 'react';
import { Stack } from '@fluentui/react';
import { Badge, Button, Tooltip } from '@fluentui/react-components';
import { Copy16Regular } from '@fluentui/react-icons';
import { ApiOperation } from '@/types/apiOperation';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ApiOperationMethod from '@/components/ApiOperationMethod';
import styles from './ApiOperationInfo.module.scss';

export interface Props {
  /** Operation data. */
  operation: ApiOperation;
  /** Request endpoint url. */
  requestUrl: string;
  /** Optional operation tags. */
  tags?: string[];
}

export const ApiOperationInfo: React.FC<Props> = ({ operation, requestUrl, tags }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyClick = useCallback(async () => {
    await navigator.clipboard.writeText(requestUrl);
    setIsCopied(true);
  }, [requestUrl]);

  return (
    <div className={styles.apiOperationInfo}>
      <div className={styles.general}>
        <h5>{operation.displayName}</h5>

        {operation.description && (
          <div className={styles.description}>
            <MarkdownRenderer markdown={operation.description} />
          </div>
        )}

        {!!tags?.length && (
          <Stack className={styles.tags} horizontal>
            <strong>Tags:</strong>

            {tags.map((tag) => (
              <Badge key={tag} className={styles.tag} color="important" appearance="outline">
                {tag}
              </Badge>
            ))}
          </Stack>
        )}
      </div>

      <div className={styles.requestUrlRow}>
        <span className={styles.requestUrl}>
          <ApiOperationMethod className={styles.method} method={operation.method} />

          {requestUrl}
        </span>

        <Tooltip
          content={isCopied ? 'Copied to clipboard!' : 'Copy to clipboard'}
          relationship="description"
          hideDelay={isCopied ? 3000 : 250}
        >
          <Button icon={<Copy16Regular />} appearance="transparent" onClick={handleCopyClick} />
        </Tooltip>
      </div>
    </div>
  );
};

export default React.memo(ApiOperationInfo);
