// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { hasPermission } from 'utils/permission';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actionActions } from 'store/action/actionSlice';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const dispatch = useAppDispatch();
    const reloadListWaiting = useAppSelector((state) => state.leave.reloadListWaiting);
    const basicInfo = JSON.parse(localStorage.getItem('employee'));

    useEffect(() => {
        const role = basicInfo?.position;
        if (role === 'MANAGER') dispatch(actionActions.getCountMenu());
    }, [reloadListWaiting]);
    const navItems = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return hasPermission(item?.permissions) ? <NavGroup key={item.id} item={item} /> : null;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
