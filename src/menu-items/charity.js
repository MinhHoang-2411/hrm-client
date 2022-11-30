// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const charity = {
    id: 'charity',
    title: 'Charity',
    type: 'group',
    children: [
        {
            id: 'donate',
            title: 'Donate',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'donate-hitory',
            title: 'History',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconHelp,
            target: false
        }
    ]
};

export default charity;
