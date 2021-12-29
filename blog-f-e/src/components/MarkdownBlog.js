import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
//import {dark, duotoneLight, materialLight, atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';

export const MarkdownBlog = ({ blogContent }) => {
    return (
        <ReactMarkdown
          className='blog-items__content'
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          children={blogContent}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        />
    )
};

//<ReactMarkdown remarkPlugins={[remarkGfm]}>
//            <SyntaxHighlighter style={dark} language={/language-(\w+)/.exec(className || '')[1]} PreTag="div">
//                {blogContent}
//            </SyntaxHighlighter>
//        </ReactMarkdown>

export default MarkdownBlog;