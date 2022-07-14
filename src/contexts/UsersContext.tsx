import { ReactNode, createContext, useContext, useMemo } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { UserWithId, User } from '@/types/user';
import { useCollectionData } from '@/hooks/useCollectionData';
import { keyBy } from 'lodash-es';

type UsersContextValue = {
  users: UserWithId[] | null;
  usersById: { [id: string]: UserWithId };
};

export const UsersContext = createContext<UsersContextValue>({ users: null, usersById: {} });

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, loading] = useCollectionData<User>('users');
  if (loading || !users) return <LoadingScreen />;
  const usersById = useMemo(() => keyBy(users, 'id'), [users]);

  return <UsersContext.Provider value={{ users, usersById }}>{children}</UsersContext.Provider>;
};

export const useUsers = () => {
  const { users, usersById } = useContext(UsersContext);
  return { users, usersById };
};
