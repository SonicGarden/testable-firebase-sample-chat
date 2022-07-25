import { getFirestore, collection, addDoc, DocumentReference } from 'firebase/firestore';
import { getConverter } from '@/lib/firebase';
import type { MessageDocumentData } from '@/types/message';

export const messagesRef = collection(getFirestore(), 'messages').withConverter(getConverter<MessageDocumentData>());

export const addMessage = async (message: MessageDocumentData): Promise<DocumentReference<MessageDocumentData>> => {
  return addDoc(messagesRef, message);
}
