import { MessageWithId } from '@/types/message';
import { UserWithId } from '@/types/user';
import { format } from 'date-fns';

export const Message = ({ message, sender }: { message: MessageWithId; sender: UserWithId }) => {
  return (
    <div>
      <div>
        <img src={sender.photoUrl} />
        <span>{sender.name}</span>
        <span>{format(message.createdAt.toDate(), 'yyyy-MM-dd HH:mm')}</span>
      </div>
      <p>{message.content}</p>
    </div>
  );
};
