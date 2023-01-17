import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router-dom';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister />
        },
        {
            path: '/',
            element: <Navigate to="login" />
        }
    ]
};

export default AuthenticationRoutes;
