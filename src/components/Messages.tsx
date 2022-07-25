import { useCollectionData } from '@/hooks/useCollectionData';
import { messagesQuery } from '@/lib/message';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Message } from '@/components/Message';

export const Messages = () => {
  const [messages, loading] = useCollectionData(messagesQuery);

  if (loading) return <LoadingScreen />;

  return (
    <div>
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
