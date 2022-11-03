import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '../utils/token';

export const PrivateRoutes = () => {
    const TOKEN = getToken();
    return TOKEN ? <Outlet/> : <Navigate to="/login" replace />;
}