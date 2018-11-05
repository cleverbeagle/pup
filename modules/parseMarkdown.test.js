import parseMarkdown from './parseMarkdown';

describe('parseMarkdown.js', () => {
  test('it returns HTML when passed a string of Markdown', () => {
    const html = parseMarkdown('### Testing\n**Markdown** is working.');
    expect(html).toBe('<h3>Testing</h3>\n<p><strong>Markdown</strong> is working.</p>\n');
  });
});
