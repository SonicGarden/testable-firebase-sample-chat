import { render, cleanup, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@/contexts/AuthContext', () => {
  return {
    useAuth: () => ({ currentUser: { uid: 'test-user-uid' } }),
  };
});

const newMessageRefMock = vi.fn().mockReturnValue({ id: 'new-message-id' });
const uploadMessageImageMock = vi.fn().mockResolvedValue({});
const setMessageMock = vi.fn().mockResolvedValue({});
vi.mock('@/lib/message', () => {
  return {
    newMessageRef: newMessageRefMock,
    uploadMessageImage: uploadMessageImageMock,
    setMessage: setMessageMock,
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

  it('画像入力欄が表示される', () => {
    render(<MessageForm />);

    expect(screen.getByLabelText('image-input')).toBeDefined();
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

    expect(setMessageMock).toBeCalled();
  });

  it('送信完了後、メッセージ入力欄がクリアされる', async () => {
    render(<MessageForm />);

    const input = screen.getByLabelText<HTMLInputElement>('content-input');
    await act(() => userEvent.type(input, 'てすとだよ'));

    expect(input).toHaveValue('てすとだよ');

    screen.getByText<HTMLButtonElement>('送信').click();

    await waitFor(() => expect(input).toHaveValue(''));
  });

  it('画像添付の場合は画像アップロード処理が行われる', async () => {
    render(<MessageForm />);

    const contentInput = screen.getByLabelText<HTMLInputElement>('content-input');
    await act(() => userEvent.type(contentInput, 'てすとだよ'));

    const imageInput = screen.getByLabelText<HTMLInputElement>('image-input');
    const file = new File([], 'image.png', { type: 'image/png' });
    await act(() => userEvent.upload(imageInput, file));

    screen.getByText<HTMLButtonElement>('送信').click();

    expect(uploadMessageImageMock).toBeCalled();
  });

  it('送信完了後、メッセージ、画像入力欄がクリアされる', async () => {
    render(<MessageForm />);

    const contentInput = screen.getByLabelText<HTMLInputElement>('content-input');
    await act(() => userEvent.type(contentInput, 'てすとだよ'));

    const imageInput = screen.getByLabelText<HTMLInputElement>('image-input');
    const file = new File([], 'image.png', { type: 'image/png' });
    await act(() => userEvent.upload(imageInput, file));

    expect(contentInput).toHaveValue('てすとだよ');
    expect(imageInput.files?.[0]).toBe(file);

    screen.getByText<HTMLButtonElement>('送信').click();

    await waitFor(() => {
      expect(contentInput).toHaveValue('');
      expect(imageInput.files?.[0]).toBeUndefined();
    });
  });
});
