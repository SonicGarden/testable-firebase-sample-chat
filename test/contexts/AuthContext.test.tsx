import { render, cleanup, screen, waitFor } from '@testing-library/react';
import { renderHook, act as actHook, cleanup as cleanupHook } from '@testing-library/react-hooks';
import type { User } from 'firebase/auth';

const useAuthStateMock = vi.fn();
vi.mock('@/hooks/useAuthState', () => {
  return {
    useAuthState: useAuthStateMock,
  };
});

describe('AuthProvider', async () => {
  const { useAuth, AuthProvider } = await import('@/contexts/AuthContext');
  const AuthedScreen = () => {
    const { currentUser } = useAuth();
    return <div>`${currentUser?.displayName}でログインできました`</div>;
  };
  const TestComponent = () => (
    <AuthProvider>
      <AuthedScreen />
    </AuthProvider>
  );

  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it('未認証の場合、ログイン画面が表示される', async () => {
    useAuthStateMock.mockReturnValue([null, false, undefined]);
    render(<TestComponent />);
    waitFor(() => expect(screen.getByText('ログインしてください')).toBeTruthy());
  });

  it('ローディング中の場合、ローディング画面が表示される', async () => {
    useAuthStateMock.mockReturnValue([null, true, undefined]);
    render(<TestComponent />);
    waitFor(() => expect(screen.getByText('loading...')).toBeTruthy());
  });

  it('認証済みの場合、コンシューマコンポーネントでコンテキストデータが取得できる', async () => {
    useAuthStateMock.mockReturnValue([{ uid: 'test-user-uid', displayName: 'てすたろう' } as User, true, undefined]);
    render(<TestComponent />);
    waitFor(() => expect(screen.getByText('てすたろうでログインできました')).toBeTruthy());
  });
});

const getUserMock = vi.fn();
const addUserMock = vi.fn();
vi.mock('@/lib/user', () => {
  return {
    getUser: getUserMock,
    addUser: addUserMock,
  };
});

const signInGoogleWithPopupMock = vi.fn();
const signOutMock = vi.fn();
vi.mock('@/lib/firebase', async () => {
  const firebase = await vi.importActual<object>('@/lib/firebase');
  return {
    ...firebase,
    signInGoogleWithPopup: signInGoogleWithPopupMock,
    signOut: signOutMock,
  };
});

describe('useAuth', async () => {
  const { useAuth } = await import('@/contexts/AuthContext');

  afterEach(() => {
    vi.resetAllMocks();
    cleanupHook();
  });

  it('初めてのログインの場合、ユーザ情報が登録される', async () => {
    const { result } = renderHook(() => useAuth());

    signInGoogleWithPopupMock.mockResolvedValue({
      user: { uid: 'test-uid', displayName: 'てすたろう', photoURL: null },
    });
    getUserMock.mockResolvedValue({ isExist: false });
    await actHook(async () => {
      await result.current.signInWithGoogle();
    });

    expect(addUserMock).toBeCalledWith({ uid: 'test-uid', displayName: 'てすたろう', photoURL: null });
  });

  it('二回目以降のログインの場合、ユーザ情報は登録されない', async () => {
    const { result } = renderHook(() => useAuth());

    signInGoogleWithPopupMock.mockResolvedValue({
      user: { uid: 'test-uid', displayName: 'てすたろう', photoURL: null },
    });
    getUserMock.mockResolvedValue({ isExist: true });
    await actHook(async () => {
      await result.current.signInWithGoogle();
    });

    expect(addUserMock).not.toBeCalled();
  });

  it('処理中にエラーが発生した場合はログアウトされる', async () => {
    const { result } = renderHook(() => useAuth());

    signInGoogleWithPopupMock.mockResolvedValue({
      user: { uid: 'test-uid', displayName: 'てすたろう', photoURL: null },
    });
    getUserMock.mockRejectedValue('error');
    await actHook(async () => {
      await result.current.signInWithGoogle();
    });

    expect(signOutMock).toBeCalled();
  });
});
