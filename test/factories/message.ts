import { Factory } from 'fishery';
import { Timestamp } from '@/lib/firebase';
import { MessageWithId } from '@/types/message';

export const messageFactory = Factory.define<MessageWithId>(({ sequence }) => ({
  id: sequence.toString(),
  createdAt: new Date() as unknown as Timestamp,
  content: '',
  senderId: '',
}));
