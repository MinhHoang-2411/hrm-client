import { useCallback, useState } from 'react';
import * as React from 'react';

// material-ui
import {
    Box,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Collapse,
    IconButton,
    Typography,
    Grid,
    Card
} from '@mui/material';
import { OrderTableHead } from 'ui-component/table/table-head';
import PropTypes from 'prop-types';

// icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// format
import { formatDate } from 'api/leave';
import { upperCaseFirstCharacter } from 'utils/string';

// scss
import '../../../assets/scss/leave.scss';

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
        label: 'Created'
    },
    {
        id: 'dateLeave',
        align: 'left',
        disablePadding: false,
        label: 'Leave Date'
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
        label: 'Type'
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'Status'
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
        status: 'DELETE',
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
                    <TableCell align="left">{formatDate(row?.createdDate)}</TableCell>
                    <TableCell align="left">
                        {formatDate(row?.startDate)} - {formatDate(row?.endDate)}
                    </TableCell>
                    <TableCell align="left">{row?.title}</TableCell>
                    <TableCell align="left">{row?.reason}</TableCell>
                    <TableCell align="left">{upperCaseFirstCharacter(row?.type)}</TableCell>
                    <TableCell align="left">
                        <ColorBox
                            bgcolor={
                                boxColors.filter((item) => item.status === row?.status).length === 0
                                    ? 'primary.light'
                                    : boxColors.filter((item) => item.status === row?.status).at(0)?.color
                            }
                            title={upperCaseFirstCharacter(row?.status)}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 2 }}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Date Type</TableCell>
                                            <TableCell>Note</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row?.leaveDetailsDTOS?.map((historyRow, index) => (
                                            <TableRow
                                                key={index}
                                                className={`row-detail-leave ${index == row?.leaveDetailsDTOS?.length - 1 && 'last-row'}`}
                                            >
                                                <TableCell align="left">{formatDate(historyRow.leaveDate)}</TableCell>
                                                <TableCell align="left">
                                                    {historyRow.dateType === 'ALL_DAY'
                                                        ? 'All day'
                                                        : upperCaseFirstCharacter(historyRow.dateType)}
                                                </TableCell>
                                                <TableCell align="left">{historyRow.note}</TableCell>
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
