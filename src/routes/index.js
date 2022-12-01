import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    const switchRoutes = isLoggedIn ? [MainRoutes] : [AuthenticationRoutes];
    return useRoutes(switchRoutes);
    //return useRoutes([MainRoutes, AuthenticationRoutes]);
}
