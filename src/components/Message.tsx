import { useUsers } from '@/contexts/UsersContext';
import { MessageWithId } from '@/types/message';
import { format } from 'date-fns';

export const Message = ({ message }: { message: MessageWithId }) => {
  const { usersById, loading } = useUsers();
  const sender = usersById[message.senderId];
  if (loading) return <div>loading...</div>;
  return (
    <div>
      <div>
        <img src={sender?.photoUrl} />
        <span>{sender?.name || '名無しさん'}</span>
        <span>{format(message.createdAt.toDate(), 'yyyy-MM-dd HH:mm')}</span>
      </div>
      <p>{message.content}</p>
    </div>
  );
};
