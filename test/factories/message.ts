import { Factory } from 'fishery';
import { Timestamp } from 'firebase/firestore';
import { Message } from '@/shared/types/message';

export const messageFactory = Factory.define<Message>(({ sequence }) => ({
  id: sequence.toString(),
  createdAt: Timestamp.fromDate(new Date()),
  content: '',
  imagePath: null,
  senderId: '',
}));
