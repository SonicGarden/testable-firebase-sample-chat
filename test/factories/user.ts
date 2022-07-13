import { Factory } from 'fishery';
import { Timestamp } from '@/lib/firebase';
import { UserWithId } from '@/types/user';

export const userFactory = Factory.define<UserWithId>(({ sequence }) => ({
  id: sequence.toString(),
  createdAt: new Date() as unknown as Timestamp,
  name: `テストユーザー${sequence}`,
  photoUrl: '',
}));
