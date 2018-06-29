import { Parser, HtmlRenderer } from 'commonmark';

export default (markdown, options) => {
  const reader = new Parser();
  const writer = options ? new HtmlRenderer(options) : new HtmlRenderer();
  const parsed = reader.parse(markdown);
  return writer.render(parsed);
};
