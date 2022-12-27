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
    Stack
} from '@mui/material';
import { OrderTableHead } from 'ui-component/table/table-head';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';

// icon
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';

// format
import { formatTimeStampToDate, formatTomeStampToDateTime } from 'utils/format/date';
import { upperCaseFirstCharacter } from 'utils/string';

// scss
import '../../../assets/scss/leave.scss';

// style
import { STYLE_MODAL } from 'constants/style';

// model
import ModelLeaveDetail from '../Modal/model-leave-detail';
import ModelCancelLeave from '../Modal/model-cancel-leave';

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
        label: 'Date Submitted',
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

export default function TableLeaveHistory({ data }) {
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
                        {formatTomeStampToDateTime(row?.createdDate)}
                    </TableCell>
                    <TableCell align="left" className="table-cell">
                        {formatTimeStampToDate(row?.startDate)}
                    </TableCell>
                    <TableCell align="left" className="table-cell">
                        {formatTimeStampToDate(row?.endDate)}
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
                        {upperCaseFirstCharacter(row?.type)}
                    </TableCell>
                    <TableCell align="left" className="table-cell">
                        <ColorBox
                            bgcolor={
                                boxColors.filter((item) => item.status === row?.status).length === 0
                                    ? 'primary.light'
                                    : boxColors.filter((item) => item.status === row?.status).at(0)?.color
                            }
                            title={upperCaseFirstCharacter(row?.status)}
                        />
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
                                >
                                    <VisibilityIcon fontSize="medium" />
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
                        <TableRow>
                            <TableCell colSpan={12} scope="full" align="center">
                                <h3>There is currently no data available</h3>
                            </TableCell>
                        </TableRow>
                    )}
                </Table>
            </TableContainer>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                {switchModal(typeOpenModal)}
            </Modal>
        </Box>
    );
}
