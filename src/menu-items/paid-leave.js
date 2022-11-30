// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const paid_leave = {
    id: 'paid-leave',
    title: 'Paid Leave',
    type: 'group',
    children: [
        {
            id: 'create-paid-leave',
            title: 'Create Paid Leave',
            type: 'item',
            url: '/utils/util-typography',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'paid-leave-history',
            title: 'History',
            type: 'item',
            url: '/utils/util-color',
            icon: icons.IconPalette,
            breadcrumbs: false,
            target: false
        }
    ]
};

export default paid_leave;
