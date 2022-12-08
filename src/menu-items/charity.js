// assets
import { IconBrandChrome, IconHelp, IconHistoryToggle, IconChartDonut2 } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconHistoryToggle, IconChartDonut2 };

// ==============================|| CHARITY MENU ITEMS ||============================== //

const charity = {
    id: 'charity',
    title: 'Charity',
    type: 'group',
    children: [
        {
            id: 'donate',
            title: 'Donation',
            type: 'item',
            url: '/charity/donation',
            icon: icons.IconChartDonut2,
            breadcrumbs: false
        }
    ]
};

export default charity;
