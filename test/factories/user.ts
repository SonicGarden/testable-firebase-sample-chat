import { Factory } from 'fishery';
import { Timestamp } from 'firebase/firestore';
import { UserWithId } from '@/types/user';

export const userFactory = Factory.define<UserWithId>(({ sequence }) => ({
  id: sequence.toString(),
  createdAt: Timestamp.fromDate(new Date()),
  name: `テストユーザー${sequence}`,
  photoUrl: '',
}));
