import { format } from 'date-fns';
import { useUsers } from '@/contexts/UsersContext';
import { LoadingScreen } from './LoadingScreen';
import { Message as MessageType } from '@/types/message';
import { useBlobUrl } from '@/hooks/useBlobUrl';

export const Message = ({ message }: { message: MessageType }) => {
  const { usersById, loading } = useUsers();
  const sender = usersById[message.senderId];
  const blobUrl = useBlobUrl(message.imagePath);

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <div>
        <img src={sender?.photoUrl || '/noname.png'} />
        <span>{sender?.name || '名無しさん'}</span>
        <span>{format(message.createdAt.toDate(), 'yyyy-MM-dd HH:mm')}</span>
      </div>
      <p>{message.content}</p>
      {blobUrl && <img alt='message-image' src={blobUrl} />}
    </div>
  );
};
