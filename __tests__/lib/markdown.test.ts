import {
  parseMarkdown,
  sanitizeMarkdown,
  extractExcerpt,
  estimateReadingTime,
  generateSlug,
  parseKeywords,
  formatKeywords,
} from '@/lib/markdown';

describe('Markdown Utilities', () => {
  describe('parseMarkdown', () => {
    it('parses markdown with front matter', () => {
      const content = `---
title: Test Post
author: John Doe
---

# Content here`;
      
      const result = parseMarkdown(content);
      expect(result.data).toEqual({ title: 'Test Post', author: 'John Doe' });
      expect(result.content).toContain('# Content here');
    });

    it('handles markdown without front matter', () => {
      const content = '# Just content';
      const result = parseMarkdown(content);
      expect(result.data).toEqual({});
      expect(result.content).toBe('# Just content');
    });
  });

  describe('sanitizeMarkdown', () => {
    it('removes script tags', () => {
      const content = 'Hello <script>alert("XSS")</script> World';
      const result = sanitizeMarkdown(content);
      expect(result).toBe('Hello  World');
    });

    it('removes event handlers', () => {
      const content = '<div onclick="alert(1)">Click me</div>';
      const result = sanitizeMarkdown(content);
      expect(result).not.toContain('onclick');
    });

    it('removes javascript: protocol', () => {
      const content = '[Link](javascript:alert(1))';
      const result = sanitizeMarkdown(content);
      expect(result).not.toContain('javascript:');
    });
  });

  describe('extractExcerpt', () => {
    it('extracts excerpt from content', () => {
      const content = '# Title\n\nThis is the first paragraph. It should be extracted.';
      const result = extractExcerpt(content, 50);
      expect(result).toBe('Title This is the first paragraph. It should...');
    });

    it('removes markdown syntax', () => {
      const content = '**Bold** and *italic* text with [link](url)';
      const result = extractExcerpt(content);
      expect(result).toBe('Bold and italic text with link');
    });

    it('handles short content', () => {
      const content = 'Short text';
      const result = extractExcerpt(content);
      expect(result).toBe('Short text');
    });
  });

  describe('estimateReadingTime', () => {
    it('calculates reading time correctly', () => {
      const content = Array(200).fill('word').join(' ');
      const result = estimateReadingTime(content, 200);
      expect(result).toBe(1);
    });

    it('rounds up partial minutes', () => {
      const content = Array(250).fill('word').join(' ');
      const result = estimateReadingTime(content, 200);
      expect(result).toBe(2);
    });
  });

  describe('generateSlug', () => {
    it('generates slug from title', () => {
      const title = 'Hello World: A Test Post';
      const result = generateSlug(title);
      expect(result).toBe('hello-world-a-test-post');
    });

    it('removes special characters', () => {
      const title = 'Test!@#$%^&*()Post';
      const result = generateSlug(title);
      expect(result).toBe('testpost');
    });

    it('replaces spaces with hyphens', () => {
      const title = 'Multiple   Spaces   Here';
      const result = generateSlug(title);
      expect(result).toBe('multiple-spaces-here');
    });
  });

  describe('parseKeywords', () => {
    it('parses comma-separated keywords', () => {
      const keywords = 'javascript, nextjs, react';
      const result = parseKeywords(keywords);
      expect(result).toEqual(['javascript', 'nextjs', 'react']);
    });

    it('trims whitespace', () => {
      const keywords = '  javascript  ,  nextjs  ';
      const result = parseKeywords(keywords);
      expect(result).toEqual(['javascript', 'nextjs']);
    });

    it('handles empty string', () => {
      const result = parseKeywords('');
      expect(result).toEqual([]);
    });
  });

  describe('formatKeywords', () => {
    it('formats array to comma-separated string', () => {
      const keywords = ['javascript', 'nextjs', 'react'];
      const result = formatKeywords(keywords);
      expect(result).toBe('javascript,nextjs,react');
    });

    it('filters empty strings', () => {
      const keywords = ['javascript', '', 'react'];
      const result = formatKeywords(keywords);
      expect(result).toBe('javascript,react');
    });
  });
});
