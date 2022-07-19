import { render, cleanup, screen } from '@testing-library/react';
import { Messages } from '@/components/Messages';
import * as useCollectionData from '@/hooks/useCollectionData';
import * as UsersContext from '@/contexts/UsersContext';

describe('Messages', () => {
  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it('ローディング中の場合、ローディング画面が表示される', () => {
    vi.spyOn(useCollectionData, 'useCollectionData').mockReturnValue([[], true, undefined, undefined]);
    render(<Messages />);
    expect(screen.getByText('loading...')).toBeTruthy();
  });

  it('ローディング完了後、メッセージ一覧が表示される', async () => {
    const { userFactory } = await import('@/../test/factories/user');
    const user = userFactory.build({
      id: 'test-user-uid',
      name: 'てすたろう',
    });
    const { messageFactory } = await import('@/../test/factories/message');
    const message = messageFactory.build({
      id: 'test-message-id',
      content: 'テストメッセージ',
      senderId: 'test-user-uid',
    });
    vi.spyOn(useCollectionData, 'useCollectionData').mockReturnValue([[message], false, undefined, undefined]);
    vi.spyOn(UsersContext, 'useUsers').mockReturnValue({
      users: [user],
      usersById: { [user.id]: user },
      loading: false,
    });
    render(<Messages />);
    expect(screen.getByText('テストメッセージ')).toBeTruthy();
    expect(screen.getByText('てすたろう')).toBeTruthy();
  });
});
