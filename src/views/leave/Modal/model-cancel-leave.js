import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button } from '@mui/material';

// redux
import { useAppDispatch } from 'app/hooks';
import { leaveActions } from 'store/leave/leaveSlice';

export default function ModelCancelLeave({ leaveCancel, handleClose }) {
    const dispatch = useAppDispatch();

    const handleUpdate = () => {
        const tmpData = { ...leaveCancel };
        tmpData['status'] = 'CANCELED';
        dispatch(leaveActions.editLeave({ ...tmpData }));
    };

    return (
        <>
            <Box
                sx={{
                    padding: '5px 20px 20px 20px',
                    display: 'flex-column'
                }}
            >
                <h2>Cancel Leave</h2>
                <Box style={{ fontSize: '15px' }}>Would you like to cancel your leave?</Box>
                <Box>
                    <Button
                        disableElevation
                        style={{ width: '15%', float: 'right', margin: '10px 0 10px 0' }}
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                        startIcon={<CheckCircleOutlineIcon />}
                        onClick={(e) => {
                            handleClose();
                            handleUpdate();
                        }}
                    >
                        Agree
                    </Button>
                    <Button
                        disableElevation
                        style={{ width: '15%', float: 'right', margin: '10px 10px 10px 0' }}
                        size="large"
                        variant="outlined"
                        onClick={handleClose}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </>
    );
}
