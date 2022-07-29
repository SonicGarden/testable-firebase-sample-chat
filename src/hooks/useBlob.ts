import { useState, useEffect } from 'react';
import { ref, getStorage, getBlob } from 'firebase/storage';

export const useBlob = (path: string | null) => {
  const [blob, setBlob] = useState<Blob>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    path &&
      getBlob(ref(getStorage(), path)).then((res) => {
        setBlob(res);
        setUrl(URL.createObjectURL(res));
      });
  }, [path]);

  return { blob, url };
};
