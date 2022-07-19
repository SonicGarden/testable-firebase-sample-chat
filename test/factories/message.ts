import { Factory } from 'fishery';
import { Timestamp } from 'firebase/firestore';
import { Message } from '@/types/message';

export const messageFactory = Factory.define<Message>(({ sequence }) => ({
  id: sequence.toString(),
  createdAt: Timestamp.fromDate(new Date()),
  content: '',
  senderId: '',
}));
