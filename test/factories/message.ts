import { Factory } from 'fishery';
import { Timestamp } from 'firebase/firestore';
import { MessageWithId } from '@/types/message';

export const messageFactory = Factory.define<MessageWithId>(({ sequence }) => ({
  id: sequence.toString(),
  createdAt: Timestamp.fromDate(new Date()),
  content: '',
  senderId: '',
}));
