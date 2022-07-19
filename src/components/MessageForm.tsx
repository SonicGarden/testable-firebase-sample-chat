import { useRef } from 'react';
import { serverTimestamp } from '@/lib/firebase';
import { addMessage } from '@/lib/message';
import { useAuth } from '@/contexts/AuthContext';

export const MessageForm = () => {
  const { currentUser } = useAuth();
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!ref.current || !currentUser) return;

    await addMessage({
      content: ref.current.value,
      senderId: currentUser.uid,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={ref} />
      <button onSubmit={handleSubmit} disabled={!ref.current?.value}>
        送信
      </button>
    </form>
  );
};
