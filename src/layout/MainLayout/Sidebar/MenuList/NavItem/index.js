import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { useAppDispatch, useAppSelector } from 'app/hooks';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { actionActions } from 'store/action/actionSlice';

// i18n
import { useTranslation } from 'react-i18next';
// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const customization = useAppSelector((state) => state.action);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const { pathname } = useLocation();
    const { countMenu } = customization;
    const { t, i18n } = useTranslation();

    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }
    const isSelected = item?.url == pathname;

    const itemHandler = (id) => {
        dispatch(
            actionActions.openMenu({
                id
            })
        );
        if (matchesSM) {
            dispatch(
                actionActions.setMenu({
                    opened: false
                })
            );
        }
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch(
                actionActions.openMenu({
                    id: item.id
                })
            );
        }
        // eslint-disable-next-line
    }, [pathname]);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                borderRadius: `${customization.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
            }}
            selected={isSelected}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant={isSelected ? 'h5' : 'body1'} color="inherit">
                        {t(item.title)}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label || countMenu[item?.chip?.data] || 0}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
