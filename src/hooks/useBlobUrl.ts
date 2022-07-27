import { useState, useEffect } from 'react';
import { useBlob } from '@/hooks/useBlob';

export const useBlobUrl = (path: string | null) => {
  const blob = useBlob(path);
  const [blobUrl, setBlobUrl] = useState<string>();

  useEffect(() => {
    blob && setBlobUrl(URL.createObjectURL(blob));
  }, [blob]);

  return blobUrl;
};
