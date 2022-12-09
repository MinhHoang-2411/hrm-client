// assets
import { IconBrandChrome, IconHelp, IconHistoryToggle, IconMenu2 } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconHistoryToggle, IconMenu2 };

// ==============================|| BAR MENU ITEMS ||============================== //

const bar = {
    id: 'bar',
    title: 'Chainhaus Bar',
    type: 'group',
    children: [
        {
            id: 'menu',
            title: 'Menu',
            type: 'item',
            url: '/bar/menu',
            icon: icons.IconMenu2,
            breadcrumbs: false
        },
        {
            id: 'order-history',
            title: 'Order History',
            type: 'item',
            url: '/bar/order-history',
            icon: icons.IconHistoryToggle,
            target: false,
            breadcrumbs: false
        }
    ]
};

export default bar;
