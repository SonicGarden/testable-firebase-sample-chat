import { MessageWithId } from '@/types/message';
import { UserWithId } from '@/types/user';
import { format } from 'date-fns';

type Props = {
  message: MessageWithId;
  sender: UserWithId;
};
export const Message = (props: Props) => {
  const { message, sender } = props;

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
