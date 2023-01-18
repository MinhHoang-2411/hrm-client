import React from 'react';
import { Box, Skeleton } from '@mui/material';

const SkeletonLoading = ({ sx = {}, variant }) => {
    return (
        <Skeleton variant={variant || 'rectangular'} width={sx.width || '97%'} sx={{ borderRadius: '4px', ...sx }}>
            <Box sx={{ height: sx.height || '120px', ...sx }} />
        </Skeleton>
    );
};

export default SkeletonLoading;
