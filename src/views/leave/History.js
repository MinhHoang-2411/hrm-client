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
    Button
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonLoading from 'ui-component/SkeletonLoading';

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

// custom table
import TableEmployee from './Table/index';

// filter and search
import _ from 'lodash';
import { SearchOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// format
import { upperCaseFirstCharacter } from 'utils/string';

// constants
import { LEAVE_STATUS, LEAVE_TYPE } from 'constants/index';

// i18n
import { useTranslation } from 'react-i18next';

const BoxPagination = styled(Box)(({ theme }) => ({
    padding: '20px 0px',
    display: 'flex',
    justifyContent: 'left'
}));

const LeaveHistory = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [params, setParams] = useState({
        size: 10,
        page: 0,
        sort: '',
        order: 'asc',
        startDate: null,
        endDate: null
    });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');

    const { listData: listLeaveHistory, pagination } = useGetAllList(params, leaveActions, 'leave');
    const loading = useAppSelector((state) => state.leave.loading);

    const [fromError, setFromError] = useState(null);
    const [toError, setToError] = useState(null);
    const { t, i18n } = useTranslation();

    const handlePagination = (event, value) => {
        setParams((prevState) => {
            return { ...prevState, page: Number(value - 1) };
        });
    };

    const handleFilter = (key, value) => {
        setParams((preState) => {
            const state = { ...preState, page: 0 };
            state[key] = value;
            if (value === 'ALL_STATUS') delete state['status.equals'];
            if (value === 'ALL_TYPE') delete state['type.in'];
            if (key === 'status.equals') setStatus(value);
            if (key === 'type.in') setType(value);
            if (key === 'startDate.greaterThanOrEqual') setStartDate(value);
            if (key === 'endDate.lessThanOrEqual') setEndDate(value);
            return state;
        });
    };

    const debounceSearch = useCallback(
        _.debounce(
            (value) =>
                setParams((prevState) => {
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

    const handleSearch = (value) => {
        setSearch(value);
        debounceSearch(value);
    };

    const handleClearFilter = () => {
        setParams((preState) => {
            const state = {
                size: 10,
                page: 0,
                sort: '',
                order: 'asc',
                startDate: null,
                endDate: null
            };
            return state;
        });
        setStartDate(null);
        setEndDate(null);
        setSearch('');
        setStatus('');
        setType('');
    };

    const isShowFilterMessage = () => {
        if (
            (params['title.contains'] && params['title.contains'] !== '') ||
            (params['type.equals'] && params['type.equals'] !== '') ||
            (params['status.equals'] && params['status.equals'] !== '') ||
            (params['startDate.greaterThanOrEqual'] && params['startDate.greaterThanOrEqual'] !== '') ||
            (params['endDate.lessThanOrEqual'] && params['endDate.lessThanOrEqual'] !== '')
        )
            return true;
        else return false;
    };

    return (
        <>
            <MainCard sx={{ mt: 2 }} content={false} title={t('Leave History')}>
                <Box
                    sx={{
                        padding: '20px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}
                    >
                        <FormControl sx={{ width: { xs: '100%', md: 200 } }}>
                            <OutlinedInput
                                color="secondary"
                                id="header-search"
                                startAdornment={
                                    <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                        <SearchOutlined />
                                    </InputAdornment>
                                }
                                aria-describedby="header-search-text"
                                inputProps={{
                                    'aria-label': 'weight'
                                }}
                                placeholder={t('Title, reason')}
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ width: { xs: '100%', md: 150 }, marginLeft: '15px' }}>
                            <InputLabel color="secondary" id="demo-simple-select-label">
                                Status
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                onChange={(e) => handleFilter('status.equals', e.target.value)}
                                label={t('Status')}
                                defaultValue="ALL_STATUS"
                                color="secondary"
                            >
                                <MenuItem value="ALL_STATUS">{t('All')}</MenuItem>
                                {LEAVE_STATUS?.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {t(upperCaseFirstCharacter(item))}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: { xs: '100%', md: 150 }, marginLeft: '15px' }}>
                            <InputLabel size="normal" color="secondary" id="demo-simple-select-label">
                                Leave Type
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                onChange={(e) => handleFilter('type.in', e.target.value)}
                                label={t('Leave Type')}
                                defaultValue="ALL_TYPE"
                                color="secondary"
                            >
                                <MenuItem value={'ALL_TYPE'}>{t('All')}</MenuItem>
                                {LEAVE_TYPE?.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {t(upperCaseFirstCharacter(item))}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: { xs: '100%', md: 170 }, marginLeft: '15px' }} size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label={t('From')}
                                    value={startDate || null}
                                    name="startDate"
                                    onChange={(e) => {
                                        handleFilter('startDate.greaterThanOrEqual', formatDateMaterialForFilter(e));
                                    }}
                                    onError={(newError) => setFromError(newError)}
                                    renderInput={(params) => (
                                        <TextField
                                            color="secondary"
                                            {...params}
                                            helperText={fromError ? 'Please follow the format dd/mm/yyyy' : ''}
                                        />
                                    )}
                                    inputFormat="DD/MM/YYYY"
                                    style={{ maxHeight: '70%' }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl sx={{ width: { xs: '100%', md: 170 }, marginLeft: '15px' }} size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label={t('To')}
                                    value={endDate || null}
                                    name="endDate"
                                    onError={(newError) => setToError(newError)}
                                    onChange={(e) => {
                                        handleFilter('endDate.lessThanOrEqual', formatDateMaterialForFilter(e));
                                    }}
                                    minDate={startDate}
                                    renderInput={(params) => (
                                        <TextField
                                            color="secondary"
                                            {...params}
                                            helperText={
                                                toError === 'invalidDate'
                                                    ? 'Please follow the format dd/mm/yyyy'
                                                    : toError === 'minDate'
                                                    ? 'Please choose valid time'
                                                    : ''
                                            }
                                        />
                                    )}
                                    inputFormat="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <Box>
                            <Button
                                sx={{ width: { xs: '100%', md: 100 }, marginLeft: '15px', height: '50px' }}
                                size="large"
                                variant="contained"
                                onClick={(e) => {
                                    handleClearFilter();
                                }}
                                color="secondary"
                            >
                                {t('Clear')}
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Start Table */}
                {loading ? (
                    [...Array(5).keys()].map((value) => (
                        <SkeletonLoading key={value} sx={{ marginBottom: '15px', minHeight: '5px', marginLeft: '20px', height: '30px' }} />
                    ))
                ) : (
                    <TableEmployee data={listLeaveHistory} showFilterMessage={isShowFilterMessage()} />
                )}

                {/* End Table */}
                {pagination && listLeaveHistory?.length > 0 && (
                    <BoxPagination>
                        <Pagination count={totalPagePagination(pagination)} page={pagination?.page + 1 || 1} onChange={handlePagination} />
                    </BoxPagination>
                )}
            </MainCard>
        </>
    );
};
export default LeaveHistory;
