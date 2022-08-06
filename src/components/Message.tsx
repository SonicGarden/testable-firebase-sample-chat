import { format } from 'date-fns';
import { useUsers } from '@/contexts/UsersContext';
import { LoadingScreen } from './LoadingScreen';
import { Message as MessageType } from '@/shared/types/message';
import { useBlob } from '@/hooks/useBlob';

export const Message = ({ message }: { message: MessageType }) => {
  const { usersById, loading } = useUsers();
  const sender = usersById[message.senderId];
  const { url } = useBlob(message.imagePath);

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <div>
        <img src={sender?.photoUrl || '/noname.png'} />
        <span>{sender?.name || '名無しさん'}</span>
        <span>{format(message.createdAt.toDate(), 'yyyy-MM-dd HH:mm')}</span>
      </div>
      <p>{message.content}</p>
      {url && <img alt='message-image' src={url} />}
    </div>
  );
};
