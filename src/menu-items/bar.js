// assets
import { IconBrandChrome, IconHelp, IconHistoryToggle, IconMenu2 } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconHistoryToggle, IconMenu2 };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const bar = {
    id: 'bar',
    title: 'Chainhaus Bar',
    type: 'group',
    children: [
        {
            id: 'menu',
            title: 'Menu',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconMenu2,
            breadcrumbs: false
        },
        {
            id: 'order-history',
            title: 'Order History',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconHistoryToggle,
            target: false
        }
    ]
};

export default bar;
