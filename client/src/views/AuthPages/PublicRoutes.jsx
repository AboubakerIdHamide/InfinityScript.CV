import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    const { auth } = useSelector(state => state);

    return (auth.token ? <Navigate to="/dashboard/new" /> : <Outlet />);
}

export default PublicRoutes