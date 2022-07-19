import { render, cleanup, screen, waitFor } from '@testing-library/react';
import { useAuth, AuthProvider } from '@/contexts/AuthContext';
import * as useAuthState from '@/hooks/useAuthState';
import type { User } from 'firebase/auth';

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
    vi.spyOn(useAuthState, 'useAuthState').mockReturnValue([null, false, undefined]);
    render(<TestComponent />);
    waitFor(() => expect(screen.getByText('ログインしてください')).toBeTruthy());
  });

  it('ローディング中の場合、ローディング画面が表示される', async () => {
    vi.spyOn(useAuthState, 'useAuthState').mockReturnValue([null, true, undefined]);
    render(<TestComponent />);
    waitFor(() => expect(screen.getByText('loading...')).toBeTruthy());
  });

  it('認証済みの場合、子コンポーネントが表示され、コンテキストデータが取得できる', async () => {
    vi.spyOn(useAuthState, 'useAuthState').mockReturnValue([
      { uid: 'test-user-uid', displayName: 'てすたろう' } as User,
      true,
      undefined,
    ]);
    render(<TestComponent />);
    waitFor(() => expect(screen.getByText('てすたろうでログインできました')).toBeTruthy());
  });
});
