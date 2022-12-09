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
// ==============================|| LEAVE MENU ITEMS ||============================== //

const paid_leave = {
    id: 'leave',
    title: 'Leave',
    type: 'group',
    children: [
        {
            id: 'leave-submit',
            title: 'Submit',
            type: 'item',
            url: '/leave/submit',
            icon: icons.IconMail,
            breadcrumbs: false
        },
        {
            id: 'leave-history',
            title: 'History',
            type: 'item',
            url: '/leave/history',
            icon: icons.IconHistoryToggle,
            breadcrumbs: false,
            target: false
        }
    ]
};

export default paid_leave;
