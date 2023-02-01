// material
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import InfoIcon from '@mui/icons-material/Info';
import {
    Box,
    Button,
    Card,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Stack
} from '@mui/material';
import Modal from '@mui/material/Modal';
import MainCard from 'ui-component/cards/MainCard';
import { InputSearch } from 'ui-component/filter/input-search';
import SkeletonLoading from 'ui-component/SkeletonLoading';

// convert date
import { formatDateMaterialForFilter } from 'utils/format/date';

import { fetchMoreCondition } from 'utils/pagination';

// react
import { useCallback, useEffect, useState } from 'react';

// redux
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { leaveActions } from 'store/leave/leaveSlice';

// filter and search
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import _ from 'lodash';

// constants
import { LEAVE_TYPE } from 'constants/index';

// format
import { formatTimeStampToDate, formatTimeStampToDateTime } from 'utils/format/date';
import { upperCaseFirstCharacter } from 'utils/string';

// scss
import '../../../assets/scss/leave.scss';

// image
import forbiddenpng from 'assets/images/forbidden.png';

// empty
import Empty from 'ui-component/Empty';

// infinite scroll
import InfiniteScroll from 'react-infinite-scroll-component';

const styleTitle = {
    fontWeight: 'bold',
    marginBottom: '10px',
    marginTop: '15px'
};
const styleLabel = {
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center'
};
const styleCount = {
    padding: '2px 5px',
    background: '#e6e6e6',
    borderRadius: '8px',
    marginLeft: '7px',
    fontSize: '14px'
};

// style
import { STYLE_MODAL } from 'constants/style';

// model
import ModelLeaveDetail from '../../leave/Modal/model-leave-detail';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

const MonitorLeave = () => {
    const dispatch = useAppDispatch();
    const [paramsAll, setParamsAll] = useState({
        size: 10,
        page: 0
    });
    const [paramsWaiting, setParamsWaiting] = useState({
        size: 10,
        page: 0
    });
    const [page, setPage] = useState(0);
    const [pageWaiting, setPageWaiting] = useState(0);
    const [search, setSearch] = useState('');
    const [searchListWaiting, setSearchListWaiting] = useState('');

    const {
        listDataManagement: listLeaveForManager,
        listDataWaiting: listLeaveWaiting,
        loadMoreWaiting,
        loadMore,
        reloadList,
        reloadListWaiting,
        paginationManager,
        paginationWaiting,
        loadingWaiting,
        loading
    } = useAppSelector((state) => state.leave);

    const isLeaveWaiting = (status) => status == 'WAITING';
    const [openModelConfirm, setOpenModelConfirm] = useState(false);
    const [action, setAction] = useState('');
    const [title, setTitle] = useState('');
    const [leaveSelected, setLeaveSelected] = useState({});
    const [havePermission, setHavePermission] = useState(false);

    const [fromWaiting, setFromWaiting] = useState(null);
    const [fromAll, setFromAll] = useState(null);
    const [fromOtherError, setFromOtherError] = useState(null);
    const [fromWaitingError, setFromWaitingError] = useState(null);
    const [toWaiting, setToWaiting] = useState(null);
    const [toAll, setToAll] = useState(null);
    const [toOtherError, setToOtherError] = useState(null);
    const [toWaitingError, setToWaitingError] = useState(null);
    const basicInfo = JSON.parse(localStorage.getItem('employee'));

    const handleClose = () => {
        setOpenModelConfirm(false);
        setAction('');
        setTitle('');
        setLeaveSelected('');
    };

    const [openDetail, setOpenDetail] = useState(false);

    const handleOpenModalDetail = () => setOpenDetail(true);
    const handleCloseModalDetail = () => {
        setOpenDetail(false);
    };

    const handleClickModelConfirm = (row, title, action) => {
        setOpenModelConfirm(true);
        setAction(action);
        setTitle(title);
        setLeaveSelected(row);
    };

    const handleUpdateStatus = (values) => {
        const tmpData = { ...leaveSelected };

        if (action === 'CONFIRMED') {
            dispatch(leaveActions.confirmLeave({ ...tmpData }));
        } else if (action === 'REJECTED') {
            if (values.rejectReason !== '') tmpData['rejectReason'] = values.rejectReason.trim();
            dispatch(leaveActions.rejectLeave({ ...tmpData }));
        }
        handleClose();
    };

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

    const debounceSearch = useCallback(
        _.debounce(
            (value, type) =>
                type == 'waiting'
                    ? setParamsWaiting((prevState) => {
                          const newState = { ...prevState };
                          if (value && value.trim() !== '') {
                              newState['title.contains'] = value.trim();
                              newState['reason.contains'] = value.trim();
                          } else {
                              delete newState['title.contains'];
                              delete newState['reason.contains'];
                          }
                          return { ...newState, page: 0 };
                      })
                    : setParamsAll((prevState) => {
                          const newState = { ...prevState };
                          if (value && value.trim() !== '') {
                              newState['title.contains'] = value.trim();
                              newState['reason.contains'] = value.trim();
                          } else {
                              delete newState['title.contains'];
                              delete newState['reason.contains'];
                          }
                          return { ...newState, page: 0 };
                      }),
            500
        ),
        []
    );
    const handleSearch = (value, type) => {
        if (type == 'waiting') setSearchListWaiting(value);
        else setSearch(value);
        debounceSearch(value, type);
    };

    const handleFilter = (key, value, type) => {
        if (type == 'waiting') {
            setParamsWaiting((preState) => {
                const state = { ...preState, page: 0 };
                if (value === 'all') delete state[key];
                else state[key] = value;
                if (key === 'startDate.greaterThanOrEqual') setFromWaiting(value);
                if (key === 'endDate.lessThanOrEqual') setToWaiting(value);
                return state;
            });
        } else {
            setParamsAll((preState) => {
                const state = { ...preState, page: 0 };
                if (value === 'all') delete state[key];
                else state[key] = value;
                if (key === 'startDate.greaterThanOrEqual') setFromAll(value);
                if (key === 'endDate.lessThanOrEqual') setToAll(value);
                return state;
            });
        }
    };

    const showDetail = (leaveDetail) => {
        return (
            <Box sx={{ ...STYLE_MODAL, width: 900 }}>
                <ModelLeaveDetail leaveDetail={leaveSelected} handleClose={handleCloseModalDetail} />
            </Box>
        );
    };

    const renderList = useCallback(
        (data) =>
            Array.isArray(data) &&
            data?.map((row, index) => (
                <Card className="card" key={index} sx={{ fontSize: '15px', marginBottom: '15px', marginTop: '5px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '10px 30px' }}>
                        <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                            <Grid container spacing={2} columns={12}>
                                <Grid item xs={7}>
                                    <Box sx={styleTitle}>{row?.personOnLeave}</Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <IconButton
                                        style={{ float: 'right' }}
                                        onClick={(e) => {
                                            setLeaveSelected(row);
                                            handleOpenModalDetail();
                                        }}
                                        aria-label="cancel"
                                        color="secondary"
                                    >
                                        <InfoIcon fontSize="medium" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                            <Grid container spacing={2} columns={12}>
                                <Grid item xs={12}>
                                    <span style={{ fontWeight: 'bold' }}>Title:</span> {row?.title}
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                            <Grid container spacing={2} columns={12}>
                                <Grid item xs={6}>
                                    <span style={{ fontWeight: 'bold' }}>Leave Type: </span>{' '}
                                    <Chip
                                        sx={{ fontWeight: 'bold', borderRadius: '4px', marginLeft: '5px' }}
                                        variant="outlined"
                                        label={upperCaseFirstCharacter(row?.type)}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Status: </span> {showStatusLeave(row?.status)}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                            <Grid container spacing={2} columns={12}>
                                <Grid item xs={12}>
                                    <span style={{ fontWeight: 'bold' }}>Date Submitted:</span>{' '}
                                    {formatTimeStampToDateTime(row?.createdDate)}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                            <Grid container spacing={2} columns={12}>
                                <Grid item xs={6}>
                                    <span style={{ fontWeight: 'bold' }}>From:</span> {formatTimeStampToDate(row?.startDate)}
                                </Grid>
                                <Grid item xs={5}>
                                    <span style={{ fontWeight: 'bold' }}>To:</span> {formatTimeStampToDate(row?.endDate)}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                            <span style={{ fontWeight: 'bold' }}>Reason:</span>
                            <span style={{ marginLeft: '3px' }}>{row?.reason}</span>
                        </Box>
                        {isLeaveWaiting(row?.status) && (
                            <Box sx={{ margin: '10px 10px 12px 0px' }}>
                                <Button
                                    sx={{ float: 'right' }}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<CheckOutlined />}
                                    onClick={() => {
                                        handleClickModelConfirm(row, 'confirm', 'CONFIRMED');
                                    }}
                                >
                                    Confirm
                                </Button>
                                <Button
                                    sx={{ marginRight: '15px', float: 'right' }}
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<CloseOutlined />}
                                    onClick={() => {
                                        handleClickModelConfirm(row, 'reject', 'REJECTED');
                                    }}
                                >
                                    Reject
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Card>
            )),
        [listLeaveForManager, listLeaveWaiting]
    );

    const handleFetchMoreWaitingLeave = () => {
        if (fetchMoreCondition(pageWaiting, paginationWaiting, paramsWaiting)) {
            dispatch(leaveActions.loadMoreWaiting({ ...paramsWaiting, page: pageWaiting + 1 }));
            setPageWaiting(pageWaiting + 1);
        }
    };

    const handleFetchMoreLeave = () => {
        if (fetchMoreCondition(page, paginationManager, paramsAll)) dispatch(leaveActions.loadMore({ ...paramsAll, page: page + 1 }));
        setPage(page + 1);
    };

    const isShowFilterMessage = (type) => {
        if (type === 'waiting') {
            if (
                (paramsWaiting['title.contains'] && paramsWaiting['title.contains'] !== '') ||
                (paramsWaiting['type.equals'] && paramsWaiting['type.equals'] !== '') ||
                (paramsWaiting['startDate.greaterThanOrEqual'] && paramsWaiting['startDate.greaterThanOrEqual'] !== '') ||
                (paramsWaiting['endDate.lessThanOrEqual'] && paramsWaiting['endDate.lessThanOrEqual'] !== '')
            )
                return true;
            else return false;
        } else {
            if (
                (paramsAll['title.contains'] && paramsAll['title.contains'] !== '') ||
                (paramsAll['type.equals'] && paramsAll['type.equals'] !== '') ||
                (paramsAll['startDate.greaterThanOrEqual'] && paramsAll['startDate.greaterThanOrEqual'] !== '') ||
                (paramsAll['endDate.lessThanOrEqual'] && paramsAll['endDate.lessThanOrEqual'] !== '') ||
                (paramsAll['status.equals'] && paramsAll['status.equals'] !== '')
            )
                return true;
            else return false;
        }
    };

    useEffect(() => {
        dispatch(leaveActions.fetchDataForManager(paramsAll));
        setPage(0);
    }, [reloadList, paramsAll]);

    useEffect(() => {
        dispatch(leaveActions.getListWaiting(paramsWaiting));
        setPageWaiting(0);
    }, [reloadListWaiting, paramsWaiting]);

    useEffect(() => {
        const role = basicInfo.position;
        if (role === 'MANAGER') setHavePermission(true);
        else setHavePermission(false);
    }, []);

    return (
        <>
            {havePermission ? (
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box
                        sx={{
                            padding: '20px 20px',
                            display: 'flex-column'
                        }}
                    >
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Box sx={{ padding: '10px 20px' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '5px' }}>
                                        <h3 style={styleLabel}>
                                            Waiting leave requests <span style={styleCount}>{paginationWaiting?.totalCount || 0}</span>
                                        </h3>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                                            <Stack direction="row" alignItems="center" sx={{ marginBottom: '2.5px' }}>
                                                <InputSearch
                                                    width={'520px'}
                                                    search={searchListWaiting}
                                                    handleSearch={(value) => handleSearch(value, 'waiting')}
                                                    placeholder="Search..."
                                                />
                                            </Stack>
                                            <Box>
                                                <FormControl sx={{ minWidth: 150, marginTop: '10px' }}>
                                                    <InputLabel size="small" color="secondary" id="demo-simple-select-label">
                                                        Leave Type
                                                    </InputLabel>
                                                    <Select
                                                        size="small"
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={paramsAll?.['type.equals']}
                                                        onChange={(e) => handleFilter('type.equals', e.target.value, 'waiting')}
                                                        label="Type"
                                                        color="secondary"
                                                    >
                                                        <MenuItem size="small" value={'all'}>
                                                            All
                                                        </MenuItem>
                                                        {LEAVE_TYPE?.map((item, index) => (
                                                            <MenuItem key={index} value={item} size="small">
                                                                {upperCaseFirstCharacter(item)}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <FormControl
                                                    sx={{ width: { xs: '100%', md: 170 }, marginLeft: '15px', marginTop: '10px' }}
                                                    size="small"
                                                >
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Start Date"
                                                            value={fromWaiting || null}
                                                            name="fromWaiting"
                                                            onChange={(e) => {
                                                                handleFilter(
                                                                    'startDate.greaterThanOrEqual',
                                                                    formatDateMaterialForFilter(e),
                                                                    'waiting'
                                                                );
                                                            }}
                                                            inputFormat="DD/MM/YYYY"
                                                            onError={(newError) => setFromWaitingError(newError)}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    size="small"
                                                                    color="secondary"
                                                                    {...params}
                                                                    helperText={
                                                                        fromWaitingError ? 'Please follow the format dd/mm/yyyy' : ''
                                                                    }
                                                                />
                                                            )}
                                                            style={{ maxHeight: '70%' }}
                                                        />
                                                    </LocalizationProvider>
                                                </FormControl>
                                                <FormControl
                                                    sx={{ width: { xs: '100%', md: 170 }, marginLeft: '15px', marginTop: '10px' }}
                                                    size="small"
                                                >
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="End Date"
                                                            value={toWaiting || null}
                                                            name="toWaiting"
                                                            minDate={fromWaiting}
                                                            onChange={(e) => {
                                                                handleFilter(
                                                                    'endDate.lessThanOrEqual',
                                                                    formatDateMaterialForFilter(e),
                                                                    'waiting'
                                                                );
                                                            }}
                                                            inputFormat="DD/MM/YYYY"
                                                            onError={(newError) => setToWaitingError(newError)}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    size="small"
                                                                    color="secondary"
                                                                    {...params}
                                                                    helperText={
                                                                        toWaitingError === 'invalidDate'
                                                                            ? 'Please follow the format dd/mm/yyyy'
                                                                            : toWaitingError === 'minDate'
                                                                            ? 'Please choose valid time'
                                                                            : ''
                                                                    }
                                                                />
                                                            )}
                                                            style={{ maxHeight: '70%' }}
                                                        />
                                                    </LocalizationProvider>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <InfiniteScroll
                                        loader={
                                            loadMoreWaiting ? <SkeletonLoading sx={{ marginBottom: '15px', minHeight: '270px' }} /> : null
                                        }
                                        height="75vh"
                                        hasMore={fetchMoreCondition(pageWaiting, paginationWaiting, paramsWaiting)}
                                        dataLength={listLeaveWaiting.length}
                                        next={handleFetchMoreWaitingLeave}
                                        scrollThreshold="1px"
                                    >
                                        {loadingWaiting ? (
                                            [...Array(3).keys()].map((value) => (
                                                <SkeletonLoading
                                                    key={value}
                                                    sx={{ marginBottom: '15px', minHeight: '50px', height: '50px', marginLeft: '5px' }}
                                                />
                                            ))
                                        ) : listLeaveWaiting?.length ? (
                                            renderList(listLeaveWaiting)
                                        ) : (
                                            <Empty
                                                title={
                                                    isShowFilterMessage('waiting') ? 'No results matched your search' : 'No data available'
                                                }
                                            />
                                        )}
                                    </InfiniteScroll>
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Box sx={{ padding: '10px 20px' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginBottom: '10px',
                                            width: '99%',
                                            marginLeft: 'auto',
                                            marginRight: 'auto'
                                        }}
                                    >
                                        <h3 style={styleLabel}>
                                            Other leave requests <span style={styleCount}>{paginationManager?.totalCount || 0}</span>
                                        </h3>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12.5px' }}>
                                            <InputSearch
                                                width={'595px'}
                                                search={search}
                                                handleSearch={handleSearch}
                                                placeholder="Search ..."
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                            <FormControl sx={{ minWidth: 120 }}>
                                                <InputLabel size="small" id="demo-simple-select-label" color="secondary">
                                                    Leave Type
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={paramsAll?.['type.equals']}
                                                    onChange={(e) => handleFilter('type.equals', e.target.value)}
                                                    label="Type"
                                                    color="secondary"
                                                    size="small"
                                                >
                                                    <MenuItem value={'all'}>All</MenuItem>
                                                    {LEAVE_TYPE?.map((item, index) => (
                                                        <MenuItem key={index} value={item}>
                                                            {upperCaseFirstCharacter(item)}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl sx={{ minWidth: 120, marginLeft: '5px' }}>
                                                <InputLabel size="small" id="demo-simple-select-label" color="secondary">
                                                    Status
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={paramsAll?.['status.equals']}
                                                    onChange={(e) => handleFilter('status.equals', e.target.value)}
                                                    label="Status"
                                                    color="secondary"
                                                    size="small"
                                                >
                                                    <MenuItem value={'all'}>All</MenuItem>
                                                    <MenuItem value={'REJECTED'}>Rejected</MenuItem>
                                                    <MenuItem value={'CONFIRMED'}>Confirmed</MenuItem>
                                                    <MenuItem value={'APPROVED'}>Approved</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <FormControl sx={{ width: { xs: '100%', md: 170 }, marginLeft: '5px' }} size="small">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Start Date"
                                                        value={fromAll || null}
                                                        name="fromAll"
                                                        onChange={(e) => {
                                                            handleFilter('startDate.greaterThanOrEqual', formatDateMaterialForFilter(e));
                                                        }}
                                                        onError={(newError) => setFromOtherError(newError)}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                size="small"
                                                                color="secondary"
                                                                {...params}
                                                                className="input-date-picker"
                                                                helperText={fromOtherError ? 'Please follow the format dd/mm/yyyy' : ''}
                                                            />
                                                        )}
                                                        inputFormat="DD/MM/YYYY"
                                                        style={{ maxHeight: '70%' }}
                                                    />
                                                </LocalizationProvider>
                                            </FormControl>
                                            <FormControl sx={{ width: { xs: '100%', md: 170 }, marginLeft: '5px' }} size="small">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="End Date"
                                                        value={toAll || null}
                                                        name="toAll"
                                                        onChange={(e) => {
                                                            handleFilter('endDate.lessThanOrEqual', formatDateMaterialForFilter(e));
                                                        }}
                                                        minDate={fromAll}
                                                        onError={(newError) => setToOtherError(newError)}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                size="small"
                                                                color="secondary"
                                                                {...params}
                                                                className="input-date-picker"
                                                                helperText={
                                                                    toOtherError === 'invalidDate'
                                                                        ? 'Please follow the format dd/mm/yyyy'
                                                                        : toOtherError === 'minDate'
                                                                        ? 'Please choose valid time'
                                                                        : ''
                                                                }
                                                            />
                                                        )}
                                                        inputFormat="DD/MM/YYYY"
                                                        style={{ maxHeight: '70%' }}
                                                    />
                                                </LocalizationProvider>
                                            </FormControl>
                                            {/* <Button
                                                sx={{ width: { xs: '100%', md: 90 }, marginLeft: '5px', height: '100%' }}
                                                size="medium"
                                                variant="contained"
                                                onClick={(e) => {
                                                    handleClearFilter('other');
                                                }}
                                                color="secondary"
                                            >
                                                Clear
                                            </Button> */}
                                        </Box>
                                    </Box>
                                    <InfiniteScroll
                                        loader={loadMore ? <SkeletonLoading sx={{ marginBottom: '15px', minHeight: '270px' }} /> : null}
                                        height="75vh"
                                        hasMore={fetchMoreCondition(page, paginationManager, paramsAll)}
                                        dataLength={listLeaveForManager.length}
                                        next={handleFetchMoreLeave}
                                        scrollThreshold="1px"
                                    >
                                        {loading ? (
                                            [...Array(3).keys()].map((value) => (
                                                <SkeletonLoading
                                                    key={value}
                                                    sx={{ marginBottom: '15px', minHeight: '50px', height: '50px', marginLeft: '5px' }}
                                                />
                                            ))
                                        ) : listLeaveForManager?.length ? (
                                            renderList(listLeaveForManager)
                                        ) : (
                                            <Empty title={isShowFilterMessage() ? 'No results matched your search' : 'No data available'} />
                                        )}
                                    </InfiniteScroll>
                                </Box>
                            </Grid>

                            <Grid>
                                <Formik
                                    initialValues={{
                                        rejectReason: ''
                                    }}
                                    validationSchema={Yup.object().shape({
                                        rejectReason: Yup.string().max(255, 'Please enter no more than 255 characters').trim()
                                    })}
                                    onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                                        try {
                                            handleUpdateStatus(values);
                                            resetForm();
                                        } catch (err) {
                                            setStatus({ success: false });
                                            setErrors({ submit: err.message });
                                            setSubmitting(false);
                                        }
                                    }}
                                >
                                    {({ errors, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                                        <form noValidate onSubmit={handleSubmit}>
                                            <Dialog open={openModelConfirm} onClose={handleClose} fullWidth>
                                                <DialogTitle sx={{ fontSize: '24px' }}>{upperCaseFirstCharacter(title)}</DialogTitle>
                                                <DialogContent>
                                                    <span style={{ fontSize: '15px' }}>
                                                        Are you sure to <b>{title}</b> this leave?
                                                    </span>
                                                    {action === 'REJECTED' && (
                                                        <FormControl fullWidth sx={{ marginTop: '10px' }}>
                                                            <TextField
                                                                id="outlined-multiline-static"
                                                                fullWidth
                                                                multiline
                                                                type="text"
                                                                name="rejectReason"
                                                                value={values.rejectReason}
                                                                onChange={handleChange}
                                                                rows={5}
                                                                placeholder="Rejection reason (Optional)"
                                                                color="secondary"
                                                                style={{ marginTop: '5px' }}
                                                                error={touched.rejectReason && Boolean(errors.rejectReason)}
                                                                helperText={touched.rejectReason && errors.rejectReason}
                                                            />
                                                        </FormControl>
                                                    )}
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button
                                                        disableElevation
                                                        style={{ width: '20%' }}
                                                        size="large"
                                                        type="reset"
                                                        variant="outlined"
                                                        onClick={(e) => {
                                                            resetForm();
                                                            handleClose();
                                                        }}
                                                        color="secondary"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        style={{ width: '20%' }}
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={(e) => {
                                                            handleSubmit(values);
                                                        }}
                                                    >
                                                        Agree
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </form>
                                    )}
                                </Formik>
                            </Grid>
                            <Grid>
                                <Modal
                                    open={openDetail}
                                    onClose={handleCloseModalDetail}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    {showDetail()}
                                </Modal>
                            </Grid>
                        </Grid>
                    </Box>
                </MainCard>
            ) : (
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={forbiddenpng} alt="Berry" style={{ width: '50%', height: '100%' }} />
                    </Box>
                </MainCard>
            )}
        </>
    );
};
export default MonitorLeave;
