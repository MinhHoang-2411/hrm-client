import React from 'react';
import { Typography } from '@mui/material';

const DataText = ({ Icon, label, data, variant = 'body1' }) => {
    return (
        <Typography variant={variant} sx={{ display: 'flex', alignItems: 'center', color: '#616161', mb: '4px' }}>
            <span style={{ display: 'flex', minWidth: '130px', alignItems: 'center', color: '#8d8d8d' }}>
                {Icon ? <Icon sx={{ mr: '4px' }} /> : ''}
                {label} :
            </span>{' '}
            {data}
        </Typography>
    );
};

export default DataText;
