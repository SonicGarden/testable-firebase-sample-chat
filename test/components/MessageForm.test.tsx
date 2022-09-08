import { render, cleanup, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@/contexts/AuthContext', () => {
  return {
    useAuth: () => ({ currentUser: { uid: 'test-user-uid' } }),
  };
});

const addMessageMock = vi.fn().mockResolvedValue({});
vi.mock('@/lib/message', () => {
  return {
    addMessage: addMessageMock,
  };
});

describe('MessageForm', async () => {
  const { MessageForm } = await import('@/components/MessageForm');

  afterEach(() => {
    cleanup();
  });

  it('メッセージ入力欄が表示される', () => {
    render(<MessageForm />);

    expect(screen.getByLabelText('content-input')).toBeDefined();
  });

  it('送信ボタンが表示される', () => {
    render(<MessageForm />);

    expect(screen.getByText('送信')).toBeDefined();
  });

  it('入力が空欄の時に送信ボタンを押せない', () => {
    render(<MessageForm />);

    const button = screen.getByText<HTMLButtonElement>('送信');
    expect(button).toBeDisabled();
  });

  it('送信ボタンを押したときにメッセージ投稿処理が呼ばれる', async () => {
    render(<MessageForm />);

    const input = screen.getByLabelText<HTMLInputElement>('content-input');
    await act(() => userEvent.type(input, 'てすとだよ'));

    screen.getByText<HTMLButtonElement>('送信').click();

    expect(addMessageMock).toBeCalled();
  });

  it('送信完了後、メッセージ入力欄がクリアされる', async () => {
    render(<MessageForm />);

    const input = screen.getByLabelText<HTMLInputElement>('content-input');
    await act(() => userEvent.type(input, 'てすとだよ'));

    expect(input).toHaveValue('てすとだよ');

    screen.getByText<HTMLButtonElement>('送信').click();

    await waitFor(() => expect(input).toHaveValue(''));
  });
});
