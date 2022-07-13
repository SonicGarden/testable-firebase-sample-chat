import type { Timestamp } from '@/lib/firebase';

export type Message = {
  createdAt: Timestamp;
  content: string;
  senderId: string;
};

export type MessageWithId = Message & {
  id: string;
};
