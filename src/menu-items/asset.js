// assets
import { IconBrandChrome, IconHelp, IconLayoutList, IconHistoryToggle } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconLayoutList, IconHistoryToggle };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const device = {
    id: 'asset',
    title: 'Asset',
    type: 'group',
    children: [
        {
            id: 'list-asset',
            title: 'Asset List',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconLayoutList,
            breadcrumbs: false
        },
        {
            id: 'history-assset',
            title: 'History',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconHistoryToggle,
            breadcrumbs: false,
            target: false
        }
    ]
};

export default device;
