import { ReactNode, createContext, useContext, useMemo } from 'react';
import { keyBy } from 'lodash-es';
import { User } from '@/shared/types/user';
import { useCollectionData } from '@/hooks/useCollectionData';
import { usersRef } from '@/lib/user';

type UsersContextValue = {
  users: User[];
  usersById: { [id: string]: User };
  loading: boolean;
};

export const UsersContext = createContext<UsersContextValue>({ users: [], usersById: {}, loading: true });

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, loading] = useCollectionData(usersRef);
  const usersById = useMemo(() => keyBy(users, 'id'), [users]);

  return <UsersContext.Provider value={{ users: users || [], usersById, loading }}>{children}</UsersContext.Provider>;
};

export const useUsers = () => {
  const { users, usersById, loading } = useContext(UsersContext);
  return { users, usersById, loading };
};
