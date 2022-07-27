import { useState, useRef, ChangeEvent } from 'react';
import { serverTimestamp } from '@/lib/firebase';
import { newMessageRef, setMessage, uploadMessageImage } from '@/lib/message';
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

    const [image] = imageInput.current?.files || [];
    const messageRef = newMessageRef();
    const snapshot = image && (await uploadMessageImage(messageRef.id, currentUser.uid, image));
    const { ref: storageRef } = snapshot || {};
    await setMessage(messageRef, {
      content,
      imagePath: storageRef?.fullPath || null,
      senderId: currentUser.uid,
      createdAt: serverTimestamp(),
    });
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
