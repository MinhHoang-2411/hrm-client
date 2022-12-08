import { useCallback, useState } from 'react';
import * as React from 'react';

// material-ui
import { Box, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Collapse, IconButton, Typography } from '@mui/material';
import { OrderTableHead } from 'ui-component/table/table-head';
import PropTypes from 'prop-types';

// icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const headCells = [
    {
        id: 'dropdown',
        align: 'left',
        disablePadding: true,
        label: ''
    },
    {
        id: 'createdDate',
        align: 'left',
        disablePadding: false,
        label: 'Date Created'
    },
    {
        id: 'dateLeave',
        align: 'left',
        disablePadding: false,
        label: 'Date Leave'
    },
    {
        id: 'title',
        align: 'left',
        disablePadding: false,
        label: 'Title'
    },
    {
        id: 'reason',
        align: 'left',
        disablePadding: false,
        label: 'Reason'
    },
    {
        id: 'leaveType',
        align: 'left',
        disablePadding: false,
        label: 'Leave Type'
    },
    {
        id: 'note',
        align: 'left',
        disablePadding: false,
        label: 'Note'
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'Status'
    }
];

export default function TableLeaveHistory({ data }) {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell align="left">{row?.createdDate}</TableCell>
                    <TableCell align="left">
                        {row?.startDate} - {row?.endDate}
                    </TableCell>
                    <TableCell align="left">{row?.title}</TableCell>
                    <TableCell align="left">{row?.reason}</TableCell>
                    <TableCell align="left">{row?.type}</TableCell>
                    <TableCell align="left">{row?.status}</TableCell>
                    <TableCell align="left">{row?.status}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h4" gutterBottom component="div">
                                    Leave Details
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Date Type</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.leaveDetailsDTOS?.map((historyRow, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">{historyRow.leaveDate}</TableCell>
                                                <TableCell align="left">
                                                    {historyRow.dateType === 'ALL_DAY' ? 'ALL DAY' : historyRow.dateType}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            createdDate: PropTypes.string.isRequired,
            startDate: PropTypes.string.isRequired,
            endDate: PropTypes.string.isRequired,
            leaveDetailsDTOS: PropTypes.arrayOf(
                PropTypes.shape({
                    leaveDate: PropTypes.string.isRequired,
                    dateType: PropTypes.string.isRequired
                })
            ).isRequired,
            title: PropTypes.string.isRequired,
            reason: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired
        }).isRequired
    };

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table aria-labelledby="tableTitle">
                    <OrderTableHead headCells={headCells} order={order} orderBy={orderBy} />

                    {data?.length ? (
                        <TableBody>
                            {data.map((row, index) => (
                                <Row key={index} row={row} />
                            ))}
                        </TableBody>
                    ) : (
                        <TableRow>
                            <TableCell colSpan={12} scope="full" align="center">
                                <h3>There is currently no data available</h3>
                            </TableCell>
                        </TableRow>
                    )}
                </Table>
            </TableContainer>
        </Box>
    );
}
