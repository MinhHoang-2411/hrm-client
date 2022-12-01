// assets
import { IconBrandChrome, IconHelp, IconHistoryToggle, IconChartDonut2 } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconHistoryToggle, IconChartDonut2 };

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
            icon: icons.IconChartDonut2,
            breadcrumbs: false
        },
        {
            id: 'donate-hitory',
            title: 'History',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconHistoryToggle,
            target: false
        }
    ]
};

export default charity;
