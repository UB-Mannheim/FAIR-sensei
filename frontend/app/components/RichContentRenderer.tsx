import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Citation from './Citation';

interface Props {
  richContent: string;
}

const RichContentRenderer: React.FC<Props> = ({ richContent }) => {
  return (
    <div className="mb-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          a({ node, ...props }: any) {
            const { href, children } = props;
            if (children && children?.[0].match(/^\d+$/)) {
              const citationNumber = children[0];
              return (
                <a href={href} className="inline-block">
                  <Citation number={Number(citationNumber)} />
                </a>
              );
            }
            return <a {...props}>{children}</a>;
          },
        }}
      >
        {richContent}
      </ReactMarkdown>
    </div>
  );
};

export default RichContentRenderer;
