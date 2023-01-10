// assets
import { IconCalendar } from '@tabler/icons';

// constant
const icons = {
    IconCalendar
};
// ==============================|| LEAVE MENU ITEMS ||============================== //
const management = {
    id: 'management',
    title: 'Management',
    type: 'group',
    permissions: 'MANAGER',
    children: [
        {
            id: 'management-leave',
            title: 'Leave',
            type: 'item',
            url: '/management/leave',
            icon: icons.IconCalendar,
            breadcrumbs: false,
            permissions: 'MANAGER',
            chip: {
                data: 'leave',
                size: 'small'
            }
        }
    ]
};

export default management;
