import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Stack } from '@mui/material';

const Empty = ({ title = null, height }) => {
    return (
        <Stack justifyContent="center" alignItems="center" sx={{ height: height || '500px', width: '100%' }}>
            <ErrorOutlineIcon
                sx={{
                    width: 100,
                    height: 100,
                    color: '#E0E0E0'
                }}
                fontSize="medium"
            />
            <h3 style={{ color: '#9E9E9E' }}> {title || 'There is currently no data available'}</h3>
        </Stack>
    );
};
export default Empty;
