import { Query } from 'firebase/firestore';
import { useCollectionData as _useCollectionData } from 'react-firebase-hooks/firestore';
import { WithId } from '@/lib/firebase';

export const useCollectionData = <T>(query: Query<WithId<T>>) => _useCollectionData(query);
