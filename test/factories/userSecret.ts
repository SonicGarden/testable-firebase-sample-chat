import { Factory } from 'fishery';
import { Timestamp } from 'firebase/firestore';
import { UserSecret } from '@/shared/types/userSecret';

export const userSecretFactory = Factory.define<UserSecret>(({ sequence }) => ({
  id: sequence.toString(),
  createdAt: Timestamp.fromDate(new Date()),
  fcmToken: `token${sequence}`,
}));
