import { render, cleanup, screen } from '@testing-library/react';
import { Messages } from '@/components/Messages';

describe('Messages', () => {
  afterEach(() => cleanup());

  it('test', async () => {
    render(<Messages />);
    expect(screen.getByText('Messages')).toBeTruthy();
  });
});
