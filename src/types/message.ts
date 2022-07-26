import type { Timestamp, WithId } from '@/lib/firebase';

export type MessageDocumentData = {
  createdAt: Timestamp;
  content: string | null;
  imagePath: string | null;
  senderId: string;
};

export type Message = WithId<MessageDocumentData>;
