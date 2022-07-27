import { useState, useEffect } from 'react';
import { ref, getStorage, getBlob } from 'firebase/storage';

export const useBlob = (path: string | null) => {
  const [blob, setBlob] = useState<Blob>();

  useEffect(() => {
    path && getBlob(ref(getStorage(), path)).then(setBlob);
  }, [path]);

  return blob;
};
