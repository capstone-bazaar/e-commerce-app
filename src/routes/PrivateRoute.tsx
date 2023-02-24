import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function PrivateRoute() {
  const auth = useAuth();

  return auth?.isAuth ? <Outlet /> : <Navigate to={'/'} />;
}
