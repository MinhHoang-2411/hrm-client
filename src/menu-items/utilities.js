// assets
import { IconCurrencyDollar, IconBottle } from '@tabler/icons';

// constant
const icons = { IconCurrencyDollar, IconBottle };

// ==============================|| BAR MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'bar',
            title: 'Chainhaus Bar',
            type: 'item',
            url: '/utilities/bar',
            icon: icons.IconBottle,
            breadcrumbs: false
        },
        {
            id: 'charity',
            title: 'Charity',
            type: 'item',
            url: '/utilities/charity',
            icon: icons.IconCurrencyDollar,
            target: false,
            breadcrumbs: false
        }
    ]
};

export default utilities;
