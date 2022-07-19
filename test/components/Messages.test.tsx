import { render, cleanup, screen } from '@testing-library/react';
import { Messages } from '@/components/Messages';

describe('Messages', () => {
  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it('ローディング中の場合、ローディング画面が表示される', () => {
    vi.mock('@/hooks/useCollectionData', () => {
      return {
        useCollectionData: () => [[], true],
      };
    });

    render(<Messages />);
    expect(screen.getByText('loading...')).toBeTruthy();
  });

  it('ローディング完了後、メッセージ一覧が表示される', () => {
    vi.mock('@/hooks/useCollectionData', async () => {
      const { messageFactory } = await import('@/../test/factories/message');
      const message = messageFactory.build({
        id: 'test-message-id',
        content: 'テストメッセージ',
        senderId: 'test-user-uid',
      });

      return {
        useCollectionData: () => [[message], false],
      };
    });

    render(<Messages />);
    expect(screen.getByText('Messages')).toBeTruthy();
  });
});
