import { render, cleanup, fireEvent } from '@testing-library/react';
import * as message from '@/lib/message';

vi.mock('@/contexts/AuthContext', () => {
  return {
    useAuth: () => ({ currentUser: { uid: 'test-user-uid' } }),
  };
});

describe('MessageForm', async () => {
  const { MessageForm } = await import('@/components/MessageForm');

  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it('submitボタンを押したときにaddMessageが呼ばれる', async () => {
    const spy = vi.spyOn(message, 'addMessage');
    const { container } = render(<MessageForm />);
    const input = container.querySelector('input') as HTMLElement;

    fireEvent.change(input, { target: { value: 'dummy-content' } });

    const button = container.querySelector('button') as HTMLButtonElement;
    fireEvent.submit(button);

    expect(spy).toBeCalled();
  });
});
