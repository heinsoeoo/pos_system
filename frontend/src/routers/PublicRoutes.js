import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '../utils/token';

export const PublicRoutes = () => {
    const TOKEN = getToken();
    return TOKEN ? <Navigate to="/app" replace/> : <Outlet />;
}