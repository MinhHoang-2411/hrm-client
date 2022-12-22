// material-ui
import MainCard from 'ui-component/cards/MainCard';
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Pagination, Select, TextField } from '@mui/material';

// redux
import { assetActions } from 'store/asset/assetSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import useGetAllList from 'hooks/useGetAllList';

// custom card
import CardList from './Card';

// pagination
import styled from '@emotion/styled';
import { totalPagePagination } from 'utils/pagination';

// react
import { useCallback, useState, useEffect } from 'react';

// search
import _ from 'lodash';
import { SearchOutlined } from '@ant-design/icons';

const BoxPagination = styled(Box)(({ theme }) => ({
    padding: '20px 0px',
    display: 'flex',
    justifyContent: 'left'
}));

const RequestAsset = ({ ...others }) => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [params, setParams] = useState({
        size: 8,
        page: 0,
        sort: '',
        sort_field: 'id',
        sort_type: 'desc',
        category: ''
    });

    // get data
    const listCategory = useAppSelector((state) => state.asset.listCategory);
    const { listData: listAssetModel, pagination } = useGetAllList(params, assetActions, 'asset');

    const handlePagination = (event, value) => {
        setParams((prevState) => {
            return { ...prevState, page: Number(value - 1) };
        });
    };

    const handleFilter = (key, value) => {
        if (key === 'status' && value === 'AVAILABLE') {
            setStatusFilter(value);
            dispatch(assetActions.filterModel());
        } else {
            setParams((preState) => {
                const state = { ...preState };
                state[key] = value;
                if (value === 'ALL_CATEGORY') delete state['assetCategoryId.equals'];
                if (key === 'assetCategoryId.equals') setCategoryFilter(value);
                if (key === 'status') setStatusFilter(value);
                return state;
            });
        }
    };

    const debounceSearch = useCallback(
        _.debounce(
            (value) =>
                setParams((prevState) => {
                    const newState = { ...prevState };
                    if (value && value.trim() !== '') {
                        newState['modelName.contains'] = value.trim();
                        newState['description.contains'] = value.trim();
                    } else {
                        delete newState['modelName.contains'];
                        delete newState['description.contains'];
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

    useEffect(() => {
        dispatch(assetActions.getCategory({}));
    }, []);

    return (
        <MainCard title="Request Asset">
            <Box
                sx={{
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
                    <FormControl sx={{ width: { xs: 250, md: 250 } }}>
                        <OutlinedInput
                            id="header-search"
                            size="small"
                            startAdornment={
                                <InputAdornment position="start" sx={{ mr: 0.5 }}>
                                    <SearchOutlined />
                                </InputAdornment>
                            }
                            aria-describedby="header-search-text"
                            inputProps={{
                                'aria-label': 'weight'
                            }}
                            placeholder="Name, Description"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            color="secondary"
                        />
                    </FormControl>
                    <FormControl sx={{ width: { xs: 200, md: 200 }, ml: 2 }}>
                        <InputLabel size="small" id="demo-simple-select-label">
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryFilter}
                            size="small"
                            onChange={(e) => handleFilter('assetCategoryId.equals', e.target.value)}
                            label="Status"
                            defaultValue="ALL_STATUS"
                            color="secondary"
                        >
                            <MenuItem size="small" value={'ALL_CATEGORY'}>
                                All
                            </MenuItem>
                            {listCategory?.length > 0 &&
                                listCategory?.map((item, index) => {
                                    return (
                                        <MenuItem size="small" key={index} value={item?.id}>
                                            {item?.name}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: { xs: 150, md: 150 }, ml: 2 }}>
                        <InputLabel size="small" id="demo-simple-select-label">
                            Status
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            size="small"
                            value={statusFilter}
                            label="Status"
                            defaultValue="ALL_CATEGORY"
                            onChange={(e) => handleFilter('status', e.target.value)}
                            color="secondary"
                        >
                            <MenuItem size="small" value={'ALL_STATUS'}>
                                All
                            </MenuItem>
                            <MenuItem size="small" value={'AVAILABLE'}>
                                Available
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{ marginTop: '15px' }} className="slider-list">
                <Box sx={{ width: '100%' }}>
                    <CardList data={listAssetModel} />
                </Box>
            </Box>
            {pagination && listAssetModel?.length > 0 && (
                <BoxPagination>
                    <Pagination count={totalPagePagination(pagination)} page={pagination?.page + 1 || 1} onChange={handlePagination} />
                </BoxPagination>
            )}
        </MainCard>
    );
};

export default RequestAsset;
