import { render, cleanup } from '@testing-library/react';
import { Messages } from '@/components/Messages';

describe('Messages', () => {
  afterEach(() => cleanup());

  it('test', () => {
    render(<Messages />);
  });
});
