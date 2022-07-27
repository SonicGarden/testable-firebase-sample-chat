import { getFirestore, collection, query, orderBy, addDoc, DocumentReference, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getConverter } from '@/lib/firebase';
import type { MessageDocumentData } from '@/types/message';

export const collectionName = 'messages';

export const messagesRef = collection(getFirestore(), collectionName).withConverter(
  getConverter<MessageDocumentData>()
);

export const messagesQuery = query(messagesRef, orderBy('createdAt', 'asc'));

export const addMessage = async (message: MessageDocumentData): Promise<DocumentReference<MessageDocumentData>> => {
  return addDoc(messagesRef, message);
};

export const newMessageRef = () => {
  return doc(messagesRef);
};

export const setMessage = async (ref: DocumentReference, message: MessageDocumentData) => {
  return setDoc(ref, message, { merge: true });
};

export const uploadMessageImage = async (messageId: string, ownerId: string, file: File) => {
  const storageRef = ref(getStorage(), `${collectionName}/${messageId}/${file.name}`);
  const metadata = { customMetadata: { ownerId } };

  return uploadBytes(storageRef, file, metadata);
};
