import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router-dom';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// leave routing
const SubmitForm = Loadable(lazy(() => import('views/leave/SubmitForm')));
const LeaveHistory = Loadable(lazy(() => import('views/leave/History')));

// asset routing
const AssetList = Loadable(lazy(() => import('views/asset/AssetList')));
const AssetHistory = Loadable(lazy(() => import('views/asset/History')));

// project routing
const ProjectDashboard = Loadable(lazy(() => import('views/project/Dashboard')));
const LogWork = Loadable(lazy(() => import('views/project/LogWork')));
const TaskList = Loadable(lazy(() => import('views/project/TaskList')));

// bar routing
const BarMenu = Loadable(lazy(() => import('views/bar/Menu')));
const OrderHistory = Loadable(lazy(() => import('views/bar/OrderHistory')));

// charity routing
const Donation = Loadable(lazy(() => import('views/charity/Donation')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'login',
            element: <Navigate to="/" />
        },
        {
            path: '*',
            element: <Navigate to="/" />
        },
        {
            path: '/',
            element: <DashboardDefault />
        },

        {
            path: 'dashboard',
            children: [
                {
                    path: '',
                    element: <DashboardDefault />
                }
            ]
        },

        {
            path: 'leave',
            children: [
                {
                    path: 'submit',
                    element: <SubmitForm />
                },
                {
                    path: 'history',
                    element: <LeaveHistory />
                }
            ]
        },

        {
            path: 'asset',
            children: [
                {
                    path: '',
                    element: <AssetList />
                },
                {
                    path: 'history',
                    element: <AssetHistory />
                }
            ]
        },
        {
            path: 'project',
            children: [
                {
                    path: 'dashboard',
                    element: <ProjectDashboard />
                },
                {
                    path: 'task-list',
                    element: <TaskList />
                },
                {
                    path: 'log-work',
                    element: <LogWork />
                }
            ]
        },
        {
            path: 'bar',
            children: [
                {
                    path: 'menu',
                    element: <BarMenu />
                },
                {
                    path: 'order-history',
                    element: <OrderHistory />
                }
            ]
        },
        {
            path: 'charity',
            children: [
                {
                    path: 'donation',
                    element: <Donation />
                }
            ]
        }
    ]
};

export default MainRoutes;
