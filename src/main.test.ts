import { describe, expect, it } from 'vitest';
import { sanitizeFilename } from './main';

describe('filename sanitization', () => {
  it('removes unsupported characters and preserves a safe extension', () => {
    const filename = sanitizeFilename('Mario: The Lost Levels!');

    expect(filename).toBe('Mario_ The Lost Levels_.jpg');
  });
});
