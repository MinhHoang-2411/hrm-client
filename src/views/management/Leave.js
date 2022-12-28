// material
import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Pagination,
    Select,
    TextField,
    Grid,
    Card,
    Chip,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import CheckIcon from '@mui/icons-material/Check';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { InputSearch } from 'ui-component/filter/input-search';

// convert date
import { formatDateMaterialForFilter } from 'utils/format/date';

// react
import { useCallback, useState, useEffect } from 'react';

// redux
import { leaveActions } from 'store/leave/leaveSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import useGetAllList from 'hooks/useGetAllList';

// pagination
import { totalPagePagination } from 'utils/pagination';

// filter and search
import _ from 'lodash';
import { SearchOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// constants
import { LEAVE_TYPE, LEAVE_STATUS } from 'constants/index';

// format
import { formatTimeStampToDate, formatTomeStampToDateTime } from 'utils/format/date';
import { upperCaseFirstCharacter } from 'utils/string';

import { nameMatching } from 'utils/format/name';

// scss
import '../../assets/scss/asset.scss';

// image
import forbiddenpng from 'assets/images/forbidden.png';

const styleTitle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    marginTop: '10px'
};
const styleName = {
    fontSize: '16px',
    cursor: 'pointer',
    '&:hover': {
        color: '#1890ff'
    }
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

const ManagementLeave = () => {
    const dispatch = useAppDispatch();
    const [paramsAll, setParamsAll] = useState({
        page: 0,
        size: 20
    });
    const [paramsWaiting, setParamsWaiting] = useState({
        page: 0,
        size: 20
    });
    const [search, setSearch] = useState('');
    const [searchListWaiting, setSearchListWaiting] = useState('');
    const { listData: listLeave } = useGetAllList(paramsAll, leaveActions, 'leave');
    const listOtherLeave = listLeave?.filter(
        (item) =>
            (item?.status === 'CONFIRMED' || item?.status === 'REJECTED') && item?.assignTo === +localStorage.getItem('current_employee_id')
    );
    const listLeaveWaiting = useAppSelector((state) => state.leave.listDataWaiting);
    const reloadList = useAppSelector((state) => state.leave.reloadList);
    const isLeaveWaiting = (status) => status == 'WAITING';
    const [openModelConfirm, setOpenModelConfirm] = useState(false);
    const [action, setAction] = useState('');
    const [title, setTitle] = useState('');
    const [leaveSelected, setLeaveSelected] = useState({});
    const [havePermission, setHavePermission] = useState(false);

    const handleClose = () => {
        setOpenModelConfirm(false);
        setAction('');
        setTitle('');
        setLeaveSelected('');
    };

    const handleClickModelConfirm = (row, title, action) => {
        setOpenModelConfirm(true);
        setAction(action);
        setTitle(title);
        setLeaveSelected(row);
    };

    const handleUpdateStatus = () => {
        const tmpData = { ...leaveSelected };
        tmpData['status'] = action;
        dispatch(leaveActions.editLeave({ ...tmpData }));
    };

    const showStatusLeave = (status) => {
        let color = '';
        switch (status) {
            case 'CONFIRMED':
                color = '#1890ff';
                break;
            case 'APPROVED':
                color = '#04AA6D';
                break;
            case 'REJECTED':
                color = '#ff4d4f';
                break;
            case 'CANCELED':
                color = '#ff8000';
                break;
            case 'WAITING':
                color = '#6666ff';
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
                return state;
            });
        } else {
            setParamsAll((preState) => {
                const state = { ...preState };
                if (value === 'all') delete state[key];
                else state[key] = value;
                return state;
            });
        }
    };

    const renderList = useCallback(
        (data) =>
            Array.isArray(data) &&
            data?.map((row, index) => (
                <Card className="card" key={index} sx={{ fontSize: '15px', marginBottom: '15px', marginTop: '5px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '10px 30px' }}>
                        <Box sx={styleTitle}>
                            <span style={{ color: '#1890ff', marginRight: '5px', fontSize: '20px' }}>{index + 1}</span>
                            {row?.createdBy}
                        </Box>
                        <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                            <Grid container spacing={2} columns={12}>
                                <Grid item xs={4}>
                                    <Box sx={styleName}>{nameMatching(row?.employee?.user?.firstName, row?.employee?.user?.lastName)}</Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Chip
                                        sx={{ fontWeight: 'bold', borderRadius: '4px' }}
                                        variant="outlined"
                                        label={upperCaseFirstCharacter(row?.type)}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    {showStatusLeave(row?.status)}
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
                                <Grid item xs={12}>
                                    <span style={{ fontWeight: 'bold' }}>Date Submitted:</span>{' '}
                                    {formatTomeStampToDateTime(row?.createdDate)}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                            <Grid container spacing={2} columns={12}>
                                <Grid item xs={4}>
                                    <span style={{ fontWeight: 'bold' }}>From:</span> {formatTimeStampToDate(row?.startDate)}
                                </Grid>
                                <Grid item xs={4}>
                                    <span style={{ fontWeight: 'bold' }}>To:</span> {formatTimeStampToDate(row?.endDate)}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                            <span style={{ fontWeight: 'bold' }}>Reason:</span>&nbsp; {row?.reason}
                        </Box>
                        {isLeaveWaiting(row?.status) && (
                            <Box sx={{ margin: '10px 10px 12px 0px' }}>
                                <Button
                                    sx={{ float: 'right' }}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<CheckOutlined />}
                                    onClick={() => {
                                        handleClickModelConfirm(row, 'Confirm', 'CONFIRMED');
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
                                        handleClickModelConfirm(row, 'Reject', 'REJECTED');
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
    }, [paramsWaiting, reloadList]);

    useEffect(() => {
        const role = JSON.parse(localStorage.getItem('role'));
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
                            <Grid xs={9}>
                                <Box sx={{ padding: '10px 20px', overflowX: 'auto', height: '90vh' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={styleLabel}>
                                            Waiting leave <span style={styleCount}>{listLeaveWaiting?.length || 0}</span>
                                        </h3>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '15px',
                                                width: '99%',
                                                marginLeft: 'auto',
                                                marginRight: 'auto'
                                            }}
                                        >
                                            <InputSearch
                                                width={250}
                                                search={searchListWaiting}
                                                handleSearch={(value) => handleSearch(value, 'waiting')}
                                                placeholder="Search title..."
                                            />
                                            <FormControl sx={{ minWidth: 120, marginLeft: '15px' }}>
                                                <InputLabel id="demo-simple-select-label" color="secondary">
                                                    Type
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
                                        </Box>
                                    </Box>
                                    <Box>{listLeaveWaiting?.length ? renderList(listLeaveWaiting) : <div></div>}</Box>
                                </Box>
                            </Grid>
                            <Grid xs={7}>
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
                                            Other leave <span style={styleCount}>{listOtherLeave?.length || 0}</span>
                                        </h3>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <InputSearch
                                                width={250}
                                                search={search}
                                                handleSearch={handleSearch}
                                                placeholder="Search title..."
                                            />
                                            <FormControl sx={{ minWidth: 120, marginLeft: '15px' }}>
                                                <InputLabel id="demo-simple-select-label" color="secondary">
                                                    Type
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
                                            <FormControl sx={{ minWidth: 120, marginLeft: '15px' }}>
                                                <InputLabel id="demo-simple-select-label" color="secondary">
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
                                                    {LEAVE_STATUS?.map((item, index) => (
                                                        <MenuItem key={index} value={item}>
                                                            {upperCaseFirstCharacter(item)}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    <Box sx={{ overflowX: 'auto', height: '90vh', marginTop: '5px' }}>
                                        {listOtherLeave?.length ? renderList(listOtherLeave) : <div></div>}
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Dialog open={openModelConfirm} onClose={handleClose} fullWidth>
                                <DialogTitle sx={{ fontSize: '24px' }}>{title}</DialogTitle>
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
                                        startIcon={<CheckIcon />}
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
