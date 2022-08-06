import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getConverter, serverTimestamp } from '@/lib/firebase';
import type { UserSecretDocumentData } from '@/shared/types/userSecret';

export const userSecretsRef = collection(getFirestore(), 'userSecrets').withConverter(
  getConverter<UserSecretDocumentData>()
);

export const getUserSecret = async (uid: string) => {
  const snapshot = await getDoc(doc(userSecretsRef, uid));
  const isExist = snapshot.exists();
  const userSecret = snapshot.data();

  return { isExist, userSecret };
};

export const setUserSecret = async (uid: string, { fcmToken }: { fcmToken: string }) => {
  const userSecret = { fcmToken, createdAt: serverTimestamp() };
  await setDoc(doc(userSecretsRef, uid), userSecret, { merge: true });
};
