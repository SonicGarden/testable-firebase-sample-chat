import { ReactNode, createContext, useContext, useCallback } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { useAuthState } from '@/hooks/useAuthState';
import { LoadingScreen } from '@/components/LoadingScreen';
import { LoginScreen } from '@/components/LoginScreen';
import { User, signInGoogleWithPopup, signOut } from '@/lib/firebase';
import { getUser, addUser } from '@/lib/user';
import { setUserSecret } from '@/lib/userSecret';

type AuthContextValue = {
  currentUser: User | null;
};

export const AuthContext = createContext<AuthContextValue>({ currentUser: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, loading] = useAuthState();

  if (loading) return <LoadingScreen />;
  if (!currentUser) return <LoginScreen />;

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const { currentUser } = useContext(AuthContext);
  const signInWithGoogle = useCallback(async () => {
    try {
      const { user } = await signInGoogleWithPopup();
      const fcmToken = await getToken(getMessaging(), { vapidKey: import.meta.env.VITE_FIREBASE_MESSAGING_VAPID_KEY });
      const { isExist } = await getUser(user.uid);
      if (!isExist) await addUser(user);
      await setUserSecret(user.uid, { fcmToken });
    } catch (e) {
      console.error(e);
      await signOut();
    }
  }, []);

  return { currentUser, signInWithGoogle, signOut };
};
