import { getFirestore, collection } from 'firebase/firestore';
import { getConverter } from '@/lib/firebase';
import type { User } from '@/types/user';

export const usersRef = collection(getFirestore(), 'users').withConverter(getConverter<User>());
