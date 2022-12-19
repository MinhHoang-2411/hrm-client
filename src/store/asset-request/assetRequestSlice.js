import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    reloadList: false,
    listData: [],
    pagination: undefined
};

const assetRequestSlice = createSlice({
    name: 'assetRequest',
    initialState,
    reducers: {
        fetchData(state, action) {
            state.loading = true;
            state.pagination = {
                size: action.payload.size,
                page: action.payload.page
            };
        },
        fetchDataSuccess(state, action) {
            state.loading = false;
            state.listData = action.payload.data;
            state.pagination = {
                ...state.pagination,
                totalCount: action?.payload?.headers?.['x-total-count']
            };
        },
        fetchDataFail(state, action) {
            state.loading = false;
        }
    }
});

// Actions
export const assetRequestActions = assetRequestSlice.actions;

// Reducer
const assetRequestReducer = assetRequestSlice.reducer;
export default assetRequestReducer;
