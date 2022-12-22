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
import { formatTimeStampToDate } from 'utils/format/date';
import { upperCaseFirstCharacter } from 'utils/string';

// scss
import '../../../assets/scss/leave.scss';
import { LeftCircleFilled } from '@ant-design/icons';

const headCells = [
    {
        id: 'title',
        align: 'left',
        disablePadding: false,
        label: 'Title'
    },
    {
        id: 'description',
        align: 'left',
        disablePadding: false,
        label: 'Description'
    },
    {
        id: 'issuedDate',
        align: 'left',
        disablePadding: false,
        label: 'Issued Date'
    },
    {
        id: 'returnedDate',
        align: 'left',
        disablePadding: false,
        label: 'Returned Date'
    },
    {
        id: 'requestDate',
        align: 'left',
        disablePadding: false,
        label: 'Request Date'
    },
    {
        id: 'assetModel',
        align: 'left',
        disablePadding: false,
        label: 'Model Name'
    },
    {
        id: 'receivedAsset',
        align: 'left',
        disablePadding: false,
        label: 'Received Asset'
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
        status: 'PENDING',
        color: 'warning.dark'
    },
    {
        status: 'PROCESSING',
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
        status: 'RECEIVED',
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

export default function TableAssetRequestHistory({ data }) {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell align="left">{row?.title}</TableCell>
                    <TableCell align="left">{row?.description}</TableCell>

                    <TableCell align="left">{formatTimeStampToDate(row?.issuedDate)}</TableCell>
                    <TableCell align="left">{formatTimeStampToDate(row?.returnedDate)}</TableCell>
                    <TableCell align="left">{formatTimeStampToDate(row?.requestDate)}</TableCell>
                    <TableCell align="left">{row?.assetModel === null ? '-' : row?.assetModel.modelName}</TableCell>
                    <TableCell align="left">{row?.receivedAsset === null ? '-' : row?.receivedAsset.description}</TableCell>
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
