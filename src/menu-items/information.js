// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'my-information',
    title: 'My Information',
    type: 'group',
    children: [
        {
            id: 'resume',
            title: 'Resume',
            type: 'item',
            url: '/login',
            target: false,
            icon: icons.IconTypography
        },
        {
            id: 'other',
            title: 'Other',
            type: 'item',
            url: '/pages/register/register3',
            target: false,
            icon: icons.IconTypography
        }
    ]
};

export default pages;
