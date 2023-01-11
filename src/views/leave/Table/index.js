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
    Card,
    Stack,
    Chip
} from '@mui/material';
import { OrderTableHead } from 'ui-component/table/table-head';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';

// icon
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';

// format
import { formatTimeStampToDate, formatTimeStampToDateTime } from 'utils/format/date';
import { upperCaseFirstCharacter } from 'utils/string';

// scss
import '../../../assets/scss/leave.scss';

// style
import { STYLE_MODAL } from 'constants/style';

// model
import ModelLeaveDetail from '../Modal/model-leave-detail';
import ModelCancelLeave from '../Modal/model-cancel-leave';

// empty
import Empty from 'ui-component/Empty';

const headCells = [
    {
        id: 'dropdown',
        align: 'left',
        disablePadding: true,
        label: '',
        width: '10px'
    },
    {
        id: 'createdDate',
        align: 'left',
        disablePadding: false,
        label: 'Submitted Date',
        fontSize: '15px',
        paddingLeft: '10px'
    },
    {
        id: 'title',
        align: 'left',
        disablePadding: false,
        label: 'Title',
        fontSize: '15px',
        paddingLeft: '10px'
    },
    {
        id: 'reason',
        align: 'left',
        disablePadding: false,
        label: 'Reason',
        fontSize: '15px',
        paddingLeft: '10px'
    },
    {
        id: 'from',
        align: 'left',
        disablePadding: false,
        label: 'From',
        fontSize: '15px',
        paddingLeft: '10px'
    },
    {
        id: 'to',
        align: 'left',
        disablePadding: false,
        label: 'To',
        fontSize: '15px',
        paddingLeft: '10px'
    },
    {
        id: 'leaveType',
        align: 'left',
        disablePadding: false,
        label: 'Type',
        fontSize: '15px',
        paddingLeft: '10px'
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'Status',
        fontSize: '15px',
        paddingLeft: '10px'
    },
    {
        id: 'action',
        align: 'left',
        disablePadding: false,
        label: 'Action',
        fontSize: '15px',
        paddingLeft: '25px'
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
            sx={{ fontWeight: 'bold', backgroundColor: color, color: '#ffff', borderRadius: '4px', width: '86px' }}
        />
    );
};

export default function TableLeaveHistory({ data, showFilterMessage }) {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [open, setOpen] = useState(false);
    const [typeOpenModal, setTypeOpenModal] = useState('');
    const [selectedLeave, setSelectedLeave] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTypeOpenModal('');
    };

    const switchModal = (type) => {
        switch (type) {
            case 'detail':
                return (
                    <Box sx={{ ...STYLE_MODAL, width: 900 }}>
                        <ModelLeaveDetail leaveDetail={selectedLeave} handleClose={handleClose} />
                    </Box>
                );
            case 'cancel':
                return (
                    <Box sx={{ ...STYLE_MODAL, width: 700 }}>
                        <ModelCancelLeave leaveCancel={selectedLeave} handleClose={handleClose} />
                    </Box>
                );
            default:
                return <Box sx={{ ...STYLE_MODAL, width: 750 }}></Box>;
        }
    };

    function Row(props) {
        const { row } = props;

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell align="left" className="table-cell"></TableCell>
                    <TableCell align="left" className="table-cell">
                        {formatTimeStampToDateTime(row?.createdDate)}
                    </TableCell>
                    <TableCell
                        align="left"
                        className="table-cell"
                        style={{ minWidth: 150, maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                        {row?.title}
                    </TableCell>
                    <TableCell
                        align="left"
                        className="table-cell"
                        style={{ minWidth: 200, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                        {row?.reason}
                    </TableCell>
                    <TableCell align="left" className="table-cell">
                        {formatTimeStampToDate(row?.startDate)}
                    </TableCell>
                    <TableCell align="left" className="table-cell">
                        {formatTimeStampToDate(row?.endDate)}
                    </TableCell>
                    <TableCell align="left" className="table-cell">
                        {upperCaseFirstCharacter(row?.type)}
                    </TableCell>
                    <TableCell align="left" className="table-cell">
                        {showStatusLeave(row?.status)}
                    </TableCell>
                    <TableCell align="left" className="table-cell">
                        <Box>
                            <Stack direction="row" spacing={1}>
                                <IconButton
                                    aria-label="detail"
                                    onClick={(e) => {
                                        setSelectedLeave(row);
                                        setTypeOpenModal('detail');
                                        handleOpen();
                                    }}
                                    color="secondary"
                                >
                                    <InfoIcon fontSize="medium" />
                                </IconButton>
                                <IconButton
                                    style={{ marginLeft: '0px' }}
                                    onClick={(e) => {
                                        setSelectedLeave(row);
                                        setTypeOpenModal('cancel');
                                        handleOpen();
                                    }}
                                    aria-label="cancel"
                                    disabled={row?.status === 'WAITING' ? false : true}
                                    color="error"
                                >
                                    <CancelIcon fontSize="medium" />
                                </IconButton>
                            </Stack>
                        </Box>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

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
                            {data.map((item, index) => (
                                <Row key={index} row={item} />
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={12} scope="full" align="center">
                                    <Empty
                                        title={showFilterMessage ? 'No results matched your search' : 'No data available'}
                                        height="400px"
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                {switchModal(typeOpenModal)}
            </Modal>
        </Box>
    );
}
