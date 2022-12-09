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
            id: 'list-task',
            title: 'Task List',
            type: 'item',
            url: '/project/task-list',
            icon: icons.IconChecklist,
            breadcrumbs: false,
            target: false
        },
        {
            id: 'log-work',
            title: 'Log Work',
            type: 'item',
            url: '/project/log-work',
            icon: icons.IconSubtask,
            breadcrumbs: false,
            target: false
        }
    ]
};

export default project;
