import { getFirestore, collection, query, orderBy, DocumentReference, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getConverter, serverTimestamp } from '@/lib/firebase';
import type { MessageDocumentData } from '@/shared/types/message';

export const collectionName = 'messages';

export const messagesRef = collection(getFirestore(), collectionName).withConverter(
  getConverter<MessageDocumentData>()
);

export const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'));

export const setMessage = async (ref: DocumentReference, message: MessageDocumentData) => {
  return setDoc(ref, message, { merge: true });
};

export const uploadMessageImage = async (messageId: string, ownerId: string, file: File) => {
  const storageRef = ref(getStorage(), `${collectionName}/${messageId}/${file.name}`);
  const metadata = { customMetadata: { ownerId } };

  return uploadBytes(storageRef, file, metadata);
};

export const addMessage = async (content: string, image: File | null, uid: string) => {
  const messageRef = doc(messagesRef);
  const snapshot = image && (await uploadMessageImage(messageRef.id, uid, image));
  const { ref: storageRef } = snapshot || {};

  return setMessage(messageRef, {
    content,
    imagePath: storageRef?.fullPath || null,
    senderId: uid,
    createdAt: serverTimestamp(),
  });
};
