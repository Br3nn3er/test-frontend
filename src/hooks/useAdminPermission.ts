import { useAuthInfo } from '@contexts/AuthContext';

type isAdminParam = {
  isAdmin?: boolean;
};

export function useAdminPermission({ isAdmin }: isAdminParam) {
  const { isAuthenticated, user } = useAuthInfo();

  return isAuthenticated ? isAdmin && user.isAdmin : false;
}
