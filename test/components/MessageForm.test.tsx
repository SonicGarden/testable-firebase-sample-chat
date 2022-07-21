import { render, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
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

  it('入力が空欄の時に送信ボタンを押せない', () => {
    render(<MessageForm />);

    const button = screen.getByRole<HTMLButtonElement>('button');
    expect(button.disabled).toBeTruthy();
  });

  it('送信ボタンを押したときにaddMessageが呼ばれる', async () => {
    const spy = vi.spyOn(message, 'addMessage');
    render(<MessageForm />);

    const input = screen.getByLabelText<HTMLInputElement>('content-input');
    fireEvent.change(input, { target: { value: 'dummy-content' } });

    const button = screen.getByRole<HTMLButtonElement>('button');
    fireEvent.click(button);

    expect(spy).toBeCalled();
  });

  it('送信完了後、inputが空欄になる', async () => {
    render(<MessageForm />);

    const input = screen.getByLabelText<HTMLInputElement>('content-input');
    fireEvent.change(input, { target: { value: 'dummy-content' } });

    const button = screen.getByRole<HTMLButtonElement>('button');
    fireEvent.click(button);

    await waitFor(() => expect(input.value).toBe(''));
  });
});
