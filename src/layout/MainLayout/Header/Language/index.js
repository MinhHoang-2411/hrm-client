import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
// i18n
import { useTranslation } from 'react-i18next';

// material-ui
import { Avatar, Box, ButtonBase, ClickAwayListener, Divider, Grid, Paper, Popper, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconLanguage } from '@tabler/icons';

// list
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

// svg-icon
import VietNamFlagIcon from 'assets/images/vietnam-flag-icon.svg';
import UKFlagIcon from 'assets/images/united-kingdom-flag-icon.svg';
// ==============================|| LANGUAGE ||============================== //

const Language = () => {
    //get from localStorage
    const language = JSON.parse(localStorage.getItem('lang')) || 'en';

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const { t, i18n } = useTranslation();

    const handleListItemClick = (event, index, lng) => {
        setSelectedIndex(index);
        i18n.changeLanguage(lng);
        localStorage.setItem('lang', JSON.stringify(lng));
    };
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Box
                sx={{
                    ml: 1,
                    mr: 1,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    },
                    margin: '5 0 5 0'
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.primary.light,
                            color: theme.palette.primary.dark,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.primary.dark,
                                color: theme.palette.primary.light
                            }
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        <IconLanguage stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2} sx={{ width: '200px' }}>
                                        <Grid item xs={12}>
                                            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                <List component="nav" aria-label="secondary mailbox folder">
                                                    <ListItemButton
                                                        selected={language == 'en' || selectedIndex === 1}
                                                        onClick={(event) => handleListItemClick(event, 1, 'en')}
                                                    >
                                                        <ListItemIcon style={{ marginRight: '10px' }}>
                                                            <img src={UKFlagIcon} alt="UKFlagIcon" width="30" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={t('English')} />
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        selected={language == 'vi' || selectedIndex === 2}
                                                        onClick={(event) => handleListItemClick(event, 2, 'vi')}
                                                    >
                                                        <ListItemIcon style={{ marginRight: '10px' }}>
                                                            <img src={VietNamFlagIcon} alt="VietNamFlagIcon" width="30" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={t('Vietnamese')} />
                                                    </ListItemButton>
                                                </List>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default Language;
