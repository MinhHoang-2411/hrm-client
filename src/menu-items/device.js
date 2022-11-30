// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const device = {
    id: 'device',
    title: 'Device',
    type: 'group',
    children: [
        {
            id: 'list-device',
            title: 'List Device',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'history-device',
            title: 'History',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconHelp,
            breadcrumbs: false,
            target: false
        }
    ]
};

export default device;
