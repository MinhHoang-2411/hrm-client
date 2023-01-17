import { useRoutes } from 'react-router-dom';
import ErrorRoutes from './ErrorRoutes';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const isLoggedIn = Boolean(localStorage.getItem('employee'));
    const switchRoutes = isLoggedIn ? [MainRoutes] : [AuthenticationRoutes];
    return useRoutes([...switchRoutes, ErrorRoutes]);
}
