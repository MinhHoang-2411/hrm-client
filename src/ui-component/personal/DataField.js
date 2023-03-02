import React from 'react';
import { Typography, Divider, Stack } from '@mui/material';

const DataField = ({ Icon, label, data, variant = 'body1', divider }) => {
    return (
        <>
            <Stack sx={{ p: 2 }} direction="row" spacing={1} alignItems="center">
                {Icon ? <Icon sx={{ mr: '4px' }} /> : ''}
                <Stack spacing={1}>
                    <Typography variant={variant}>{label}</Typography>
                    <Typography variant={variant}>
                        <b>{data}</b>
                    </Typography>
                </Stack>
            </Stack>
            {divider ? <Divider /> : null}
        </>
    );
};

export default DataField;
