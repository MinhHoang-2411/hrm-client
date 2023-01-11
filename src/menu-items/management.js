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
            id: 'leave',
            title: 'Leave',
            type: 'collapse',
            icon: icons.IconCalendar,
            breadcrumbs: false,
            permissions: 'MANAGER',
            children: [
                {
                    id: 'assignment',
                    title: 'Assignment',
                    type: 'item',
                    url: '/management/leave/assignment',
                    breadcrumbs: false,
                    chip: {
                        data: 'leave',
                        size: 'small'
                    }
                },
                {
                    id: 'submit',
                    title: 'Submit for employee',
                    type: 'item',
                    url: '/management/leave/submit',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default management;
