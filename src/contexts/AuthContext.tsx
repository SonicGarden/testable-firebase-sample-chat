import { ReactNode, createContext, useContext } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, updateCurrentUser } from 'firebase/auth';
import { getMessaging, getToken } from 'firebase/messaging';
import { useAuthState } from '@/hooks/useAuthState';
import { LoadingScreen } from '@/components/LoadingScreen';
import { LoginScreen } from '@/components/LoginScreen';
import type { User } from '@/lib/firebase';
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
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(getAuth(), provider);
      const fcmToken = await getToken(getMessaging(), { vapidKey: import.meta.env.VITE_FIREBASE_MESSAGING_VAPID_KEY });
      const { isExist: isExistUser } = await getUser(user.uid);
      if (!isExistUser) await addUser(user);
      await setUserSecret(user.uid, { fcmToken });
    } catch (e) {
      console.error(e);
      await updateCurrentUser(getAuth(), null);
    }
  };

  
  return { currentUser, signInWithGoogle, signOut };
};
