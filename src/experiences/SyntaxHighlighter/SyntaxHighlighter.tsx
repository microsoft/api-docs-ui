import React from 'react';
import { Prism } from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = Omit<React.ComponentProps<typeof Prism>, 'style' | 'customStyle'>;

export const SyntaxHighlighter: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Prism {...props} customStyle={{ padding: 0, margin: 0 }} style={a11yLight}>
      {children}
    </Prism>
  );
};

export default React.memo(SyntaxHighlighter);
