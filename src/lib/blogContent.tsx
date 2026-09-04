import React from "react";

// Parses the plain-text blog post format used by the admin editor
// ("leave a blank line between paragraphs") into typed content blocks so
// the post page can render real semantic HTML instead of one giant <p>.
//
// Conventions detected, based on how posts are actually written today:
//  - A short (<=90 char) single line with no trailing sentence punctuation
//    is a section heading.
//  - A block where every line starts "1. ", "2. " etc. is a numbered list.
//  - A two-line block whose first line ends in "?" is an FAQ question/answer
//    pair (used both for rendering and for FAQPage structured data).
//  - Anything else is a normal paragraph.

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "faq"; question: string; answer: string };

const URL_RE = /(https?:\/\/[^\s]+[^\s.,;:!?)\]])/g;

function isHeadingLine(line: string): boolean {
  if (line.length === 0 || line.length > 90) return false;
  if (/^\d+\.\s/.test(line)) return false;
  if (/[.,;]$/.test(line)) return false;
  return true;
}

function isNumberedListBlock(lines: string[]): boolean {
  return lines.length > 1 && lines.every((l) => /^\d+\.\s/.test(l));
}

export function parseBlogContent(content: string): ContentBlock[] {
  const blocks = content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block): ContentBlock => {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    if (isNumberedListBlock(lines)) {
      return { type: "list", items: lines.map((l) => l.replace(/^\d+\.\s*/, "")) };
    }

    if (lines.length === 2 && lines[0].endsWith("?") && lines[0].length <= 160) {
      return { type: "faq", question: lines[0], answer: lines[1] };
    }

    if (lines.length === 1 && isHeadingLine(lines[0])) {
      return { type: "heading", text: lines[0] };
    }

    return { type: "paragraph", text: block };
  });
}

export function extractFaqs(blocks: ContentBlock[]): { question: string; answer: string }[] {
  return blocks
    .filter((b): b is Extract<ContentBlock, { type: "faq" }> => b.type === "faq")
    .map(({ question, answer }) => ({ question, answer }));
}

function linkifyText(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(URL_RE);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={`${keyPrefix}-${i}`}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline break-words hover:no-underline"
      >
        {part}
      </a>
    ) : (
      <React.Fragment key={`${keyPrefix}-${i}`}>{part}</React.Fragment>
    )
  );
}

export function renderBlogContent(content: string): React.ReactNode {
  const blocks = parseBlogContent(content);

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className="mt-10 font-heading text-2xl font-bold text-dark">
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ol key={i} className="list-decimal space-y-2 pl-6">
                {block.items.map((item, j) => (
                  <li key={j}>{linkifyText(item, `${i}-${j}`)}</li>
                ))}
              </ol>
            );
          case "faq":
            return (
              <div key={i} className="mt-6">
                <h3 className="font-heading text-lg font-semibold text-dark">{block.question}</h3>
                <p className="mt-1 whitespace-pre-line">{linkifyText(block.answer, `${i}`)}</p>
              </div>
            );
          case "paragraph":
          default:
            return (
              <p key={i} className="whitespace-pre-line">
                {linkifyText(block.text, `${i}`)}
              </p>
            );
        }
      })}
    </>
  );
}
