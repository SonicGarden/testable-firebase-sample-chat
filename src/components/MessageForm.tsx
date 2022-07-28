import { useState, useRef, ChangeEvent } from 'react';
import { addMessage } from '@/lib/message';
import { useAuth } from '@/contexts/AuthContext';

export const MessageForm = () => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState<string>('');
  const imageInput = useRef<HTMLInputElement>(null);

  const handleChangeConetnt = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleClick = async () => {
    if (!content || !currentUser) return;

    const [image = null] = imageInput.current?.files || [];
    await addMessage(content, image, currentUser.uid);
    setContent('');
    if (imageInput.current) imageInput.current.value = '';
  };

  return (
    <>
      <input aria-label='content-input' type='text' value={content} onChange={handleChangeConetnt} />
      <input aria-label='image-input' type='file' accept='image/*' ref={imageInput} />
      <button onClick={handleClick} disabled={!content}>
        送信
      </button>
    </>
  );
};
