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

// format
import { formatTimeStampToDate, formatTimeStampToDateTime } from 'utils/format/date';
import { upperCaseFirstCharacter } from 'utils/string';

// react
import { useState } from 'react';

// scss
import '../../../assets/scss/leave.scss';

const headCells = [
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'Leave Date',
        width: '4'
    },
    {
        id: 'type',
        align: 'left',
        disablePadding: false,
        label: 'Type',
        width: '4'
    },
    {
        id: 'note',
        align: 'left',
        disablePadding: false,
        label: 'Note',
        width: '4'
    }
];

export default function ModelLeaveDetail({ leaveDetail, handleClose }) {
    const [order] = useState('asc');
    const [orderBy] = useState('id');

    const isRejectedByAdmin = (leaveDetailResponse) => {
        return leaveDetailResponse?.status === 'REJECTED' && leaveDetailResponse?.confirmerName !== '';
    };

    const isRejectedByManager = (leaveDetailResponse) => {
        return leaveDetailResponse?.status === 'REJECTED' && leaveDetailResponse?.confirmerName === '';
    };

    const isNotRejected = (leaveDetailResponse) => {
        return leaveDetailResponse?.status !== 'REJECTED' && leaveDetailResponse?.status !== 'CANCELED';
    };

    return (
        <Card>
            <CardHeader title="Leave Detail"></CardHeader>
            <Divider light />
            <CardContent>
                <Box sx={{ width: '100%' }}>
                    <Stack spacing={1}>
                        <Grid container>
                            <Grid item xs={3}>
                                <span style={{ fontWeight: 'bold' }}>Title</span>
                            </Grid>
                            <Grid item xs={9}>
                                {leaveDetail?.title}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <span style={{ fontWeight: 'bold' }}>Creator</span>
                            </Grid>
                            <Grid item xs={4}>
                                {leaveDetail?.creatorName}
                            </Grid>
                            <Grid item xs={2}>
                                <span style={{ fontWeight: 'bold' }}>Person on leave</span>
                            </Grid>
                            <Grid item xs={3}>
                                {leaveDetail?.personOnLeave}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <span style={{ fontWeight: 'bold' }}>Submitted date</span>
                            </Grid>
                            <Grid item xs={4}>
                                {formatTimeStampToDateTime(leaveDetail?.createdDate)}
                            </Grid>
                            <Grid item xs={2}>
                                <span style={{ fontWeight: 'bold' }}>Duration</span>
                            </Grid>
                            <Grid item xs={3}>
                                {formatTimeStampToDate(leaveDetail?.startDate)} - {formatTimeStampToDate(leaveDetail?.endDate)}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <span style={{ fontWeight: 'bold' }}>Leave type</span>
                            </Grid>
                            <Grid item xs={4}>
                                {upperCaseFirstCharacter(leaveDetail?.type)}
                            </Grid>
                            <Grid item xs={2}>
                                <span style={{ fontWeight: 'bold' }}>Status</span>
                            </Grid>
                            <Grid item xs={3}>
                                <span>{upperCaseFirstCharacter(leaveDetail?.status)}</span>
                            </Grid>
                        </Grid>
                        {isRejectedByAdmin(leaveDetail) && (
                            <Grid container>
                                <Grid item xs={3}>
                                    <span style={{ fontWeight: 'bold' }}>Confirmed by</span>
                                </Grid>
                                <Grid item xs={4}>
                                    {leaveDetail?.confirmerName}
                                </Grid>
                                <Grid item xs={2}>
                                    <span style={{ fontWeight: 'bold' }}>Rejected by</span>
                                </Grid>
                                <Grid item xs={3}>
                                    {leaveDetail?.rejecterName}
                                </Grid>
                            </Grid>
                        )}
                        {isRejectedByManager(leaveDetail) && (
                            <Grid container>
                                <Grid item xs={3}>
                                    <span style={{ fontWeight: 'bold' }}>Rejected by</span>
                                </Grid>
                                <Grid item xs={9}>
                                    {leaveDetail?.rejecterName}
                                </Grid>
                            </Grid>
                        )}
                        {isNotRejected(leaveDetail) && (
                            <Grid container>
                                <Grid item xs={3}>
                                    <span style={{ fontWeight: 'bold' }}>Confirmed by</span>
                                </Grid>
                                <Grid item xs={4}>
                                    {leaveDetail?.confirmerName ? leaveDetail?.confirmerName : 'Unknown'}
                                </Grid>
                                <Grid item xs={2}>
                                    <span style={{ fontWeight: 'bold' }}>Approved by</span>
                                </Grid>
                                <Grid item xs={3}>
                                    {leaveDetail?.approverName ? leaveDetail?.approverName : 'Unknown'}
                                </Grid>
                            </Grid>
                        )}
                        <Grid container>
                            <Grid item xs={3}>
                                <span style={{ fontWeight: 'bold' }}>Reason</span>
                            </Grid>
                            <Grid item xs={9}>
                                {leaveDetail?.reason}
                            </Grid>
                        </Grid>
                        {leaveDetail?.rejectReason && (
                            <Grid container>
                                <Grid item xs={3}>
                                    <span style={{ fontWeight: 'bold' }}>Rejection reason</span>
                                </Grid>
                                <Grid item xs={9}>
                                    {leaveDetail?.rejectReason}
                                </Grid>
                            </Grid>
                        )}
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
                                                                {upperCaseFirstCharacter(item?.dateType)}
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
                                                        <span style={{ fontWeight: 'bold' }}>There is no detail for Maternity type</span>
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
            <CardActions sx={{ justifyContent: 'end' }}>
                <Button variant="contained" size="error" color="secondary" className="button-submit-member" onClick={() => handleClose()}>
                    Close
                </Button>
            </CardActions>
        </Card>
    );
}
