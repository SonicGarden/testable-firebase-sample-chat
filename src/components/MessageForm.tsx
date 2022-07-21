import { useRef } from 'react';
import { serverTimestamp } from '@/lib/firebase';
import { addMessage } from '@/lib/message';
import { useAuth } from '@/contexts/AuthContext';

export const MessageForm = () => {
  const { currentUser } = useAuth();
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    if (!ref.current?.value || !currentUser) return;

    await addMessage({
      content: ref.current.value,
      senderId: currentUser.uid,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <>
      <input type="text" ref={ref} />
      <button onClick={handleClick}>
        送信
      </button>
    </>
  );
};
