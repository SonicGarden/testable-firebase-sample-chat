import { render, cleanup, screen, waitFor } from '@testing-library/react';
import { Message } from '@/components/Message';
import { userFactory } from '@/../test/factories/user';
import { messageFactory } from '@/../test/factories/message';
import { Timestamp } from 'firebase/firestore';

describe('Message', () => {
  afterEach(() => cleanup());

  vi.mock('@/context/UsersContext', () => {
    return {
      useUsers: { usersById: { 'user-id': [sender] } },
    };
  });

  const sender = userFactory.build({
    id: 'user-id',
    name: 'テストユーザー',
    photoUrl: 'dummy-url',
  });

  const message = messageFactory.build({
    content: `テストのメッセージ`,
    senderId: 'user-id',
    createdAt: Timestamp.fromDate(new Date('2022-07-01 00:00:00+09:00')),
  });

  it('loading中はloadingメッセージが表示される', () => {
    render(<Message message={message} />);
    expect(screen.getByText('loading...')).toBeTruthy();
  })

  it('アイコン画像が表示される', () => {
    render(<Message message={message} />);
    waitFor(() => expect(screen.getByRole('img').getAttribute('src')).toBe('dummy-url'));
  });

  it('送信者の名前が表示される', () => {
    render(<Message message={message} />);
    waitFor(() => expect(screen.getByText('テストユーザー')).toBeTruthy());
  });

  it('送信時間が表示される', () => {
    render(<Message message={message} />);
    waitFor(() => expect(screen.getByText('2022-07-01 00:00')).toBeTruthy());
  });

  it('メッセージが表示される', () => {
    render(<Message message={message} />);
    waitFor(() => expect(screen.getByText('テストのメッセージ')).toBeTruthy());
  });
});
