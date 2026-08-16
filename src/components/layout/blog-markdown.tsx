import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogMarkdownProps = {
  content: string;
};

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tight mt-12 mb-6 leading-tight first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-black text-brand-primary tracking-tight mt-12 mb-5 leading-tight first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-bold text-brand-neutral tracking-tight mt-10 mb-4">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg md:text-xl font-bold text-brand-neutral mt-8 mb-3">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-brand-neutral/90 leading-relaxed text-lg mb-6">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-brand-neutral">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-2 mb-6 text-brand-neutral/90 text-lg marker:text-brand-primary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-2 mb-6 text-brand-neutral/90 text-lg marker:text-brand-primary marker:font-bold">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed pl-1">{children}</li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand-primary underline decoration-brand-primary/40 underline-offset-2 hover:decoration-brand-primary transition-colors"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-brand-primary bg-brand-primary/5 pl-6 pr-4 py-4 my-8 italic text-brand-neutral/90 text-lg rounded-r-2xl">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-t border-brand-neutral/15" />,
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    return (
      <span className="block my-10">
        <span className="block relative w-full aspect-[16/9] rounded-[2rem] overflow-hidden shadow-xl">
          <Image
            src={src}
            alt={alt || ""}
            fill
            className="object-cover"
          />
        </span>
        {alt && (
          <span className="block text-center text-sm text-brand-neutral/60 mt-3 italic">
            {alt}
          </span>
        )}
      </span>
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto my-8 rounded-2xl border border-brand-neutral/15">
      <table className="w-full text-left border-collapse text-base">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-brand-primary/10">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-brand-neutral/10">{children}</tbody>
  ),
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 font-bold text-brand-primary align-top whitespace-normal">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-brand-neutral/85 align-top whitespace-normal">
      {children}
    </td>
  ),
};

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <div className="blog-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
