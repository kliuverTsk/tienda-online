import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <h1>Cargando...</h1>;

    if (!user) return <Navigate to="/admin/login" />;

    return children;
}