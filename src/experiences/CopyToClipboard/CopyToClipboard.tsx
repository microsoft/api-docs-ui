import React, { useCallback, useState } from 'react';
import { Button, Tooltip } from '@fluentui/react-components';
import { Copy16Regular } from '@fluentui/react-icons';

interface Props {
  className?: string;
  content: string;
}

export const CopyToClipboard: React.FC<Props> = ({ className, content }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = useCallback(async () => {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
  }, [content]);

  return (
    <Tooltip
      content={isCopied ? 'Copied to clipboard!' : 'Copy to clipboard'}
      relationship="label"
      hideDelay={isCopied ? 3000 : 250}
    >
      <Button className={className} icon={<Copy16Regular />} appearance="transparent" onClick={handleCopyClick} />
    </Tooltip>
  );
};

export default React.memo(CopyToClipboard);
