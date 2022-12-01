import { IconBrandChrome, IconHelp, IconChecklist, IconLayoutList, IconSubtask } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconChecklist, IconLayoutList, IconSubtask };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const project = {
    id: 'project',
    title: 'Project',
    type: 'group',
    children: [
        {
            id: 'list-project',
            title: 'Dashboard',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconLayoutList,
            breadcrumbs: false,
            target: false
        },
        {
            id: 'list-task',
            title: 'Task List',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconChecklist,
            target: false
        },
        {
            id: 'log-work',
            title: 'Log Work',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconSubtask,
            target: false
        }
    ]
};

export default project;
