import styled from '@emotion/styled';
import { Box, MenuItem, Pagination, FormControl, InputAdornment, InputLabel, OutlinedInput, Select, TextField } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import useGetAllList from 'hooks/useGetAllList';
import { useState } from 'react';
import { leaveActions } from 'store/leave/leaveSlice';
import MainCard from 'ui-component/cards/MainCard';
import { totalPagePagination } from 'utils/pagination';
import TableEmployee from './Table/index';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { convertDate } from 'api/leave';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    maxHeight: 700,
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2
};

const BoxPagination = styled(Box)(({ theme }) => ({
    padding: '20px 0px',
    display: 'flex',
    justifyContent: 'left'
}));

const LeaveHistoryPage = () => {
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

            return state;
        });
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
                        <FormControl sx={{ width: { xs: '100%', md: 150 } }}>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={params.status}
                                onChange={(e) => handleFilter('status.equals', e.target.value)}
                                label="Status"
                                defaultValue="ALL_STATUS"
                            >
                                <MenuItem value={'ALL_STATUS'}>ALL</MenuItem>
                                <MenuItem value={'ACCEPTED'}>ACCEPTED</MenuItem>
                                <MenuItem value={'REJECTED'}>REJECTED</MenuItem>
                                <MenuItem value={'WAITING'}>WAITING</MenuItem>
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
                                <MenuItem value={'ALL_TYPE'}>ALL</MenuItem>
                                <MenuItem value={'OFF'}>OFF</MenuItem>
                                <MenuItem value={'REMOTE'}>REMOTE</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: { xs: '100%', md: 170 }, marginLeft: '15px' }} size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="From"
                                    value={params.startDate}
                                    name="startDate"
                                    onChange={(e) => {
                                        handleFilter('startDate.greaterThanOrEqual', convertDate(e.toDate()));
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
                                    value={params.endDate}
                                    name="startDate"
                                    onChange={(e) => {
                                        handleFilter('endDate.lessThanOrEqual', convertDate(e.toDate()));
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
export default LeaveHistoryPage;
