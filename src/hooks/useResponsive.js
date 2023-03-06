import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

const useResponsive = (type) => {
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMobileAndTablet = useMediaQuery(theme.breakpoints.down('md'));

    switch (type) {
        case 'mobile':
            return isMobile;
        case 'mobileAndTablet':
            return isMobileAndTablet;
        default:
            return false;
    }
};

export default useResponsive;
