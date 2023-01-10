import { IconBrandChrome, IconHelp, IconChecklist, IconLayoutList, IconSubtask } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconChecklist, IconLayoutList, IconSubtask };

// ==============================|| PROJECT MENU ITEMS ||============================== //

const project = {
    id: 'project',
    title: 'Project',
    type: 'group',
    children: [
        {
            id: 'list-project',
            title: 'Dashboard',
            type: 'item',
            url: '/project/dashboard',
            icon: icons.IconLayoutList,
            breadcrumbs: false,
            target: false
        },
        {
            id: 'project-list',
            title: 'My Projects',
            type: 'item',
            url: '/project/my-projects',
            icon: icons.IconChecklist,
            breadcrumbs: false,
            target: false
        },
        {
            id: 'work-list',
            title: 'My Works',
            type: 'item',
            url: '/project/my-works',
            icon: icons.IconSubtask,
            breadcrumbs: false,
            target: false
        }
    ]
};

export default project;
