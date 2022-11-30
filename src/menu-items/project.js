import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const project = {
    id: 'project',
    title: 'Project',
    type: 'group',
    children: [
        {
            id: 'list-project',
            title: 'List Project',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false,
            target: false
        },
        {
            id: 'list-task',
            title: 'List Task',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconHelp,
            target: false
        },
        {
            id: 'log-work',
            title: 'Log-work',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconHelp,
            target: false
        }
    ]
};

export default project;
