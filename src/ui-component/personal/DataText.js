import React from 'react';
import { Typography } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';

const DataText = ({ Icon, label, data, variant = 'body1' }) => {
    const isMobile = useResponsive('mobile');
    return (
        <Typography variant={variant} sx={{ display: 'flex', alignItems: 'center', color: '#616161', mb: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', minWidth: isMobile ? '110px' : '130px', color: '#8d8d8d' }}>
                {Icon ? <Icon sx={{ mr: '4px' }} /> : ''}
                {label}
            </span>
            : {data}
        </Typography>
    );
};

export default DataText;
