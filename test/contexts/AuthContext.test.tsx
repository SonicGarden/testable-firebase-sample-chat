import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, cleanup, screen, waitFor } from '@testing-library/react';
import { useAuth, AuthProvider } from '@/contexts/AuthContext';

const AuthedScreen = () => {
  const { currentUser } = useAuth();
  return <div>`${currentUser?.displayName}でログインできました`</div>;
};

const TestComponent = () => (
  <AuthProvider>
    <AuthedScreen />
  </AuthProvider>
);

describe('AuthContext', () => {
  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it('未認証の場合、ログイン画面が表示される', async () => {
    vi.mock('@/hooks/useAuthState', () => {
      return {
        useAuthState: () => [null, false],
      };
    });
    render(<TestComponent />);
    waitFor(() => expect(screen.getByText('ログインしてください')).toBeTruthy());
  });

  it('ローディング中の場合、ローディング画面が表示される', async () => {
    vi.mock('@/hooks/useAuthState', () => {
      return {
        useAuthState: () => [null, true],
      };
    });
    render(<TestComponent />);
    waitFor(() => expect(screen.getByText('loading...')).toBeTruthy());
  });

  it('認証済みの場合、子コンポーネントが表示され、コンテキストデータが取得できる', async () => {
    vi.mock('@/hooks/useAuthState', () => {
      return {
        useAuthState: () => [{ uid: 'test-user-uid', displayName: 'てすたろう' }, true],
      };
    });
    render(<TestComponent />);
    waitFor(() => expect(screen.getByText('てすたろうでログインできました')).toBeTruthy());
  });
});
