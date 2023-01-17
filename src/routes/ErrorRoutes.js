import { lazy } from 'react';

// project import
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout/index';
import { Navigate } from 'react-router-dom';

// render - dashboard
const ErrorPage404 = Loadable(lazy(() => import('views/errors/ErrorPage404')));
const ErrorPage500 = Loadable(lazy(() => import('views/errors/ErrorPage500')));

// ==============================|| MAIN ROUTING ||============================== //

const ErrorRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <Navigate to="/" />
        },
        {
            path: '*',
            element: <ErrorPage404 />
        },
        {
            path: '/500',
            element: <ErrorPage500 />
        }
    ]
};

export default ErrorRoutes;
