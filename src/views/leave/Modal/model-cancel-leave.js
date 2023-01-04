import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider } from '@mui/material';

// redux
import { useAppDispatch } from 'app/hooks';
import { leaveActions } from 'store/leave/leaveSlice';

export default function ModelCancelLeave({ leaveCancel, handleClose }) {
    const dispatch = useAppDispatch();

    const handleUpdate = () => {
        const tmpData = { ...leaveCancel };
        dispatch(leaveActions.cancelLeave({ ...tmpData }));
    };

    return (
        <>
            <Card>
                <CardHeader title="Cancel Leave"></CardHeader>
                <Divider light />
                <CardContent>
                    <Box style={{ fontSize: '15px' }}>Would you like to cancel your leave?</Box>
                </CardContent>
                <Divider light />
                <CardActions sx={{ justifyContent: 'end' }}>
                    <Button
                        disableElevation
                        style={{ width: '15%', float: 'right' }}
                        size="large"
                        variant="outlined"
                        onClick={handleClose}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        disableElevation
                        style={{ width: '15%', float: 'right' }}
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {
                            handleClose();
                            handleUpdate();
                        }}
                    >
                        Agree
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}
