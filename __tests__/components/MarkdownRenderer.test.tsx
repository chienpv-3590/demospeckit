/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

describe('MarkdownRenderer', () => {
  it('renders markdown content correctly', () => {
    const content = '# Hello World\n\nThis is a **test**.';
    render(<MarkdownRenderer content={content} />);
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello World');
    expect(screen.getByText(/This is a/)).toBeInTheDocument();
  });

  it('renders code blocks with syntax highlighting', () => {
    const content = '```javascript\nconst x = 5;\n```';
    render(<MarkdownRenderer content={content} />);
    
    const codeElement = screen.getByText(/const x = 5/);
    expect(codeElement).toBeInTheDocument();
  });

  it('renders links correctly', () => {
    const content = '[Click here](https://example.com)';
    render(<MarkdownRenderer content={content} />);
    
    const link = screen.getByRole('link', { name: 'Click here' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders tables correctly', () => {
    const content = `| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |`;
    render(<MarkdownRenderer content={content} />);
    
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
  });
});
