import { truncateText } from '@/utils/truncate-text';

describe('truncateText', () => {
  const testString = 'aaaaaaaaaa bbb ccccc dddddddddddddddddddd ee ff';
  it('Should truncate first word if length is too short', () => {
    const truncateResult = truncateText(testString, 1);
    expect(truncateResult).toBe('a...');
  });
  it('Should truncate text based on last white space', () => {
    // "aaaaaaaaaa bb" -> "aaaaaaaaaa"
    const truncateResult = truncateText(testString, 13);
    expect(truncateResult).toBe('aaaaaaaaaa...');
  });
  it('Should truncate text based on last white space', () => {
    // "aaaaaaaaaa bbb" -> "aaaaaaaaaa bbb"
    const truncateResult = truncateText(testString, 14);
    expect(truncateResult).toBe('aaaaaaaaaa bbb...');
  });
  it('Should truncate text based on last white space', () => {
    // "aaaaaaaaaa bbb ccccc " -> "aaaaaaaaaa bbb ccccc"
    const truncateResult = truncateText(testString, 21);
    expect(truncateResult).toBe('aaaaaaaaaa bbb ccccc...');
  });
});
