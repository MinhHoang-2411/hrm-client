// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconMail, IconHistory, IconHistoryToggle } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconMail,
    IconHistory,
    IconHistoryToggle
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const paid_leave = {
    id: 'leave',
    title: 'Leave',
    type: 'group',
    children: [
        {
            id: 'leave-submit',
            title: 'Submit',
            type: 'item',
            url: '/submit-leave',
            icon: icons.IconMail,
            breadcrumbs: false
        },
        {
            id: 'leave-history',
            title: 'History',
            type: 'item',
            url: '/utils/util-color',
            icon: icons.IconHistoryToggle,
            breadcrumbs: false,
            target: false
        }
    ]
};

export default paid_leave;
