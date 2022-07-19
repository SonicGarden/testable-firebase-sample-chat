import { getFirestore, collection } from 'firebase/firestore';
import { getConverter } from '@/lib/firebase';
import type { Message } from '@/types/message';

export const messagesRef = collection(getFirestore(), 'messages').withConverter(getConverter<Message>());
