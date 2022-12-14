// assets
import { IconBrandChrome, IconHelp, IconLayoutList, IconHistoryToggle, IconDevicesPc } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconLayoutList, IconHistoryToggle, IconDevicesPc };

// ==============================|| ASSET MENU ITEMS ||============================== //

const device = {
    id: 'asset',
    title: 'Asset',
    type: 'group',
    children: [
        {
            id: 'request-asset',
            title: 'Request',
            type: 'item',
            url: '/asset/request',
            icon: icons.IconDevicesPc,
            breadcrumbs: false
        },
        {
            id: 'history-asset',
            title: 'History',
            type: 'item',
            url: '/asset/history',
            icon: icons.IconHistoryToggle,
            breadcrumbs: false,
            target: false
        }
    ]
};

export default device;
