import { useAuthState as _useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

export const useAuthState = () => _useAuthState(getAuth());
