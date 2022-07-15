import { getFirestore, collection } from 'firebase/firestore';
import { useCollectionData as _useCollectionData } from 'react-firebase-hooks/firestore';
import { getConverter } from '@/lib/firebase';

export const useCollectionData = <T>(collectionName: string) =>
  _useCollectionData(collection(getFirestore(), collectionName).withConverter(getConverter<T>()));
