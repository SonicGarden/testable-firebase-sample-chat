import { render, cleanup, screen } from '@testing-library/react';
import { Messages } from '@/components/Messages';
import * as useCollectionData from '@/hooks/useCollectionData';

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
    const { messageFactory } = await import('@/../test/factories/message');
    const message = messageFactory.build({
      id: 'test-message-id',
      content: 'テストメッセージ',
      senderId: 'test-user-uid',
    });
    vi.spyOn(useCollectionData, 'useCollectionData').mockReturnValue([[message], false, undefined, undefined]);
    render(<Messages />);
    expect(screen.getByText('Messages')).toBeTruthy();
  });
});
