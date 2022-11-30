// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const bar = {
    id: 'bar',
    title: 'Bar',
    type: 'group',
    children: [
        {
            id: 'list-product',
            title: 'List Product',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'order-history',
            title: 'Order History',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconHelp,
            target: false
        }
    ]
};

export default bar;
