// material
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
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
    Typography
} from '@mui/material';
import Modal from '@mui/material/Modal';
import MainCard from 'ui-component/cards/MainCard';
import { InputSearch } from 'ui-component/filter/input-search';

// convert date
import { formatDateMaterialForFilter } from 'utils/format/date';

// react
import { useCallback, useEffect, useState } from 'react';

// redux
import { useAppDispatch, useAppSelector } from 'app/hooks';
import useGetAllList from 'hooks/useGetAllList';
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
import '../../assets/scss/leave.scss';

// image
import forbiddenpng from 'assets/images/forbidden.png';

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
import ModelLeaveDetail from '../leave/Modal/model-leave-detail';

const ManagementLeave = () => {
    const dispatch = useAppDispatch();
    const [paramsAll, setParamsAll] = useState({
        page: 0,
        size: 20,
        startDate: null,
        endDate: null
    });
    const [paramsWaiting, setParamsWaiting] = useState({
        page: 0,
        size: 20,
        startDate: null,
        endDate: null
    });
    const [search, setSearch] = useState('');
    const [searchListWaiting, setSearchListWaiting] = useState('');
    const { listData: listLeave } = useGetAllList(paramsAll, leaveActions, 'leave');

    const listLeaveForManager = useAppSelector((state) => state.leave.listDataManagement);
    const listOtherLeave = listLeaveForManager?.filter(
        (item) =>
            (item?.status === 'CONFIRMED' || item?.status === 'REJECTED') &&
            item?.assignTo === JSON.parse(localStorage.getItem('employee')).id
    );
    const listLeaveWaiting = useAppSelector((state) => state.leave.listDataWaiting);
    const reloadList = useAppSelector((state) => state.leave.reloadList);
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
    const [basicInfo, setBasicInfor] = useState({});

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

    const handleUpdateStatus = () => {
        const tmpData = { ...leaveSelected };
        if (action === 'CONFIRMED') {
            dispatch(leaveActions.confirmLeave({ ...tmpData }));
        } else if (action === 'REJECTED') {
            dispatch(leaveActions.rejectLeave({ ...tmpData }));
        }
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
                const state = { ...preState };
                if (value === 'all') delete state[key];
                else state[key] = value;
                if (key === 'startDate.equals') setFromWaiting(value);
                return state;
            });
        } else {
            setParamsAll((preState) => {
                const state = { ...preState };
                if (value === 'all') delete state[key];
                else state[key] = value;
                if (key === 'startDate.equals') setFromAll(value);
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
                                    <Box sx={styleTitle}>{row?.applicantName}</Box>
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
        [listLeave, listLeaveWaiting]
    );

    useEffect(() => {
        dispatch(leaveActions.getListWaiting(paramsWaiting));
        dispatch(leaveActions.fetchDataForManager(paramsAll));
    }, [paramsWaiting, paramsAll, reloadList]);

    useEffect(() => {
        setBasicInfor(JSON.parse(localStorage.getItem('employee')));
    }, []);

    useEffect(() => {
        const role = basicInfo.position;
        if (role === 'MANAGER') setHavePermission(true);
        else setHavePermission(false);
    });

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
                                <Box sx={{ padding: '10px 20px', overflowX: 'auto', height: '90vh' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={styleLabel}>
                                            Waiting leave requests <span style={styleCount}>{listLeaveWaiting?.length || 0}</span>
                                        </h3>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                marginBottom: '10.5px',
                                                width: '99%',
                                                marginLeft: 'auto',
                                                marginRight: 'auto'
                                            }}
                                        >
                                            <InputSearch
                                                width={250}
                                                search={searchListWaiting}
                                                handleSearch={(value) => handleSearch(value, 'waiting')}
                                                placeholder="Search title, reason, ..."
                                            />
                                            <FormControl sx={{ minWidth: 120, marginLeft: '15px' }}>
                                                <InputLabel size="small" id="demo-simple-select-label" color="secondary">
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
                                            <FormControl sx={{ width: { xs: '100%', md: 170 }, marginLeft: '15px' }} size="small">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Start Date"
                                                        value={fromWaiting || null}
                                                        name="fromWaiting"
                                                        onChange={(e) => {
                                                            handleFilter('startDate.equals', formatDateMaterialForFilter(e), 'waiting');
                                                        }}
                                                        inputFormat="DD/MM/YYYY"
                                                        onError={(newError) => setFromWaitingError(newError)}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                size="small"
                                                                color="secondary"
                                                                {...params}
                                                                helperText={fromWaitingError ? 'Please follow the format dd/mm/yyyy' : ''}
                                                            />
                                                        )}
                                                        style={{ maxHeight: '70%' }}
                                                    />
                                                </LocalizationProvider>
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    <Box>
                                        {listLeaveWaiting?.length ? (
                                            renderList(listLeaveWaiting)
                                        ) : (
                                            <div>
                                                <Box>
                                                    <center>
                                                        <ErrorOutlineIcon
                                                            sx={{
                                                                width: 100,
                                                                height: 100,
                                                                marginBottom: '4px',
                                                                marginTop: '160px',
                                                                color: '#E0E0E0'
                                                            }}
                                                            fontSize="medium"
                                                        />
                                                        <Typography sx={{ color: '#9E9E9E' }}>Empty Detail</Typography>
                                                    </center>
                                                </Box>
                                            </div>
                                        )}
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Box sx={{ padding: '10px 20px', overflowX: 'auto', height: '90vh' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            paddingRight: '5px',
                                            marginBottom: '15px',
                                            width: '99%',
                                            marginLeft: 'auto',
                                            marginRight: 'auto'
                                        }}
                                    >
                                        <h3 style={styleLabel}>
                                            Other leave requests <span style={styleCount}>{listOtherLeave?.length || 0}</span>
                                        </h3>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                            <InputSearch
                                                width={200}
                                                search={search}
                                                handleSearch={handleSearch}
                                                placeholder="Search title, reason, ..."
                                            />
                                            <FormControl sx={{ minWidth: 120, marginLeft: '5px' }}>
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
                                                </Select>
                                            </FormControl>
                                            <FormControl sx={{ width: { xs: '100%', md: 170 }, marginLeft: '5px' }} size="small">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Start Date"
                                                        value={fromAll || null}
                                                        name="fromAll"
                                                        onChange={(e) => {
                                                            handleFilter('startDate.equals', formatDateMaterialForFilter(e));
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
                                        </Box>
                                    </Box>
                                    <Box>
                                        {listOtherLeave?.length ? (
                                            renderList(listOtherLeave)
                                        ) : (
                                            <div>
                                                <Box>
                                                    <center>
                                                        <ErrorOutlineIcon
                                                            sx={{
                                                                width: 100,
                                                                height: 100,
                                                                marginBottom: '4px',
                                                                marginTop: '160px',
                                                                color: '#E0E0E0'
                                                            }}
                                                            fontSize="medium"
                                                        />
                                                        <Typography sx={{ color: '#9E9E9E' }}>Empty Detail</Typography>
                                                    </center>
                                                </Box>
                                            </div>
                                        )}
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid>
                                <Dialog open={openModelConfirm} onClose={handleClose} fullWidth>
                                    <DialogTitle sx={{ fontSize: '24px' }}>{upperCaseFirstCharacter(title)}</DialogTitle>
                                    <DialogContent>
                                        <Box>
                                            <span style={{ fontSize: '15px' }}>
                                                Would you like to <b>{title}</b> this leave?
                                            </span>
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            disableElevation
                                            style={{ width: '20%' }}
                                            size="large"
                                            type="reset"
                                            variant="outlined"
                                            onClick={handleClose}
                                            color="secondary"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            disableElevation
                                            style={{ width: '20%' }}
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            onClick={(e) => {
                                                handleClose();
                                                handleUpdateStatus();
                                            }}
                                        >
                                            Agree
                                        </Button>
                                    </DialogActions>
                                </Dialog>
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
export default ManagementLeave;
