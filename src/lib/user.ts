import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getConverter, serverTimestamp } from '@/lib/firebase';
import type { UserDocumentData } from '@/types/user';

export const usersRef = () => collection(getFirestore(), 'users').withConverter(getConverter<UserDocumentData>());

export const getUser = async (uid: string) => {
  const snapshot = await getDoc(doc(usersRef(), uid));
  const isExist = snapshot.exists();
  const user = snapshot.data();

  return { isExist, user };
};

export const addUser = async ({
  uid,
  displayName,
  photoURL,
}: {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
}) => {
  const user = { name: displayName, photoUrl: photoURL, createdAt: serverTimestamp() };
  await setDoc(doc(usersRef(), uid), user);
};
