import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Button,
    Grid,
    Chip,
    CardActions,
    Divider,
    Stack
} from '@mui/material';
import { OrderTableHead } from 'ui-component/table/table-head';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import useResponsive from 'hooks/useResponsive';

// format
import { formatTimeStampToDate, formatTimeStampToDateTime } from 'utils/format/date';
import { upperCaseFirstCharacter } from 'utils/string';

// react
import { useState } from 'react';

// scss
import '../../../assets/scss/leave.scss';

// i18n
import { useTranslation } from 'react-i18next';

export default function ModelLeaveDetail({ leaveDetail, handleClose }) {
    const isMobile = useResponsive('mobile');

    const [order] = useState('asc');
    const [orderBy] = useState('id');

    const { t, i18n } = useTranslation();

    const isRejectedByAdmin = (leaveDetailResponse) => {
        return leaveDetailResponse?.status === 'REJECTED' && leaveDetailResponse?.confirmerName !== undefined;
    };

    const isRejectedByManager = (leaveDetailResponse) => {
        return leaveDetailResponse?.status === 'REJECTED' && leaveDetailResponse?.confirmerName === undefined;
    };

    const isNotRejectedAndCanceled = (leaveDetailResponse) => {
        return leaveDetailResponse?.status !== 'REJECTED' && leaveDetailResponse?.status !== 'CANCELED';
    };

    const headCells = [
        {
            id: 'date',
            align: 'left',
            disablePadding: false,
            label: t('Leave Date'),
            width: '4'
        },
        {
            id: 'type',
            align: 'left',
            disablePadding: false,
            label: t('Type'),
            width: '4'
        },
        {
            id: 'note',
            align: 'left',
            disablePadding: false,
            label: t('Note'),
            width: '4'
        }
    ];

    return (
        <Card>
            <CardHeader sx={isMobile ? { p: 2 } : {}} title={t('Leave Detail')}></CardHeader>
            <Divider light />
            <CardContent sx={isMobile ? { p: 2 } : {}}>
                <Box sx={{ width: '100%' }}>
                    <Stack spacing={1}>
                        <Grid container spacing={1}>
                            <Grid item md={3} xs={5}>
                                <span style={{ fontWeight: 'bold' }}>{t('Title')}:</span>
                            </Grid>
                            <Grid item md={9} xs={7}>
                                {leaveDetail?.title}
                            </Grid>
                            <Grid item md={3} xs={5}>
                                <span style={{ fontWeight: 'bold' }}>{t('Creator')}:</span>
                            </Grid>
                            <Grid item md={4} xs={7}>
                                {leaveDetail?.creatorName}
                            </Grid>
                            <Grid item md={2} xs={5}>
                                <span style={{ fontWeight: 'bold' }}>{t('Person on leave')}:</span>
                            </Grid>
                            <Grid item md={3} xs={7}>
                                {leaveDetail?.personOnLeave}
                            </Grid>
                            <Grid item md={3} xs={5}>
                                <span style={{ fontWeight: 'bold' }}>{t('Submitted date')}:</span>
                            </Grid>
                            <Grid item md={4} xs={7}>
                                {formatTimeStampToDateTime(leaveDetail?.createdDate)}
                            </Grid>
                            <Grid item md={2} xs={5}>
                                <span style={{ fontWeight: 'bold' }}>{t('Duration')}:</span>
                            </Grid>
                            <Grid item md={3} xs={7}>
                                {formatTimeStampToDate(leaveDetail?.startDate)} - {formatTimeStampToDate(leaveDetail?.endDate)}
                            </Grid>

                            <Grid item md={3} xs={5}>
                                <span style={{ fontWeight: 'bold' }}>{t('Leave Type')}:</span>
                            </Grid>
                            <Grid item md={4} xs={7}>
                                {t(upperCaseFirstCharacter(leaveDetail?.type))}
                            </Grid>
                            <Grid item md={2} xs={5}>
                                <span style={{ fontWeight: 'bold' }}>{t('Status')}:</span>
                            </Grid>
                            <Grid item md={3} xs={7}>
                                <span>{t(upperCaseFirstCharacter(leaveDetail?.status))}</span>
                            </Grid>
                            {isRejectedByAdmin(leaveDetail) && (
                                <>
                                    <Grid item md={3} xs={5}>
                                        <span style={{ fontWeight: 'bold' }}>{t('Confirmed by')}:</span>
                                    </Grid>
                                    <Grid item md={4} xs={7}>
                                        {leaveDetail?.confirmerName}
                                    </Grid>
                                    <Grid item md={2} xs={5}>
                                        <span style={{ fontWeight: 'bold' }}>{t('Rejected by')}:</span>
                                    </Grid>
                                    <Grid item md={3} xs={7}>
                                        {leaveDetail?.rejecterName}
                                    </Grid>
                                </>
                            )}
                            {isRejectedByManager(leaveDetail) && (
                                <>
                                    <Grid item md={3} xs={5}>
                                        <span style={{ fontWeight: 'bold' }}>{t('Rejected by')}:</span>
                                    </Grid>
                                    <Grid item md={9} xs={7}>
                                        {leaveDetail?.rejecterName}
                                    </Grid>
                                </>
                            )}
                            {isNotRejectedAndCanceled(leaveDetail) && (
                                <>
                                    <Grid item md={3} xs={5}>
                                        <span style={{ fontWeight: 'bold' }}>{t('Confirmed by')}:</span>
                                    </Grid>
                                    <Grid item md={4} xs={7}>
                                        {leaveDetail?.confirmerName ? leaveDetail?.confirmerName : 'Unknown'}
                                    </Grid>
                                    <Grid item md={2} xs={5}>
                                        <span style={{ fontWeight: 'bold' }}>{t('Approved by')}:</span>
                                    </Grid>
                                    <Grid item md={3} xs={7}>
                                        {leaveDetail?.approverName ? leaveDetail?.approverName : 'Unknown'}
                                    </Grid>
                                </>
                            )}
                            <>
                                <Grid item xs={12}>
                                    <span style={{ fontWeight: 'bold' }}>{t('Reason')}: </span>
                                    {leaveDetail?.reason}
                                </Grid>
                            </>
                            {leaveDetail?.rejectReason && (
                                <>
                                    <Grid item md={3} xs={5}>
                                        <span style={{ fontWeight: 'bold' }}>{t('Rejection reason')}:</span>
                                    </Grid>
                                    <Grid item md={9} xs={7}>
                                        {leaveDetail?.rejectReason}
                                    </Grid>
                                </>
                            )}
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}>
                                <TableContainer sx={{ backgroundColor: '#EEEEEE', border: '1px #EEEEEE solid', mt: 1 }}>
                                    <Table aria-labelledby="tableTitle">
                                        <OrderTableHead headCells={headCells} order={order} orderBy={orderBy} />
                                        {leaveDetail?.leaveDetailsDTOS?.length ? (
                                            <TableBody sx={{ backgroundColor: '#FAFAFA' }}>
                                                {leaveDetail?.leaveDetailsDTOS
                                                    ?.slice()
                                                    .sort(function (a, b) {
                                                        return new Date(a.leaveDate) - new Date(b.leaveDate);
                                                    })
                                                    .map((item, index) => (
                                                        <TableRow
                                                            hover
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            tabIndex={-1}
                                                            key={index}
                                                        >
                                                            <TableCell
                                                                className="table-cell-modal"
                                                                align="left"
                                                                style={{
                                                                    width: 250
                                                                }}
                                                            >
                                                                {formatTimeStampToDate(item?.leaveDate)}
                                                            </TableCell>
                                                            <TableCell
                                                                className="table-cell-modal"
                                                                align="left"
                                                                style={{
                                                                    width: 250
                                                                }}
                                                            >
                                                                {t(upperCaseFirstCharacter(item?.dateType))}
                                                            </TableCell>
                                                            <TableCell
                                                                className="table-cell-modal"
                                                                align="left"
                                                                style={{
                                                                    maxWidth: 250
                                                                }}
                                                            >
                                                                {item?.note}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        ) : (
                                            <TableBody>
                                                <TableRow sx={{ backgroundColor: '#fafafa' }}>
                                                    <TableCell colSpan={12} scope="full" align="center">
                                                        <span style={{ fontWeight: 'bold' }}>
                                                            {t('There is no detail for Maternity type')}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        )}
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
            </CardContent>
            <Divider light />
            <CardActions sx={{ justifyContent: 'end', p: isMobile ? 2 : 3 }}>
                <Button variant="contained" size="error" color="secondary" className="button-submit-member" onClick={() => handleClose()}>
                    {t('Close')}
                </Button>
            </CardActions>
        </Card>
    );
}
