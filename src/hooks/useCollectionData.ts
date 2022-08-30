import { useMemo } from 'react';
import { Query } from 'firebase/firestore';
import { useCollectionData as _useCollectionData } from 'react-firebase-hooks/firestore';

export const useCollectionData = <T>(_query: Query<T>, deps: any[] = []) => {
  const query = useMemo(() => _query, deps);
  return _useCollectionData(query, { snapshotOptions: { serverTimestamps: 'estimate' } });
};
