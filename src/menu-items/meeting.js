// assets
import { IconBrandBooking } from '@tabler/icons';

// constant
const icons = { IconBrandBooking };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const meeting = {
    id: 'meeting',
    title: 'Meeting',
    type: 'group',
    children: [
        {
            id: 'booking',
            title: 'Booking',
            type: 'item',
            url: '/meeting/book',
            icon: icons.IconBrandBooking,
            breadcrumbs: false
        }
    ]
};

export default meeting;
