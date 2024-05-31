import { removeHtmlTags } from './textUtils';

describe('removeHtmlTags', () => {
  test('handles empty input', () => {
    const input: string = '';
    const expectedOutput: string = '';
    expect(removeHtmlTags(input)).toEqual(expectedOutput);
  });

  test('removes HTML tags from a string', () => {
    const input: string = '<p>This is <b>bold</b> text.</p>';
    const expectedOutput: string = 'This is bold text.';
    expect(removeHtmlTags(input)).toEqual(expectedOutput);
  });

  test('handles input without HTML tags', () => {
    const input: string = 'This is a plain text.';
    const expectedOutput: string = 'This is a plain text.';
    expect(removeHtmlTags(input)).toEqual(expectedOutput);
  });
});
