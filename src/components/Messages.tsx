import { useCollectionData } from '@/hooks/useCollectionData';
import { messagesRef } from '@/lib/message';
import { Message } from '@/types/message';
import { LoadingScreen } from '@/components/LoadingScreen';

export const Messages = () => {
  const [messages, loading] = useCollectionData<Message>(messagesRef);

  if (loading) return <LoadingScreen />;

  return <div>Messages</div>;
};
