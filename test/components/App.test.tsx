import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import { App } from '@/components/App';

describe('App.tsx', () => {
  afterEach(() => cleanup());

  it('タイトル文字列が表示される', async () => {
    render(<App />);
    expect(screen.getByText('Sample Chat App')).toBeTruthy();
  });
});
