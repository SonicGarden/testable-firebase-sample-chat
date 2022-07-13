import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import { Message } from '@/components/Message';
import { userFactory } from '@/../test/factories/user';
import { messageFactory } from '@/../test/factories/message';
import { Timestamp } from 'firebase/firestore';

describe('Message', () => {
  afterEach(() => cleanup());

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

  it('アイコン画像が表示される', () => {
    render(<Message message={message} sender={sender} />);
    expect(screen.getByRole('img').getAttribute('src')).toBe('dummy-url');
  });

  it('送信者の名前が表示される', () => {
    render(<Message message={message} sender={sender} />);
    expect(screen.getByText('テストユーザー')).toBeTruthy();
  });

  it('送信時間が表示される', () => {
    render(<Message message={message} sender={sender} />);
    expect(screen.getByText('2022-07-01 00:00')).toBeTruthy();
  });

  it('メッセージが表示される', () => {
    render(<Message message={message} sender={sender} />);
    expect(screen.getByText('テストのメッセージ')).toBeTruthy();
  });
});
