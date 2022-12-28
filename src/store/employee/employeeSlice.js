import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alert: false,
    loading: false,
    reloadList: false,
    listData: [],
    employee: {},
    pagination: undefined
};

const employeeSlice = createSlice({
    name: 'employee',
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
        fetchDataFalse(state, action) {
            state.loading = false;
        }
    }
});

// Actions
export const employeeActions = employeeSlice.actions;

// Reducer
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
