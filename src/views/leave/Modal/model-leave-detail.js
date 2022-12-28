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

const showStatusLeave = (status) => {
    let color = '';
    switch (status) {
        case 'CONFIRMED':
            color = '#1E88E5';
            break;
        case 'APPROVED':
            color = '#00C853';
            break;
        case 'REJECTED':
            color = '#D84315';
            break;
        case 'CANCELED':
            color = '#9E9E9E';
            break;
        case 'WAITING':
            color = '#FFC107';
            break;
    }
    return (
        <Chip
            label={upperCaseFirstCharacter(status)}
            sx={{ fontWeight: 'bold', backgroundColor: color, color: '#ffff', borderRadius: '4px' }}
        />
    );
};

export default function ModelLeaveDetail({ leaveDetail, handleClose }) {
    const [order] = useState('asc');
    const [orderBy] = useState('id');

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
                                <span style={{ fontWeight: 'bold' }}>Reason</span>
                            </Grid>
                            <Grid item xs={9}>
                                {leaveDetail?.reason}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <span style={{ fontWeight: 'bold' }}>Date submitted</span>
                            </Grid>
                            <Grid item xs={4}>
                                {formatTimeStampToDateTime(leaveDetail?.createdDate)}
                            </Grid>
                            <Grid item xs={2}>
                                <span style={{ fontWeight: 'bold' }}>Leave type</span>
                            </Grid>
                            <Grid item xs={3}>
                                {upperCaseFirstCharacter(leaveDetail?.type)}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <span style={{ fontWeight: 'bold' }}>Duration</span>
                            </Grid>
                            <Grid item xs={4}>
                                {formatTimeStampToDate(leaveDetail?.startDate)} - {formatTimeStampToDate(leaveDetail?.endDate)}
                            </Grid>
                            <Grid item xs={2}>
                                <span style={{ fontWeight: 'bold' }}>Status</span>
                            </Grid>
                            <Grid item xs={3}>
                                {showStatusLeave(leaveDetail?.status)}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <TableContainer sx={{ backgroundColor: '#EEEEEE', border: '1px #EEEEEE solid', mt: 1 }}>
                                    <Table aria-labelledby="tableTitle">
                                        <OrderTableHead headCells={headCells} order={order} orderBy={orderBy} />
                                        <TableBody sx={{ backgroundColor: '#FAFAFA' }}>
                                            {leaveDetail?.leaveDetailsDTOS?.map((item, index) => (
                                                <TableRow
                                                    hover
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    tabIndex={-1}
                                                    key={index}
                                                >
                                                    <TableCell className="table-cell-modal" align="left">
                                                        {formatTimeStampToDate(item?.leaveDate)}
                                                    </TableCell>
                                                    <TableCell className="table-cell-modal" align="left">
                                                        {upperCaseFirstCharacter(item?.dateType)}
                                                    </TableCell>
                                                    <TableCell
                                                        className="table-cell-modal"
                                                        align="left"
                                                        style={{
                                                            maxWidth: 200
                                                        }}
                                                    >
                                                        {item?.note}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
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
