import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider } from '@mui/material';

// redux
import { useAppDispatch } from 'app/hooks';
import { leaveActions } from 'store/leave/leaveSlice';

// i18n
import { useTranslation } from 'react-i18next';

export default function ModelCancelLeave({ leaveCancel, handleClose }) {
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation();
    const handleUpdate = () => {
        const tmpData = { ...leaveCancel, translation: t };
        dispatch(leaveActions.cancelLeave({ ...tmpData }));
    };

    return (
        <>
            <Card>
                <CardHeader title={t('Cancel Leave')}></CardHeader>
                <Divider light />
                <CardContent>
                    <Box style={{ fontSize: '15px' }}>
                        {t('Are you sure to')} <b>{t('cancel')}</b> {t('this leave?')}
                    </Box>
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
                        {t('Cancel')}
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
                        {t('Agree')}
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}
