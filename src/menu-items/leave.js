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
            url: '/leave/hisory',
            icon: icons.IconHistoryToggle,
            breadcrumbs: false,
            target: false
        }
    ]
};

export default paid_leave;
