import { useState, ChangeEvent } from 'react';
import { serverTimestamp } from '@/lib/firebase';
import { addMessage } from '@/lib/message';
import { useAuth } from '@/contexts/AuthContext';

export const MessageForm = () => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState<string>('');

  const handleChangeConetnt = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
  };

  const handleClick = async () => {
    if (!content || !currentUser) return;

    await addMessage({
      content,
      senderId: currentUser.uid,
      createdAt: serverTimestamp(),
    });
    setContent('');
  };

  return (
    <>
      <input aria-label='content-input' type='text' value={content} onChange={handleChangeConetnt} />
      <input aria-label='image-input' type='file' accept='image/*' onChange={handleChangeImage} />
      <button onClick={handleClick} disabled={!content}>
        送信
      </button>
    </>
  );
};
