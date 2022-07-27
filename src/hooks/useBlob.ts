import { useState, useEffect } from 'react';
import { ref, getStorage, getBlob } from 'firebase/storage';

export const useBlob = (url: string | null) => {
  const [blob, setBlob] = useState<Blob>();

  useEffect(() => {
    url && getBlob(ref(getStorage(), url)).then(setBlob);
  }, [url]);

  return blob;
};
