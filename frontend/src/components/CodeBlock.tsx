import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface CodeBlockProps {
  value: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ value, language }) => (
  <SyntaxHighlighter language={language || null}>{value}</SyntaxHighlighter>
);

export default CodeBlock;
