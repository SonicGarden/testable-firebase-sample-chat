import { ReactNode, createContext, useContext, useMemo } from 'react';
import { UserWithId, User } from '@/types/user';
import { useCollectionData } from '@/hooks/useCollectionData';
import { keyBy } from 'lodash-es';

type UsersContextValue = {
  users: UserWithId[];
  usersById: { [id: string]: UserWithId };
  loading: boolean;
};

export const UsersContext = createContext<UsersContextValue>({ users: [], usersById: {}, loading: true });

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, loading] = useCollectionData<User>('users');
  const usersById = useMemo(() => keyBy(users, 'id'), [users]);

  return <UsersContext.Provider value={{ users: users || [], usersById, loading }}>{children}</UsersContext.Provider>;
};

export const useUsers = () => {
  const { users, usersById, loading } = useContext(UsersContext);
  return { users, usersById, loading };
};
