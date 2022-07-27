import { useState, useEffect } from 'react';
import { useBlob } from '@/hooks/useBlob';

export const useBlobUrl = (url: string | null) => {
  const blob = useBlob(url);
  const [blobUrl, setBlobUrl] = useState<string>();

  useEffect(() => {
    blob && setBlobUrl(URL.createObjectURL(blob));
  }, [blob]);

  return blobUrl;
};
