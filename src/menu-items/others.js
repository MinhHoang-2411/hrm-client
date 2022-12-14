// assets
import { IconHelp } from '@tabler/icons';

// constant
const icons = { IconHelp };

// ==============================|| BAR MENU ITEMS ||============================== //

const others = {
    id: 'others',
    title: 'Others',
    type: 'group',
    children: [
        {
            id: 'policies',
            title: 'Policies',
            type: 'item',
            url: '/others/policies',
            icon: icons.IconHelp,
            breadcrumbs: false
        }
    ]
};

export default others;
