// material
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Pagination, Select, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

// convert date
import { convertDateToFilter } from 'api/leave';

// react
import { useCallback, useState } from 'react';

// redux
import { leaveActions } from 'store/leave/leaveSlice';
import { useAppDispatch } from 'app/hooks';
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

    const { listData: listLeaveHistory, pagination } = useGetAllList(params, leaveActions, 'leave');

    const handlePagination = (event, value) => {
        setParams((prevState) => {
            return { ...prevState, page: Number(value - 1) };
        });
    };

    const handleFilter = (key, value) => {
        setParams((preState) => {
            const state = { ...preState };
            state[key] = value;
            if (value === 'ALL_STATUS') delete state['status.equals'];
            if (value === 'ALL_TYPE') delete state['type.in'];
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

    return (
        <>
            <MainCard sx={{ mt: 2 }} content={false} title="Leave History">
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
                            alignItems: 'center'
                        }}
                    >
                        <FormControl sx={{ width: { xs: '100%', md: 200 } }}>
                            <OutlinedInput
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
                                placeholder="Title, reason"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ width: { xs: '100%', md: 150 }, marginLeft: '15px' }}>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={params.status}
                                onChange={(e) => handleFilter('status.equals', e.target.value)}
                                label="Status"
                                defaultValue="ALL_STATUS"
                            >
                                <MenuItem value={'ALL_STATUS'}>All</MenuItem>
                                <MenuItem value={'CONFIRMED'}>Confirmed</MenuItem>
                                <MenuItem value={'REJECTED'}>Rejected</MenuItem>
                                <MenuItem value={'WAITING'}>Waiting</MenuItem>
                                <MenuItem value={'APPROVED'}>Approved</MenuItem>
                                <MenuItem value={'DELETE'}>Delete</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: { xs: '100%', md: 150 }, marginLeft: '15px' }}>
                            <InputLabel id="demo-simple-select-label">Leave Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={params.status}
                                onChange={(e) => handleFilter('type.in', e.target.value)}
                                label="Leave Type"
                                defaultValue="ALL_TYPE"
                            >
                                <MenuItem value={'ALL_TYPE'}>All</MenuItem>
                                <MenuItem value={'CASUAL'}>Casual</MenuItem>
                                <MenuItem value={'MATERNITY'}>Maternity</MenuItem>
                                <MenuItem value={'REMOTE'}>Remote</MenuItem>
                                <MenuItem value={'ANNUAL'}>Annual</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: { xs: '100%', md: 170 }, marginLeft: '15px' }} size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="From"
                                    value={startDate}
                                    name="startDate"
                                    onChange={(e) => {
                                        handleFilter('startDate.greaterThanOrEqual', convertDateToFilter(e.toDate()));
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="DD/MM/YYYY"
                                    style={{ maxHeight: '70%' }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl sx={{ width: { xs: '100%', md: 170 }, marginLeft: '15px' }} size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="To"
                                    value={endDate}
                                    name="endDate"
                                    onChange={(e) => {
                                        handleFilter('endDate.lessThanOrEqual', convertDateToFilter(e.toDate()));
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Box>
                </Box>

                {/* Start Table */}
                <TableEmployee data={listLeaveHistory} />
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
