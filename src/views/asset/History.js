// material
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Pagination, Select, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

// convert date
import { formatDateMaterialForFilter } from 'utils/format/date';

// react
import { useCallback, useState } from 'react';

// redux
import { assetRequestActions } from 'store/asset-request/assetRequestSlice';
import { useAppDispatch } from 'app/hooks';
import useGetAllList from 'hooks/useGetAllList';

// pagination
import { totalPagePagination } from 'utils/pagination';

// custom table
import TableAssetRequest from './Table/index';

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

const AssetHistory = ({ ...others }) => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [params, setParams] = useState({
        size: 10,
        page: 0,
        sort: '',
        order: 'asc',
        issuedDate: null,
        returnedDate: null
    });
    const [issuedDate, setIssuedDate] = useState(null);
    const [returnedDate, setReturnedDate] = useState(null);

    const { listData: listAssetRequest, pagination } = useGetAllList(params, assetRequestActions, 'assetRequest');
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
            if (key === 'issuedDate.greaterThanOrEqual') setIssuedDate(value);
            if (key === 'returnedDate.lessThanOrEqual') setReturnedDate(value);
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
                    } else {
                        delete newState['title.contains'];
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
            <MainCard sx={{ mt: 2 }} content={false} title="Asset Request History">
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
                                    <InputAdornment position="start" sx={{ mr: 0.5 }}>
                                        <SearchOutlined />
                                    </InputAdornment>
                                }
                                size="small"
                                aria-describedby="header-search-text"
                                inputProps={{
                                    'aria-label': 'weight'
                                }}
                                placeholder="Title, Description"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                color="secondary"
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
                                size="small"
                                defaultValue="ALL_STATUS"
                                color="secondary"
                            >
                                <MenuItem size="small" value={'ALL_STATUS'}>
                                    All
                                </MenuItem>
                                <MenuItem size="small" value={'REJECTED'}>
                                    Rejected
                                </MenuItem>
                                <MenuItem size="small" value={'REQUESTED'}>
                                    Requested
                                </MenuItem>
                                <MenuItem size="small" value={'APPROVED'}>
                                    Approved
                                </MenuItem>
                                <MenuItem size="small" value={'RETURNED'}>
                                    Returned
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: { xs: '100%', md: 170 }, marginLeft: '15px' }} size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Issued Date"
                                    value={issuedDate}
                                    name="startDate"
                                    onChange={(e) => {
                                        handleFilter('issuedDate.greaterThanOrEqual', formatDateMaterialForFilter(e.toDate()));
                                    }}
                                    renderInput={(params) => <TextField color="secondary" {...params} size="small" />}
                                    inputFormat="DD/MM/YYYY"
                                    style={{ maxHeight: '70%' }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl sx={{ width: { xs: '100%', md: 170 }, marginLeft: '15px' }} size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Returned Date"
                                    value={returnedDate}
                                    name="endDate"
                                    onChange={(e) => {
                                        handleFilter('returnedDate.lessThanOrEqual', formatDateMaterialForFilter(e.toDate()));
                                    }}
                                    renderInput={(params) => <TextField color="secondary" {...params} size="small" />}
                                    inputFormat="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Box>
                </Box>
                {/* Start Table */}
                <TableAssetRequest data={listAssetRequest} />
                {/* End Table */}
                {pagination && listAssetRequest?.length > 0 && (
                    <BoxPagination>
                        <Pagination count={totalPagePagination(pagination)} page={pagination?.page + 1 || 1} onChange={handlePagination} />
                    </BoxPagination>
                )}
            </MainCard>
        </>
    );
};

export default AssetHistory;
