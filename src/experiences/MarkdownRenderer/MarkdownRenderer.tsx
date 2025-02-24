import React from 'react';
import classNames from 'classnames';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeTruncate from 'rehype-truncate';
// TODO: upgrade this package and all related ones when https://github.com/hashicorp/next-mdx-remote/issues/403 fixed
import ReactMarkdown from 'react-markdown';

export interface Props {
  /** A markdown to render. */
  markdown: string;
  /** Maximum length of the rendered markdown. */
  maxLength?: number;
  /** If true, the markdown will be truncated. */
  shouldTruncate?: boolean;
}

export const MarkdownRenderer: React.FC<Props> = ({ markdown, maxLength, shouldTruncate }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        [
          rehypeTruncate,
          {
            maxChars: maxLength,
            disable: typeof maxLength === 'undefined',
          },
        ],
      ]}
      className={classNames(shouldTruncate && 'markdown-truncate')}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default React.memo(MarkdownRenderer);
