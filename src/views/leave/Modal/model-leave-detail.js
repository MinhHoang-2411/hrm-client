import { Box, Card, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Button, Grid, Chip } from '@mui/material';
import { OrderTableHead } from 'ui-component/table/table-head';

// format
import { formatTimeStampToDate, formatTomeStampToDateTime } from 'utils/format/date';
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
        label: 'Date',
        paddingLeft: '40px',
        width: '4'
    },
    {
        id: 'description',
        align: 'left',
        disablePadding: false,
        label: '',
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

const boxColors = [
    {
        status: 'WAITING',
        color: 'warning.dark'
    },
    {
        status: 'CONFIRMED',
        color: 'primary.dark'
    },
    {
        status: 'REJECTED',
        color: 'orange.dark'
    },
    {
        status: 'CANCELED',
        color: 'grey'
    },
    {
        status: 'APPROVED',
        color: 'success.dark'
    }
];

const ColorBox = ({ bgcolor, title }) => (
    <>
        <Card sx={{ borderRadius: '0 !important' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '75px',
                    height: '40px',
                    bgcolor,
                    color: 'white',
                    borderRadius: '3px !important'
                }}
            >
                {title && (
                    <Typography variant="subtitle1" color="inherit">
                        {title}
                    </Typography>
                )}
            </Box>
        </Card>
    </>
);

export default function ModelLeaveDetail({ leaveDetail, handleClose }) {
    const [order] = useState('asc');
    const [orderBy] = useState('id');

    return (
        <>
            <Box
                sx={{
                    padding: '5px 20px 20px 20px',
                    display: 'flex-column'
                }}
            >
                <h2>Leave Detail</h2>
                <Box>
                    <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                        <Grid container spacing={2} columns={12}>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Chip
                                    sx={{ fontWeight: 'bold' }}
                                    variant="outlined"
                                    label={upperCaseFirstCharacter(leaveDetail?.type)}
                                    color="primary"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ColorBox
                                    bgcolor={
                                        boxColors.filter((item) => item.status === leaveDetail?.status).length === 0
                                            ? 'primary.light'
                                            : boxColors.filter((item) => item.status === leaveDetail?.status).at(0)?.color
                                    }
                                    title={upperCaseFirstCharacter(leaveDetail?.status)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                        <Grid container spacing={2} columns={12}>
                            <Grid item xs={12}>
                                <span style={{ fontWeight: 'bold' }}>Title:</span> {leaveDetail?.title}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                        <Grid container spacing={2} columns={12}>
                            <Grid item xs={4}>
                                <span style={{ fontWeight: 'bold' }}>Date Submitted:</span>{' '}
                                {formatTomeStampToDateTime(leaveDetail?.createdDate)}
                            </Grid>
                            <Grid item xs={4}>
                                <span style={{ fontWeight: 'bold' }}>From:</span> {formatTimeStampToDate(leaveDetail?.startDate)}
                            </Grid>
                            <Grid item xs={4}>
                                <span style={{ fontWeight: 'bold' }}>To:</span> {formatTimeStampToDate(leaveDetail?.endDate)}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                        <Grid>
                            <Grid item xs={12}>
                                <span style={{ fontWeight: 'bold' }}>Reason:</span> {leaveDetail?.reason}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                        <Grid container spacing={2} columns={12}>
                            <Grid item xs={12}>
                                <span style={{ fontWeight: 'bold' }}>Detail:</span>
                            </Grid>
                            <Grid item xs={12}>
                                {leaveDetail?.leaveDetailsDTOS.length > 0 ? (
                                    <>
                                        <TableContainer
                                            sx={{
                                                width: '80%',
                                                overflowX: 'auto',
                                                position: 'relative',
                                                display: 'block',
                                                maxWidth: '100%',
                                                '& td, & th': { whiteSpace: 'nowrap' },
                                                marginLeft: 'auto',
                                                marginRight: 'auto'
                                            }}
                                        >
                                            <Table aria-labelledby="tableTitle">
                                                <OrderTableHead headCells={headCells} order={order} orderBy={orderBy} />
                                                <TableBody>
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
                                                            <TableCell className="table-cell-modal" align="left">
                                                                {item?.note}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </>
                                ) : (
                                    <Box style={{ display: 'flex' }}>
                                        <span style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                            There is currently no data available
                                        </span>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        size="error"
                        color="secondary"
                        className="button-submit-member"
                        onClick={() => handleClose()}
                        style={{ float: 'right', marginBottom: '10px' }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </>
    );
}
