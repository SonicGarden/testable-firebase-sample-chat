import { Query } from 'firebase/firestore';
import { useCollectionData as _useCollectionData } from 'react-firebase-hooks/firestore';

export const useCollectionData = <T>(query: Query<T>) =>
  _useCollectionData(query, { snapshotOptions: { serverTimestamps: 'estimate' } });
