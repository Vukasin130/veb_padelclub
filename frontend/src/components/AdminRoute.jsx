import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to='/login?redirect=/admin/reservationlist' replace />;
  }

  return userInfo.isAdmin ? <Outlet /> : <Navigate to='/' replace />;
};

export default AdminRoute;
