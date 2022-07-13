import type { Timestamp, WithId } from '@/lib/firebase';

export type Message = {
  createdAt: Timestamp;
  content: string;
  senderId: string;
};

export type MessageWithId = WithId<Message>;
