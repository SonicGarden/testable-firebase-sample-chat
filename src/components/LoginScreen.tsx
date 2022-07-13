import { useAuth } from '@/contexts/AuthContext';

export const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div>
      <div>ログインしてください</div>
      <button onClick={signInWithGoogle}>Googleログイン</button>
    </div>
  );
};
