import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router-dom';
import { hasPermission } from 'utils/permission';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// leave routing
const SubmitForm = Loadable(lazy(() => import('views/leave/SubmitForm')));
const LeaveHistory = Loadable(lazy(() => import('views/leave/History')));

// asset routing
const RequestAsset = Loadable(lazy(() => import('views/asset/Request')));
const AssetHistory = Loadable(lazy(() => import('views/asset/History')));

// project routing
const ProjectDashboard = Loadable(lazy(() => import('views/project/Dashboard')));
const ProjectList = Loadable(lazy(() => import('views/project/ProjectList')));
const WorkList = Loadable(lazy(() => import('views/project/WorkList')));

// utilities routing
const Bar = Loadable(lazy(() => import('views/utilities/Bar')));
const Charity = Loadable(lazy(() => import('views/utilities/Charity')));

// others routing
const Policies = Loadable(lazy(() => import('views/others/Policies')));

// meeting routing
const Booking = Loadable(lazy(() => import('views/meeting/Booking')));

// personal
const Profile = Loadable(lazy(() => import('views/personal/Profile')));
const Setting = Loadable(lazy(() => import('views/personal/Setting')));

// management leave routing
const MonitorLeave = Loadable(lazy(() => import('views/management/leave/Monitor')));
const Submit = Loadable(lazy(() => import('views/management/leave/Submit')));

// under construction routing
const UnderConstruction = Loadable(lazy(() => import('views/under-construction/UnderConstruction')));

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
            path: '/',
            //element: <DashboardDefault />
            element: <UnderConstruction />
        },

        {
            path: 'dashboard',
            children: [
                {
                    path: '',
                    //element: <DashboardDefault />
                    element: <UnderConstruction />
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
                    path: 'history/*',
                    element: <LeaveHistory />
                }
            ]
        },

        {
            path: 'meeting',
            children: [
                {
                    path: 'booking',
                    //element: <Booking />
                    element: <UnderConstruction />
                }
            ]
        },

        {
            path: 'asset',
            children: [
                {
                    path: 'request',
                    //element: <RequestAsset />
                    element: <UnderConstruction />
                },
                {
                    path: 'history',
                    //element: <AssetHistory />
                    element: <UnderConstruction />
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
                    path: 'my-projects',
                    element: <ProjectList />
                },
                {
                    path: 'my-works',
                    element: <WorkList />
                }
            ]
        },
        {
            path: 'utilities',
            children: [
                {
                    path: 'bar',
                    //element: <Bar />
                    element: <UnderConstruction />
                },
                {
                    path: 'charity',
                    element: <Charity />
                }
            ]
        },
        {
            path: 'others',
            children: [
                {
                    path: 'policies',
                    element: <Policies />
                }
            ]
        },
        {
            path: 'user',
            children: [
                {
                    path: 'setting',
                    element: <Setting />
                },
                {
                    path: 'profile',
                    element: <Profile />
                }
            ]
        },
        {
            path: 'management',
            children: [
                {
                    path: 'leave',
                    children: [
                        {
                            path: 'monitor',
                            //element: hasPermission('MANAGER') ? <ManagementLeave /> : <Navigate to="/dashboard" />
                            element: <MonitorLeave />
                        },
                        {
                            path: 'submit',
                            //element: hasPermission('MANAGER') ? <Submit /> : <Navigate to="/dashboard" />
                            element: <Submit />
                        }
                    ]
                }
            ]
        }
    ]
};

export default MainRoutes;
