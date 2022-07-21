import { useCollectionData } from '@/hooks/useCollectionData';
import { messagesRef } from '@/lib/message';
import { Message as MessageType } from '@/types/message';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Message } from '@/components/Message';

export const Messages = () => {
  const [messages, loading] = useCollectionData<MessageType>(messagesRef);

  if (loading) return <LoadingScreen />;

  return (
    <div>
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
