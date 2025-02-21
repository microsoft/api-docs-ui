import React, { useCallback, useState } from 'react';
import { Button, Tooltip } from '@fluentui/react-components';
import { Copy16Regular } from '@fluentui/react-icons';
import classNames from 'classnames';
import { getFluentProviderRoot } from '@/utils/fluent';

export interface Props {
  /** An optional class name to be applied to the button */
  className?: string;
  /** Content that will be copied on click */
  content: string;
  /** Button appearance */
  appearance?: 'transparent' | 'subtle';
}

export const CopyToClipboard: React.FC<Props> = ({ className, content, appearance = 'transparent' }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = useCallback(async () => {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
  }, [content]);

  return (
    <Tooltip
      content={isCopied ? 'Copied to clipboard!' : 'Copy to clipboard'}
      relationship="label"
      mountNode={getFluentProviderRoot()}
      hideDelay={isCopied ? 3000 : 250}
    >
      <Button
        className={classNames(className, 'request-copy-button')}
        icon={<Copy16Regular />}
        appearance={appearance}
        onClick={handleCopyClick}
      />
    </Tooltip>
  );
};

export default React.memo(CopyToClipboard);
